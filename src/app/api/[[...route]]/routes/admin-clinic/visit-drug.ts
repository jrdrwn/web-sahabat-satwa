import prisma from '@db/admin-clinic';
import { Hono } from 'hono';

import { JWTPayload } from '../../types';

export const visitDrug = new Hono().basePath('/visit-drug');

// GET all visit_drug
visitDrug.get('/', async (c) => {
  const jwtPayload = c.get('jwtPayload') as JWTPayload;
  const adminClinic = await prisma.admin_clinic.findUnique({
    where: { id: jwtPayload.sub },
  });
  const data = await prisma.$queryRaw`
  SELECT vd.*, d.drug_name, v.visit_date_time
  FROM visit_drug vd
  JOIN visit v ON vd.visit_id = v.visit_id
  JOIN vet vt ON v.vet_id = vt.vet_id
  JOIN drug d ON vd.drug_id = d.drug_id
  WHERE vt.clinic_id = ${adminClinic?.clinic_id}
`;
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

// DELETE visit_drug
visitDrug.delete('/:visitId/:drugId', async (c) => {
  const visitId = parseInt(c.req.param('visitId'));
  const drugId = parseInt(c.req.param('drugId'));
  const data =
    await prisma.$queryRaw`DELETE FROM visit_drug WHERE visit_id = ${visitId} AND drug_id = ${drugId} RETURNING *`;
  return c.json({ data });
});
