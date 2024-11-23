// src/app/api/admin/users/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';
import { authenticate } from '@/middleware/auth'; // 미들웨어 경로에 따라 수정

// 애플리케이션 레벨에서 Role 타입 정의
const ALLOWED_ROLES = ['ADMIN', 'USER'] as const;
type Role = typeof ALLOWED_ROLES[number];

// GET 요청 처리: 모든 사용자 목록 조회
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

// POST 요청 처리: 새로운 사용자 생성
export async function POST(request: NextRequest) {
  try {
    // 사용자 인증
    const user = await authenticate(request);

    if (!user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // 인가: ADMIN 역할 확인
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '접근 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    console.log('POST /api/admin/users request body:', body); // 디버그용 로그

    const { user_id, password, name, role, team_id } = body;

    // 필수 필드 검증: user_id, password, name, role
    if (
      user_id === undefined ||
      password === undefined ||
      name === undefined ||
      role === undefined
    ) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 데이터 타입 검증
    if (
      typeof user_id !== 'number' ||
      typeof password !== 'string' ||
      typeof name !== 'string' ||
      typeof role !== 'string'
    ) {
      return NextResponse.json(
        { error: '잘못된 데이터 타입입니다.' },
        { status: 400 }
      );
    }

    // Role 값 검증
    if (!ALLOWED_ROLES.includes(role as Role)) {
      return NextResponse.json(
        { error: '유효하지 않은 역할 값입니다.' },
        { status: 400 }
      );
    }

    // team_id가 제공된 경우 해당 팀이 존재하는지 확인
    if (team_id !== null && team_id !== undefined) {
      if (typeof team_id !== 'string') {
        return NextResponse.json(
          { error: 'team_id는 문자열이어야 합니다.' },
          { status: 400 }
        );
      }

      const teamExists = await prisma.team.findUnique({
        where: { team_id: team_id },
      });

      if (!teamExists) {
        return NextResponse.json(
          { error: '존재하지 않는 team_id입니다.' },
          { status: 400 }
        );
      }
    }

    // 이미 존재하는 user_id인지 확인
    const existingUser = await prisma.user.findUnique({
      where: { user_id: user_id },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 존재하는 회원입니다.' },
        { status: 409 }
      );
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 유저 생성
    const newUser = await prisma.user.create({
      data: {
        user_id,
        password: hashedPassword, // 해시된 비밀번호 저장
        name,
        role, // 이미 문자열로 처리됨
        team_id: team_id ? team_id : null,
        // balance는 기본값이 있으므로 생략
      },
    });

    // 성공 메시지 반환
    return NextResponse.json(
      { message: 'User created successfully', newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('유저 생성 오류:', error);

    // Prisma의 unique constraint 오류 등 구체적인 에러 처리 가능
    if (error.code === 'P2002') {
      // unique constraint failed
      return NextResponse.json(
        { error: '이미 존재하는 회원입니다.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
