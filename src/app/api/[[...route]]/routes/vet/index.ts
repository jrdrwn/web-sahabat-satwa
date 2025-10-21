import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { except } from 'hono/combine';
import { jwt } from 'hono/jwt';

import { Role } from '../../constants';
import { JWTPayload } from '../../types';
import { animal } from './animal';
import { auth } from './auth';
import { owner } from './owners';
import { vet as vetRoute } from './vet';
import { visit } from './visit';
import { visitDrug } from './visit-drug';

export const vet = new Hono().basePath('/vet');

vet.use(
  '/*',
  except(['*/*/login', '*/*/register'], async (c, next) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    });
    return jwtMiddleware(c, next);
  }),
);

vet.use(
  '/*',
  except(['*/*/login', '*/*/register'], async (c, next) => {
    const jwtPayload = c.get('jwtPayload') as JWTPayload;
    if (jwtPayload.role !== Role.VET) {
      return c.json({ status: false, message: 'Unauthorized' }, 401);
    }
    return next();
  }),
);

vet.get('/echo', (c) => {
  return c.json({ message: 'Hello from owner!' });
});

vet.route('/', auth);
vet.route('/', animal);
vet.route('/', owner);
vet.route('/', vetRoute);
vet.route('/', visit);
vet.route('/', visitDrug);
