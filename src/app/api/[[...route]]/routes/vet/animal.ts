import prisma from '@db/vet';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const animal = new Hono().basePath('/animal');

// GET all animals
animal.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const vet = await prisma.vet.findUnique({
    where: { vet_id: jwtPayload.sub },
  });
  const data = await prisma.$queryRaw`
      SELECT DISTINCT a.*, at.at_description, o.owner_givenname, o.owner_familyname
      FROM animal a
      JOIN animal_type at ON a.at_id = at.at_id
      JOIN owners o ON a.owner_id = o.owner_id
      JOIN visit v ON a.animal_id = v.animal_id
      JOIN vet vt ON v.vet_id = vt.vet_id
      WHERE vt.clinic_id = ${vet?.clinic_id}
    `;
  return c.json({ data });
});

// GET animal by id
animal.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM animal WHERE animal_id = ${id}`;
  return c.json({ data });
});
