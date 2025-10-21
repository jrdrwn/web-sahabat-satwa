import prisma from '@db/owner';
import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcrypt';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { sign } from 'hono/jwt';
import { z } from 'zod';

import { Role } from '../../constants';

export const auth = new Hono().basePath('/');

auth.post(
  '/login',
  zValidator(
    'json',
    z.object({
      identifier: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long'),
    }),
  ),
  async (c) => {
    const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);

    const validated = c.req.valid('json');

    const user = await prisma.owners.findUnique({
      where: {
        email: validated.identifier,
      },
    });

    if (!user) {
      return c.json({ status: false, message: 'User not found' }, 404);
    }

    const match = await bcrypt.compare(validated.password, user.password!);

    if (!match) {
      return c.json({ status: false, message: 'Password not match' }, 401);
    }
    const payload = {
      sub: user.owner_id,
      role: Role.OWNER,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 1 day
    };
    const token = await sign(payload, JWT_SECRET);

    return c.json({
      status: true,
      data: {
        token,
      },
    });
  },
);

auth.post(
  '/register',
  zValidator(
    'json',
    z.object({
      owner_givenname: z.string().trim().min(1).max(30),
      owner_familyname: z.string().trim().min(1).max(30),
      owner_address: z.string().trim().max(100).optional(),
      owner_phone: z.string().trim().max(14).optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long'),
    }),
  ),
  async (c) => {
    const validated = c.req.valid('json');
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const existingOwner = await prisma.owners.findUnique({
      where: { email: validated.email },
    });
    if (existingOwner) {
      return c.json({ status: false, message: 'User already exists' }, 409);
    }

    const newOwner = await prisma.owners.create({
      data: {
        owner_givenname: validated.owner_givenname,
        owner_familyname: validated.owner_familyname,
        owner_address: validated.owner_address,
        owner_phone: validated.owner_phone,
        email: validated.email,
        password: hashedPassword,
      },
    });

    return c.json({
      status: true,
      data: { owner_id: newOwner.owner_id },
    });
  },
);
