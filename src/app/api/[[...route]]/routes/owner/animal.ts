import prisma from '@db/owner';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const animal = new Hono().basePath('/animal');

// GET all animals
animal.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;

  const data =
    await prisma.$queryRaw`SELECT * FROM animal WHERE owner_id = ${jwtPayload.sub}`;
  return c.json({ data });
});

// GET animal by id
animal.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM animal WHERE animal_id = ${id}`;
  return c.json({ data });
});
