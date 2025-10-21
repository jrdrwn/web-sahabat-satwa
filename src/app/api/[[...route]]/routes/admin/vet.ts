import prisma from '@db/admin';
import { Hono } from 'hono';

export const vet = new Hono().basePath('/vet');

vet.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM vet`;
  return c.json({ data });
});

vet.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM vet WHERE vet_id = ${id}`;
  return c.json({ data });
});

vet.post('/', async (c) => {
  const body = await c.req.json();
  const {
    vet_title,
    vet_givenname,
    vet_familyname,
    vet_phone,
    vet_employed,
    spec_id,
    clinic_id,
  } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO vet (vet_title, vet_givenname, vet_familyname, vet_phone, vet_employed, spec_id, clinic_id)
    VALUES (${vet_title}, ${vet_givenname}, ${vet_familyname}, ${vet_phone}, ${vet_employed}::date, ${spec_id}, ${clinic_id})
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
    clinic_id,
  } = body;
  const data = await prisma.$queryRaw`
    UPDATE vet
    SET vet_title = ${vet_title}, vet_givenname = ${vet_givenname}, vet_familyname = ${vet_familyname},
        vet_phone = ${vet_phone}, vet_employed = ${vet_employed}::date, spec_id = ${spec_id}, clinic_id = ${clinic_id}
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
