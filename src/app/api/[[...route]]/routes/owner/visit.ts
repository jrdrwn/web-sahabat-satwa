import prisma from '@db';
import { Hono } from 'hono';

export const visit = new Hono().basePath('/visit');

visit.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM visit`;
  return c.json({ data });
});

visit.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM visit WHERE visit_id = ${id}`;
  return c.json({ data });
});
