import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

export const overview = new Hono().basePath('/overview');

// 1. Riwayat kunjungan hewan
overview.get('/animal/:id/visits', async (c) => {
  const animalId = Number(c.req.param('id'));
  if (Number.isNaN(animalId)) {
    return c.json({ error: 'invalid animalId' }, 400);
  }

  try {
    const rows = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`CALL public.sp_get_animal_visit_history(${animalId}::INT, NULL::REFCURSOR)`;
      const data = await tx.$queryRawUnsafe(`FETCH ALL FROM cur_animal_visit`);
      await tx.$executeRawUnsafe(`CLOSE cur_animal_visit`);
      return data as unknown[];
    });

    return c.json({ data: rows });
  } catch (error: any) {
    console.error('Error in sp_get_animal_visit_history:', error?.message);
    return c.json({ error: 'Failed to get animal visit history' }, 500);
  }
});

// 2. Daftar hewan per jenis
overview.get('/animal-type/:id/animals', async (c) => {
  const atId = Number(c.req.param('id'));
  if (Number.isNaN(atId)) {
    return c.json({ error: 'invalid animal type id' }, 400);
  }

  try {
    const rows = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`CALL public.sp_get_animals_by_type(${atId}::INT, NULL::REFCURSOR)`;
      const data = await tx.$queryRawUnsafe(
        `FETCH ALL FROM cur_animals_by_type`,
      );
      await tx.$executeRawUnsafe(`CLOSE cur_animals_by_type`);
      return data as unknown[];
    });

    return c.json({ data: rows });
  } catch (error: any) {
    console.error('Error in sp_get_animals_by_type:', error?.message);
    return c.json({ error: 'Failed to get animals by type' }, 500);
  }
});

// 3. Daftar kunjungan dalam rentang tanggal
overview.get('/visits/range', async (c) => {
  const startDate = c.req.query('start_date');
  const endDate = c.req.query('end_date');

  if (!startDate || !endDate) {
    return c.json(
      {
        error: 'Missing required parameters: start_date and end_date',
        example: '/api/visits/range?start_date=2025-03-01&end_date=2025-06-30',
      },
      400,
    );
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
    return c.json(
      {
        error: 'Invalid date format. Use YYYY-MM-DD format',
        example: '2025-03-01',
      },
      400,
    );
  }

  try {
    const rows = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`CALL public.sp_get_visits_in_range(${startDate}::date, ${endDate}::date, 'cur_visits_in_range')`;
      const data = await tx.$queryRawUnsafe(
        `FETCH ALL FROM cur_visits_in_range`,
      );
      await tx.$executeRawUnsafe(`CLOSE cur_visits_in_range`);
      return data as unknown[];
    });

    return c.json({
      data: rows,
      metadata: {
        start_date: startDate,
        end_date: endDate,
        total_visits: rows.length,
      },
    });
  } catch (error) {
    console.error('Error calling sp_get_visits_in_range:', error);
    return c.json({ error: 'Failed to get visits in range' }, 500);
  }
});
