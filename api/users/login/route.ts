import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('POST /api/users/login request body:', body); // 디버그용 로그

    const { user_id, password } = body;

    if (!user_id || !password) {
      return NextResponse.json(
        { error: 'user_id와 password는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    if (
      (typeof user_id !== 'number' && typeof user_id !== 'string') ||
      typeof password !== 'string'
    ) {
      return NextResponse.json(
        { error: '잘못된 데이터 타입입니다.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { user_id: typeof user_id === 'string' ? parseInt(user_id) : user_id },
    });
    console.log(user)
    if (!user) {
      return NextResponse.json(
        { error: '존재하지 않는 사용자입니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '10h' } // 토큰 유효 기간 설정 (예: 1시간)
    );

    // 응답 반환
    return NextResponse.json(
      {
        token: token,
        user: {
          user_id: user.user_id.toString(), // user_id를 문자열로 변환
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('로그인 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
