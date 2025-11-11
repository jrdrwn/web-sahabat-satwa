import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const clinic = new Hono().basePath('/clinic');

// CLINIC
clinic.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const data =
    await prisma.$queryRaw`SELECT * FROM clinic WHERE clinic_id = ${adminClinic?.clinic_id}`;
  return c.json({ data });
});

clinic.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM clinic WHERE clinic_id = ${id}`;
  return c.json({ data });
});
