import prisma from '@db/admin';
import { Hono } from 'hono';

export const drug = new Hono().basePath('/drug');

// DRUG

drug.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM drug`;
  return c.json({ data });
});

drug.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data = await prisma.$queryRaw`SELECT * FROM drug WHERE drug_id = ${id}`;
  return c.json({ data });
});

drug.post('/', async (c) => {
  const body = await c.req.json();
  const { drug_name, drug_usage } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO drug (drug_name, drug_usage)
    VALUES (${drug_name}, ${drug_usage})
    RETURNING *
  `;
  return c.json({ data });
});

drug.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { drug_name, drug_usage } = body;
  const data = await prisma.$queryRaw`
    UPDATE drug
    SET drug_name = ${drug_name}, drug_usage = ${drug_usage}
    WHERE drug_id = ${id}
    RETURNING *
  `;
  return c.json({ data });
});

drug.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const data =
    await prisma.$queryRaw`DELETE FROM drug WHERE drug_id = ${id} RETURNING *`;
  return c.json({ data });
});
