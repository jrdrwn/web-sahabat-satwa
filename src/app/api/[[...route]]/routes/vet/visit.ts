import prisma from '@db/vet';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const visit = new Hono().basePath('/visit');

visit.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const data =
    await prisma.$queryRaw`SELECT * FROM visit WHERE vet_id = ${jwtPayload.sub}`;
  return c.json({ data });
});

visit.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM visit WHERE visit_id = ${id}`;
  return c.json({ data });
});

visit.post('/', async (c) => {
  const body = await c.req.json();
  const { visit_date_time, visit_notes, animal_id, vet_id, from_visit_id } =
    body;
  const data = await prisma.$queryRaw`
    INSERT INTO visit (visit_date_time, visit_notes, animal_id, vet_id, from_visit_id)
    VALUES (${visit_date_time}::timestamp, ${visit_notes}, ${animal_id}, ${vet_id}, ${from_visit_id})
    RETURNING *
  `;
  return c.json({ data });
});

visit.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { visit_date_time, visit_notes, animal_id, vet_id, from_visit_id } =
    body;
  const data = await prisma.$queryRaw`
    UPDATE visit
    SET visit_date_time = ${visit_date_time}::timestamp, visit_notes = ${visit_notes},
        animal_id = ${animal_id}, vet_id = ${vet_id}, from_visit_id = ${from_visit_id}
    WHERE visit_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});
