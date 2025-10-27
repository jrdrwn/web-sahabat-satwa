import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

export const animalType = new Hono().basePath('/animal-type');

// GET all animal types
animalType.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM animal_type`;
  return c.json({ data });
});

// GET animal type by id
animalType.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM animal_type WHERE at_id = ${id}`;
  return c.json({ data });
});

// POST new animal type
animalType.post('/', async (c) => {
  const body = await c.req.json();
  const { at_description } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO animal_type (at_description)
    VALUES (${at_description})
    RETURNING *
  `;
  return c.json({ data });
});

// PUT update animal type
animalType.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { at_description } = body;
  const data = await prisma.$queryRaw`
    UPDATE animal_type
    SET at_description = ${at_description}
    WHERE at_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

// DELETE animal type
animalType.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM animal_type WHERE at_id = ${id} RETURNING *`;
  return c.json({ data });
});
