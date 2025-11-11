import { Hono } from 'hono';
import { type JwtVariables } from 'hono/jwt';
import { handle } from 'hono/vercel';

import { admin } from './routes/admin';
import { adminClinic } from './routes/admin-clinic';
import { owner } from './routes/owner';
import { vet } from './routes/vet';

type Variables = JwtVariables;

const app = new Hono<{
  Variables: Variables;
}>().basePath('/api');

app.route('/', admin);
app.route('/', vet);
app.route('/', owner);
app.route('/', adminClinic);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
