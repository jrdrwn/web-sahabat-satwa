import { Hono } from 'hono';
import { type JwtVariables } from 'hono/jwt';
import { handle } from 'hono/vercel';

import { admin } from './routes/admin';
import { owner } from './routes/owner';
import { vet } from './routes/vet';

type Variables = JwtVariables;

const app = new Hono<{
  Variables: Variables;
}>().basePath('/api');

app.route('/', admin);
app.route('/', vet);
app.route('/', owner);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
