import prisma from '@db/admin';
import { Hono } from 'hono';

export const owner = new Hono().basePath('/owners');

owner.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM owners`;
  return c.json({ data });
});

owner.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM owners WHERE owner_id = ${id}`;
  return c.json({ data });
});

owner.post('/', async (c) => {
  const body = await c.req.json();
  const { owner_givenname, owner_familyname, owner_address, owner_phone } =
    body;
  const data = await prisma.$queryRaw`
    INSERT INTO owners (owner_givenname, owner_familyname, owner_address, owner_phone)
    VALUES (${owner_givenname}, ${owner_familyname}, ${owner_address}, ${owner_phone})
    RETURNING *
  `;
  return c.json({ data });
});

owner.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { owner_givenname, owner_familyname, owner_address, owner_phone } =
    body;
  const data = await prisma.$queryRaw`
    UPDATE owners
    SET owner_givenname = ${owner_givenname}, owner_familyname = ${owner_familyname},
        owner_address = ${owner_address}, owner_phone = ${owner_phone}
    WHERE owner_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

owner.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM owners WHERE owner_id = ${id} RETURNING *`;
  return c.json({ data });
});
