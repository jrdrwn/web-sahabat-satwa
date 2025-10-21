import prisma from '@db';
import { Hono } from 'hono';

export const owner = new Hono().basePath('/owners');

owner.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM owners`;
  return c.json({ data });
});

owner.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM owners WHERE owner_id = ${id}`;
  return c.json({ data });
});
