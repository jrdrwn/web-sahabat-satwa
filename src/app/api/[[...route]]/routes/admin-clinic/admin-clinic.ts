import prisma from '@db/admin-clinic';
import bcrypt from 'bcrypt';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const adminClinicRoute = new Hono().basePath('/admin-clinic');

adminClinicRoute.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const data =
    await prisma.$queryRaw`SELECT * FROM admin_clinic WHERE clinic_id = ${adminClinic?.clinic_id}`;
  return c.json({ data });
});

adminClinicRoute.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM admin_clinic WHERE id = ${id}`;
  return c.json({ data });
});

adminClinicRoute.put('/:id', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const id = parseInt(c.req.param('id'));

  if (id !== adminClinic?.id) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  const body = await c.req.json();
  const { username, email, password, name } = body;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$queryRaw`UPDATE admin_clinic SET password = ${hashedPassword} WHERE id = ${id}`;
  }

  const data = await prisma.$queryRaw`
    UPDATE admin_clinic
    SET username = ${username}, email = ${email}, name = ${name}
    WHERE id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});
