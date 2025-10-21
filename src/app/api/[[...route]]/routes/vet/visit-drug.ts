import prisma from '@db';
import { Hono } from 'hono';

export const visitDrug = new Hono().basePath('/visit-drug');

// GET all visit_drug
visitDrug.get('/', async (c) => {
  const data = await prisma.$queryRaw`SELECT * FROM visit_drug`;
  return c.json({ data });
});

// GET specific visit_drug by visitId and drugId
visitDrug.get('/:visitId/:drugId', async (c) => {
  const visitId = parseInt(c.req.param('visitId'));
  const drugId = parseInt(c.req.param('drugId'));
  const data =
    await prisma.$queryRaw`SELECT * FROM visit_drug WHERE visit_id = ${visitId} AND drug_id = ${drugId}`;
  return c.json({ data });
});

// POST new visit_drug
visitDrug.post('/', async (c) => {
  const body = await c.req.json();
  const {
    visit_id,
    drug_id,
    visit_drug_dose,
    visit_drug_frequency,
    visit_drug_qtysupplied,
  } = body;
  const data = await prisma.$queryRaw`
    INSERT INTO visit_drug (visit_id, drug_id, visit_drug_dose, visit_drug_frequency, visit_drug_qtysupplied)
    VALUES (${visit_id}, ${drug_id}, ${visit_drug_dose}, ${visit_drug_frequency}, ${visit_drug_qtysupplied})
    RETURNING *
  `;
  return c.json({ data });
});

// PUT update visit_drug
visitDrug.put('/:visitId/:drugId', async (c) => {
  const visitId = parseInt(c.req.param('visitId'));
  const drugId = parseInt(c.req.param('drugId'));
  const body = await c.req.json();
  const { visit_drug_dose, visit_drug_frequency, visit_drug_qtysupplied } =
    body;
  const data = await prisma.$queryRaw`
    UPDATE visit_drug
    SET visit_drug_dose = ${visit_drug_dose}, visit_drug_frequency = ${visit_drug_frequency},
        visit_drug_qtysupplied = ${visit_drug_qtysupplied}
    WHERE visit_id = ${visitId} AND drug_id = ${drugId}
    RETURNING *
  `;
  return c.json({ data });
});
