import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

export const animal = new Hono().basePath('/animal');

// GET all animals
animal.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM animal`;
  return c.json({ data });
});

// GET animal by id
animal.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM animal WHERE animal_id = ${id}`;
  return c.json({ data });
});

// POST new animal
animal.post('/', async (c) => {
  const body = await c.req.json();
  const { animal_name, animal_born, owner_id, at_id } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO animal (animal_name, animal_born, owner_id, at_id)
    VALUES (${animal_name}, ${animal_born}::date, ${owner_id}, ${at_id})
    RETURNING *
  `;
  return c.json({ data });
});

// PUT update animal
animal.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { animal_name, animal_born, owner_id, at_id } = body;
  const data = await prisma.$queryRaw`
    UPDATE animal
    SET animal_name = ${animal_name}, animal_born = ${animal_born}::date, owner_id = ${owner_id}, at_id = ${at_id}
    WHERE animal_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

// DELETE animal
animal.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM animal WHERE animal_id = ${id} RETURNING *`;
  return c.json({ data });
});
