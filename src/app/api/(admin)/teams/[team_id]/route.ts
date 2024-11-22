// src/app/api/admin/teams/[team_id]/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authenticate } from '@/middleware/auth';

// Role 정의는 이미 포함되어 있음

// GET 요청 처리: 특정 팀 상세 조회
export async function GET(request: NextRequest, { params }: { params: { team_id: string } }) {
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

    const { team_id } = params;

    const targetTeam = await prisma.team.findUnique({
      where: { team_id: team_id },
      include: {
        users: true,
        product: true,
        settings: true,
      },
    });

    if (!targetTeam) {
      return NextResponse.json(
        { error: '팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(targetTeam);
  } catch (error) {
    console.error('팀 상세 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

// PUT 요청 처리: 특정 팀 수정
export async function PUT(request: NextRequest, { params }: { params: { team_id: string } }) {
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

    const { team_id } = params;

    const body = await request.json();
    console.log(`PUT /api/admin/teams/${team_id} request body:`, body); // 디버그용 로그

    const { name, user_id, revenue } = body;

    // 최소 하나의 필드가 제공되었는지 확인
    if (name === undefined && user_id === undefined && revenue === undefined) {
      return NextResponse.json(
        { error: '수정할 필드가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 데이터 타입 검증 및 준비
    const updateData: any = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return NextResponse.json(
          { error: 'name은 필수이며 문자열이어야 합니다.' },
          { status: 400 }
        );
      }
      updateData.name = name;
    }

    if (revenue !== undefined) {
      if (typeof revenue !== 'number' || revenue < 0) {
        return NextResponse.json(
          { error: 'revenue는 0 이상의 숫자여야 합니다.' },
          { status: 400 }
        );
      }
      updateData.revenue = revenue;
    }

    // user_id 처리
    if (user_id !== undefined) {
      if (user_id !== null && typeof user_id !== 'number') {
        return NextResponse.json(
          { error: 'user_id는 숫자여야 합니다.' },
          { status: 400 }
        );
      }

      if (user_id !== null) {
        const teamUser = await prisma.user.findUnique({
          where: { user_id: user_id },
        });

        if (!teamUser) {
          return NextResponse.json(
            { error: '존재하지 않는 user_id입니다.' },
            { status: 400 }
          );
        }

        // 기존 팀의 사용자들(team_id를 현재 팀_id로 업데이트)
        await prisma.user.updateMany({
          where: { team_id: team_id },
          data: { team_id: null },
        });

        // 새로운 사용자에게 팀 할당
        await prisma.user.update({
          where: { user_id: user_id },
          data: { team_id: team_id },
        });
      } else {
        // 모든 사용자(team_id)를 null로 설정
        await prisma.user.updateMany({
          where: { team_id: team_id },
          data: { team_id: null },
        });
      }
    }

    // 팀 정보 업데이트
    const updatedTeam = await prisma.team.update({
      where: { team_id: team_id },
      data: updateData,
      include: {
        users: true,
        product: true,
        settings: true,
      },
    });

    return NextResponse.json(
      { message: '팀이 성공적으로 업데이트되었습니다.', updatedTeam },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('팀 수정 오류:', error);

    // Prisma의 unique constraint 오류 등 구체적인 에러 처리 가능
    if (error && error.code === 'P2002') {
      // unique constraint failed
      return NextResponse.json(
        { error: '이미 존재하는 팀입니다.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

// DELETE 요청 처리: 특정 팀 삭제
export async function DELETE(request: NextRequest, { params }: { params: { team_id: string } }) {
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

    const { team_id } = params;

    // 팀이 존재하는지 확인
    const existingTeam = await prisma.team.findUnique({
      where: { team_id: team_id },
    });

    if (!existingTeam) {
      return NextResponse.json(
        { error: '팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 팀 삭제 전에 관련된 사용자들의 team_id를 null로 설정
    await prisma.user.updateMany({
      where: { team_id: team_id },
      data: { team_id: null },
    });

    // 팀 삭제
    await prisma.team.delete({
      where: { team_id: team_id },
    });

    return NextResponse.json(
      { message: '팀이 성공적으로 삭제되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('팀 삭제 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
