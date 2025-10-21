import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { except } from 'hono/combine';
import { jwt } from 'hono/jwt';

import { Role } from '../../constants';
import { JWTPayload } from '../../types';
import { animal } from './animal';
import { auth } from './auth';
import { visit } from './visit';

export const owner = new Hono().basePath('/owner');

owner.use(
  '/*',
  except(['*/*/login', '*/*/register'], async (c, next) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
    const jwtMiddleware = jwt({
      secret: JWT_SECRET,
    });
    return jwtMiddleware(c, next);
  }),
);

owner.use(
  '/*',
  except(['*/*/login', '*/*/register'], async (c, next) => {
    const jwtPayload = c.get('jwtPayload') as JWTPayload;
    if (jwtPayload.role !== Role.OWNER) {
      return c.json({ status: false, message: 'Unauthorized' }, 401);
    }
    return next();
  }),
);

owner.get('/echo', (c) => {
  return c.json({ message: 'Hello from vet!' });
});

owner.route('/', auth);
owner.route('/', animal);
owner.route('/', visit);
