// app/api/initData/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 이미 초기 데이터가 존재하는지 확인
    const existingUsers = await prisma.user.findMany();
    if (existingUsers.length > 0) {
      return NextResponse.json({ message: '초기 데이터가 이미 존재합니다.' }, { status: 200 });
    }

    // 팀 생성
    const team1 = await prisma.team.create({
      data: {
        name: '팀 알파',
      },
    });

    const team2 = await prisma.team.create({
      data: {
        name: '팀 베타',
      },
    });

    // 사용자 생성
    const user1 = await prisma.user.create({
      data: {
        user_id: 1,
        password: 'password123',
        name: '홍길동',
        role: 'admin',
        balance: 100000,
        team_id: team1.team_id,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        user_id: 2,
        password: 'password456',
        name: '이몽룡',
        role: 'user',
        balance: 100000,
        team_id: team1.team_id,
      },
    });

    const user3 = await prisma.user.create({
      data: {
        user_id: 3,
        password: 'password789',
        name: '성춘향',
        role: 'user',
        balance: 100000,
        team_id: team2.team_id,
      },
    });

    // 제품 생성
    const product1 = await prisma.product.create({
      data: {
        name: '제품 X',
        picture: 'product_x.jpg',
        status: 'available',
        description: '제품 X의 설명',
        team_id: team1.team_id,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        name: '제품 Y',
        picture: 'product_y.jpg',
        status: 'available',
        description: '제품 Y의 설명',
        team_id: team2.team_id,
      },
    });

    // 모델 생성
    const model1 = await prisma.model.create({
      data: {
        name: '모델 A',
        total_count: 100,
        price: 500,
        description: '모델 A의 설명',
        product_id: product1.product_id,
      },
    });

    const model2 = await prisma.model.create({
      data: {
        name: '모델 B',
        total_count: 200,
        price: 1000,
        description: '모델 B의 설명',
        product_id: product2.product_id,
      },
    });

    // 구매 생성
    await prisma.purchase.create({
      data: {
        user_id: user1.user_id,
        model_id: model1.model_id,
        quantity: 2,
        purchase_date: new Date(),
      },
    });

    await prisma.purchase.create({
      data: {
        user_id: user2.user_id,
        model_id: model2.model_id,
        quantity: 1,
        purchase_date: new Date(),
      },
    });

    // 글로벌 설정 생성
    await prisma.globalSetting.create({
      data: {
        team_id: team1.team_id,
        blurred: false,
      },
    });

    await prisma.globalSetting.create({
      data: {
        team_id: team2.team_id,
        blurred: true,
      },
    });

    return NextResponse.json({ message: '초기 데이터가 성공적으로 삽입되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('초기 데이터 삽입 중 오류 발생:', error);
    return NextResponse.json({ error: '초기 데이터 삽입 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
