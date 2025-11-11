import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const specialisationVisit = new Hono().basePath('/spec-visit');

specialisationVisit.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const data =
    await prisma.$queryRaw`SELECT * FROM spec_visit WHERE clinic_id = ${adminClinic?.clinic_id}`;
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
