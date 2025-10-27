import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { except } from 'hono/combine';
import { jwt } from 'hono/jwt';

import { Role } from '../../constants';
import { JWTPayload } from '../../types';
import { animal } from './animal';
import { animalType } from './animal-type';
import { auth } from './auth';
import { clinic } from './clinic';
import { drug } from './drug';
import { overview } from './overview';
import { owner } from './owners';
import { specialisation } from './specialisation';
import { specialisationVisit } from './specialisation-visit';
import { vet } from './vet';
import { visit } from './visit';
import { visitDrug } from './visit-drug';

export const admin = new Hono().basePath('/admin-clinic');

admin.use(
  '/*',
  except('*/*/login', async (c, next) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    });
    return jwtMiddleware(c, next);
  }),
);

admin.use(
  '/*',
  except('*/*/login', async (c, next) => {
    const jwtPayload = c.get('jwtPayload') as JWTPayload;
    if (jwtPayload.role !== Role.ADMIN_CLINIC) {
      return c.json({ status: false, message: 'Unauthorized' }, 401);
    }
    return next();
  }),
);

admin.get('/echo', (c) => {
  return c.json({ message: 'Hello from admin!' });
});

admin.route('/', auth);
admin.route('/', vet);
admin.route('/', owner);
admin.route('/', clinic);
admin.route('/', drug);
admin.route('/', animalType);
admin.route('/', specialisation);
admin.route('/', animal);
admin.route('/', visit);
admin.route('/', visitDrug);
admin.route('/', specialisationVisit);
admin.route('/', overview);
