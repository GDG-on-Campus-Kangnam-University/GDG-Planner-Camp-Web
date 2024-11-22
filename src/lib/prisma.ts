// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // Node.js에서 전역 객체에 prisma를 추가
  // 이는 타입스크립트에서 글로벌 변수로 인식하게 하기 위함
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: ['query'], // 선택 사항: 쿼리 로깅
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
