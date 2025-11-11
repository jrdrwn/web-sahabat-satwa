import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const vet = new Hono().basePath('/vet');

vet.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const data =
    await prisma.$queryRaw`SELECT * FROM vet WHERE clinic_id = ${adminClinic?.clinic_id}`;
  return c.json({ data });
});

vet.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM vet WHERE vet_id = ${id}`;
  return c.json({ data });
});

vet.post('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const body = await c.req.json();
  const {
    vet_title,
    vet_givenname,
    vet_familyname,
    vet_phone,
    vet_employed,
    spec_id,
  } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO vet (vet_title, vet_givenname, vet_familyname, vet_phone, vet_employed, spec_id, clinic_id)
    VALUES (${vet_title}, ${vet_givenname}, ${vet_familyname}, ${vet_phone}, ${vet_employed}::date, ${spec_id}, ${adminClinic?.clinic_id})
    RETURNING *
  `;
  return c.json({ data });
});

vet.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const {
    vet_title,
    vet_givenname,
    vet_familyname,
    vet_phone,
    vet_employed,
    spec_id,
  } = body;
  const data = await prisma.$queryRaw`
    UPDATE vet
    SET vet_title = ${vet_title}, vet_givenname = ${vet_givenname}, vet_familyname = ${vet_familyname},
        vet_phone = ${vet_phone}, vet_employed = ${vet_employed}::date, spec_id = ${spec_id}
    WHERE vet_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

vet.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM vet WHERE vet_id = ${id} RETURNING *`;
  return c.json({ data });
});
