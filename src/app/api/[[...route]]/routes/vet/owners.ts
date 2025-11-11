import prisma from '@db/vet';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const owner = new Hono().basePath('/owners');

owner.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const vet = await prisma.vet.findUnique({
    where: { vet_id: jwtPayload.sub },
  });
  const data = await prisma.$queryRaw`
      SELECT DISTINCT o.*
      FROM owners o
      JOIN animal a ON o.owner_id = a.owner_id
      JOIN visit v ON a.animal_id = v.animal_id
      JOIN vet vt ON v.vet_id = vt.vet_id
      WHERE vt.clinic_id = ${vet?.clinic_id}
    `;
  return c.json({ data });
});

owner.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM owners WHERE owner_id = ${id}`;
  return c.json({ data });
});
