import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

const prisma = new PrismaClient();
// src/app/api/users/route.ts

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        team: true,
        purchases: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('유저 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST request body:', body); // 디버그용 로그

    const { password, name, balance, role, team_id } = body;

    // 필수 필드 검증
    if (
      password === undefined ||
      name === undefined ||
      balance === undefined ||
      role === undefined
    ) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 데이터 타입 검증
    if (
      typeof password !== 'number' ||
      typeof name !== 'string' ||
      typeof balance !== 'number' ||
      typeof role !== 'string'
    ) {
      return NextResponse.json(
        { error: '잘못된 데이터 타입입니다.' },
        { status: 400 }
      );
    }

    // Role 값 검증
    if (!Object.values(Role).includes(role as Role)) {
      return NextResponse.json(
        { error: '유효하지 않은 역할 값입니다.' },
        { status: 400 }
      );
    }

    // team_id가 제공된 경우 해당 팀이 존재하는지 확인
    if (team_id !== null && team_id !== undefined) {
      const teamExists = await prisma.team.findUnique({
        where: { team_id: BigInt(team_id) },
      });

      if (!teamExists) {
        return NextResponse.json(
          { error: '존재하지 않는 team_id입니다.' },
          { status: 400 }
        );
      }
    }

    // 새로운 유저 생성
    const newUser = await prisma.user.create({
      data: {
        password,
        name,
        balance: BigInt(balance),
        role: role as Role, // Type Assertion 사용
        team_id: team_id ? BigInt(team_id) : null,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error('유저 생성 오류:', error);

    // Prisma의 unique constraint 오류 등 구체적인 에러 처리 가능
    if (error.code === 'P2002') {
      // unique constraint failed
      return NextResponse.json(
        { error: '이미 존재하는 유저입니다.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
