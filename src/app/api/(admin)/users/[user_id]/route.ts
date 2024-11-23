// src/app/api/admin/users/[user_id]/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';
import { authenticate } from '@/middleware/auth'; // 미들웨어 경로에 따라 수정

// 애플리케이션 레벨에서 Role 타입 정의
const ALLOWED_ROLES = ['ADMIN', 'USER'] as const;
type Role = typeof ALLOWED_ROLES[number];

// 유효한 role 체크 함수
function isValidRole(role: any): role is Role {
  return ALLOWED_ROLES.includes(role);
}

// GET 요청 처리: 특정 사용자 상세 조회
export async function GET(request: NextRequest, { params }: { params: { user_id: string } }) {
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

    const userId = parseInt(params.user_id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: '유효하지 않은 user_id입니다.' },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        team: true,
        purchases: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(targetUser);
  } catch (error) {
    console.error('사용자 상세 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

// PUT 요청 처리: 특정 사용자 수정
export async function PUT(request: NextRequest, { params }: { params: { user_id: string } }) {
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

    const userId = parseInt(params.user_id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: '유효하지 않은 user_id입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log(`PUT /api/admin/users/${userId} request body:`, body); // 디버그용 로그

    const { password, name, role, team_id } = body;

    // 최소 하나의 필드가 제공되었는지 확인
    if (
      password === undefined &&
      name === undefined &&
      role === undefined &&
      team_id === undefined
    ) {
      return NextResponse.json(
        { error: '수정할 필드가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 데이터 타입 검증 및 준비
    const updateData: any = {};

    if (password !== undefined) {
      if (typeof password !== 'string') {
        return NextResponse.json(
          { error: 'password는 문자열이어야 합니다.' },
          { status: 400 }
        );
      }
      // 비밀번호 해시화
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (name !== undefined) {
      if (typeof name !== 'string') {
        return NextResponse.json(
          { error: 'name은 문자열이어야 합니다.' },
          { status: 400 }
        );
      }
      updateData.name = name;
    }

    if (role !== undefined) {
      if (typeof role !== 'string' || !isValidRole(role)) {
        return NextResponse.json(
          { error: '유효하지 않은 역할 값입니다.' },
          { status: 400 }
        );
      }
      updateData.role = role;
    }

    if (team_id !== undefined) {
      if (team_id !== null && typeof team_id !== 'string') {
        return NextResponse.json(
          { error: 'team_id는 문자열이어야 합니다.' },
          { status: 400 }
        );
      }

      if (team_id !== null) {
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

      updateData.team_id = team_id;
    }

    // 사용자가 존재하는지 확인
    const existingUser = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: updateData,
      include: {
        team: true,
        purchases: true,
      },
    });

    return NextResponse.json(
      { message: '사용자가 성공적으로 업데이트되었습니다.', updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('사용자 수정 오류:', error);

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

// DELETE 요청 처리: 특정 사용자 삭제
export async function DELETE(request: NextRequest, { params }: { params: { user_id: string } }) {
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

    const userId = parseInt(params.user_id, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: '유효하지 않은 user_id입니다.' },
        { status: 400 }
      );
    }

    // 사용자가 존재하는지 확인
    const existingUser = await prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 사용자 삭제
    await prisma.user.delete({
      where: { user_id: userId },
    });

    return NextResponse.json(
      { message: '사용자가 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
