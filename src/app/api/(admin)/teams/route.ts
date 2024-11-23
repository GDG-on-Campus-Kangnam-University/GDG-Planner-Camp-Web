import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authenticate } from '@/middleware/auth'; // 미들웨어 경로에 따라 수정
import { v4 as uuidv4 } from 'uuid';

// 애플리케이션 레벨에서 Role 타입 정의
const ALLOWED_ROLES = ['ADMIN', 'USER'] as const;
type Role = typeof ALLOWED_ROLES[number];

// POST 요청 처리: 새로운 팀 생성
export async function POST(request: NextRequest) {
  try {
    // 사용자 인증
    const user = await authenticate(request);
    console.log('Authenticated user:', user);

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

    const { name, user_ids } = body;

    // 필수 필드 검증: name
    if (name === undefined || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'name 필드는 필수이며 문자열이어야 합니다.' },
        { status: 400 }
      );
    }

    // user_ids가 배열인지 확인
    if (user_ids !== undefined && !Array.isArray(user_ids)) {
      return NextResponse.json(
        { error: 'user_ids는 배열이어야 합니다.' },
        { status: 400 }
      );
    }

    // user_ids가 배열인 경우, 각 요소가 숫자인지 확인
    if (Array.isArray(user_ids)) {
      for (const id of user_ids) {
        if (typeof id !== 'number') {
          return NextResponse.json(
            { error: 'user_ids 배열의 모든 요소는 숫자여야 합니다.' },
            { status: 400 }
          );
        }
      }
    }

    // 새로운 팀 생성
    const newTeam = await prisma.team.create({
      data: {
        name: name,
        revenue: 0, // 기본값
      },
      include: {
        users: true,
        products: true,
        settings: true,
      },
    });

    console.log('New team created:', newTeam);

    // user_ids가 제공된 경우 해당 사용자들의 team_id 업데이트
    if (Array.isArray(user_ids) && user_ids.length > 0) {
      // 존재하는 user_id만 필터링
      const existingUsers = await prisma.user.findMany({
        where: {
          user_id: { in: user_ids },
        },
      });

      // 존재하지 않는 user_id가 있는지 확인
      const existingUserIds = existingUsers.map(user => user.user_id);
      const invalidUserIds = user_ids.filter((id: number) => !existingUserIds.includes(id));

      if (invalidUserIds.length > 0) {
        return NextResponse.json(
          { error: `존재하지 않는 user_id입니다: ${invalidUserIds.join(', ')}` },
          { status: 400 }
        );
      }

      // 사용자들의 team_id 업데이트
      await prisma.user.updateMany({
        where: {
          user_id: { in: user_ids },
        },
        data: {
          team_id: newTeam.team_id,
        },
      });

      console.log(`Users with IDs ${user_ids.join(', ')} assigned to team ${newTeam.team_id}`);
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
