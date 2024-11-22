// /src/middleware/auth.ts

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface JwtPayload {
  user_id: number;
  role: string;
  iat: number;
  exp: number;
}

export async function authenticate(req: Request): Promise<JwtPayload | null> {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { user_id: payload.user_id },
    });

    if (!user) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('JWT 검증 오류:', error);
    return null;
  }
}
