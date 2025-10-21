import prisma from '@db/admin';
import { Hono } from 'hono';

export const specialisation = new Hono().basePath('/specialisation');

// GET all specialisations
specialisation.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM specialisation`;
  return c.json({ data });
});

// GET specialisation by id
specialisation.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`SELECT * FROM specialisation WHERE spec_id = ${id}`;
  return c.json({ data });
});

// POST new specialisation
specialisation.post('/', async (c) => {
  const body = await c.req.json();
  const { spec_description } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO specialisation (spec_description)
    VALUES (${spec_description})
    RETURNING *
  `;
  return c.json({ data });
});

// PUT update specialisation
specialisation.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { spec_description } = body;
  const data = await prisma.$queryRaw`
    UPDATE specialisation
    SET spec_description = ${spec_description}
    WHERE spec_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

// DELETE specialisation
specialisation.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM specialisation WHERE spec_id = ${id} RETURNING *`;
  return c.json({ data });
});
