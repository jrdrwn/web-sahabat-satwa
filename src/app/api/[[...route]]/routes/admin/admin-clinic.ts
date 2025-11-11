import prisma from '@db/admin';
import bcrypt from 'bcrypt';
import { Hono } from 'hono';

export const adminClinic = new Hono().basePath('/admin-clinic');

adminClinic.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM admin_clinic`;
  return c.json({ data });
});

adminClinic.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM admin_clinic WHERE id = ${id}`;
  return c.json({ data });
});

adminClinic.post('/', async (c) => {
  const body = await c.req.json();
  const { username, email, password, name, clinic_id } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await prisma.$queryRaw`
    INSERT INTO admin_clinic (username, email, password, name, clinic_id)
    VALUES (${username}, ${email}, ${hashedPassword}, ${name}, ${clinic_id})
    RETURNING *
  `;
  return c.json({ data });
});

adminClinic.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { username, email, password, name, clinic_id } = body;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$queryRaw`UPDATE admin_clinic SET password = ${hashedPassword} WHERE id = ${id}`;
  }

  const data = await prisma.$queryRaw`
    UPDATE admin_clinic
    SET username = ${username}, email = ${email}, name = ${name}, clinic_id = ${clinic_id}
    WHERE id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

adminClinic.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM admin_clinic WHERE id = ${id} RETURNING *`;
  return c.json({ data });
});
