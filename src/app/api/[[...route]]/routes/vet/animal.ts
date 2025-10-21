import prisma from '@db';
import { Hono } from 'hono';

export const animal = new Hono().basePath('/animal');

// GET all animals
animal.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM animal`;
  return c.json({ data });
});

// GET animal by id
animal.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM animal WHERE animal_id = ${id}`;
  return c.json({ data });
});
