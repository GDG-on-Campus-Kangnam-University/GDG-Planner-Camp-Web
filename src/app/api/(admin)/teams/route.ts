import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authenticate } from '@/middleware/auth'; // 미들웨어 경로에 따라 수정
import { v4 as uuidv4 } from 'uuid';

// 애플리케이션 레벨에서 Role 타입 정의
const ALLOWED_ROLES = ['ADMIN', 'USER'] as const;
type Role = typeof ALLOWED_ROLES[number];

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
      console.log('POST /api/admin/teams request body:', body); // 디버그용 로그
  
      const { name, user_id } = body;
  
      // 필수 필드 검증: name
      if (name === undefined || typeof name !== 'string' || name.trim() === '') {
        return NextResponse.json(
          { error: 'name 필드는 필수이며 문자열이어야 합니다.' },
          { status: 400 }
        );
      }
  
      // team_id 생성 (Prisma에서 자동 생성되므로 생략 가능)
      // const newTeamId = uuidv4();
  
      // 새로운 팀 생성
      const newTeam = await prisma.team.create({
        data: {
          name: name,
          revenue: 0, // 기본값
        },
        include: {
          users: true,
          product: true,
          settings: true,
        },
      });
  
      // user_id가 제공된 경우 해당 사용자의 team_id 업데이트
      if (user_id !== null && user_id !== undefined) {
        if (typeof user_id !== 'number') {
          return NextResponse.json(
            { error: 'user_id는 숫자여야 합니다.' },
            { status: 400 }
          );
        }
  
        const teamUser = await prisma.user.findUnique({
          where: { user_id: user_id },
        });
  
        if (!teamUser) {
          return NextResponse.json(
            { error: '존재하지 않는 user_id입니다.' },
            { status: 400 }
          );
        }
  
        await prisma.user.update({
          where: { user_id: user_id },
          data: { team_id: newTeam.team_id },
        });
      }
  
      return NextResponse.json(
        { message: '팀이 성공적으로 생성되었습니다.', newTeam },
        { status: 201 }
      );
    } catch (error: any) {
      console.error('팀 생성 오류:', error);
  
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
