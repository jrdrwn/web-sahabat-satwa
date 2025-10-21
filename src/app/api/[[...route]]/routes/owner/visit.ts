import prisma from '@db/owner';
import { Hono } from 'hono';
import { JWTPayload } from 'hono/utils/jwt/types';

export const visit = new Hono().basePath('/visit');

visit.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;

  const data = await prisma.$queryRaw`SELECT * FROM visit
  JOIN animal ON visit.animal_id = animal.animal_id
  WHERE animal.owner_id = ${jwtPayload.sub}
  `;
  return c.json({ data });
});

visit.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM visit WHERE visit_id = ${id}`;
  return c.json({ data });
});
