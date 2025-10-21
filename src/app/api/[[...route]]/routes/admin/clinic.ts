import prisma from '@db';
import { Hono } from 'hono';

export const clinic = new Hono().basePath('/clinic');

// CLINIC
clinic.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM clinic`;
  return c.json({ data });
});

clinic.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM clinic WHERE clinic_id = ${id}`;
  return c.json({ data });
});

clinic.post('/', async (c) => {
  const body = await c.req.json();
  const { clinic_name, clinic_address, clinic_phone } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO clinic (clinic_name, clinic_address, clinic_phone)
    VALUES (${clinic_name}, ${clinic_address}, ${clinic_phone})
    RETURNING *
  `;
  return c.json({ data });
});

clinic.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { clinic_name, clinic_address, clinic_phone } = body;
  const data = await prisma.$queryRaw`
    UPDATE clinic
    SET clinic_name = ${clinic_name}, clinic_address = ${clinic_address}, clinic_phone = ${clinic_phone}
    WHERE clinic_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

clinic.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM clinic WHERE clinic_id = ${id} RETURNING *`;
  return c.json({ data });
});
