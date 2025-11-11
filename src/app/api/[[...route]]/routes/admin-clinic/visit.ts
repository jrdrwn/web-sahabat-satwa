import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const visit = new Hono().basePath('/visit');

visit.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const data = await prisma.$queryRaw`
    SELECT v.*, a.animal_name, vt.vet_givenname, vt.vet_familyname
    FROM visit v
    JOIN vet vt ON v.vet_id = vt.vet_id
    JOIN animal a ON v.animal_id = a.animal_id
    WHERE vt.clinic_id = ${adminClinic?.clinic_id}
  `;
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

visit.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM visit WHERE visit_id = ${id} RETURNING *`;
  return c.json({ data });
});
