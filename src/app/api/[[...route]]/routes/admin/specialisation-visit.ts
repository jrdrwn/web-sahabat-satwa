import prisma from '@db';
import { Hono } from 'hono';

export const specialisationVisit = new Hono().basePath('/spec-visit');

specialisationVisit.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM spec_visit`;
  return c.json({ data });
});

specialisationVisit.get('/:clinicId/:vetId', async (c) => {
  const clinicId = parseInt(c.req.param('clinicId'));
  const vetId = parseInt(c.req.param('vetId'));
  const data =
    await prisma.$queryRaw`SELECT * FROM spec_visit WHERE clinic_id = ${clinicId} AND vet_id = ${vetId}`;
  return c.json({ data });
});

specialisationVisit.post('/', async (c) => {
  const body = await c.req.json();
  const { clinic_id, vet_id, sv_count } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO spec_visit (clinic_id, vet_id, sv_count)
    VALUES (${clinic_id}, ${vet_id}, ${sv_count})
    RETURNING *
  `;
  return c.json({ data });
});

specialisationVisit.put('/:clinicId/:vetId', async (c) => {
  const clinicId = parseInt(c.req.param('clinicId'));
  const vetId = parseInt(c.req.param('vetId'));
  const body = await c.req.json();
  const { sv_count } = body;
  const data = await prisma.$queryRaw`
    UPDATE spec_visit
    SET sv_count = ${sv_count}
    WHERE clinic_id = ${clinicId} AND vet_id = ${vetId}
    RETURNING *
  `;
  return c.json({ data });
});

specialisationVisit.delete('/:clinicId/:vetId', async (c) => {
  const clinicId = parseInt(c.req.param('clinicId'));
  const vetId = parseInt(c.req.param('vetId'));
  const data =
    await prisma.$queryRaw`DELETE FROM spec_visit WHERE clinic_id = ${clinicId} AND vet_id = ${vetId} RETURNING *`;
  return c.json({ data });
});
