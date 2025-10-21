import prisma from '@db/vet';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const vet = new Hono().basePath('/vet');

vet.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const data =
    await prisma.$queryRaw`SELECT * FROM vet WHERE vet_id = ${jwtPayload.sub}`;
  return c.json({ data });
});

vet.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM vet WHERE vet_id = ${id}`;
  return c.json({ data });
});
