// /app/api/products/route.ts

import prisma from '@/lib/prisma';
import { authenticate } from '@/middleware/auth';
import { NextResponse } from 'next/server';


// GET - Products
export async function GET(req: Request) {
  try {
    // 사용자 인증
    const payload = await authenticate(req);
    if (!payload) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    // 사용자 정보 가져오기
    const user = await prisma.user.findUnique({
      where: { user_id: payload.user_id },
      select: {
        name: true,
        balance: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 모든 제품과 해당 팀 정보 가져오기
    const products = await prisma.product.findMany({
      select: {
        product_id: true,
        name: true,
        picture: true,
        status: true,
        description: true,
        team: {
          select: {
            team_id: true,
            name: true,
          },
        },
      },
    });

    // 응답 데이터 구성
    const response = {
      user_name: user.name,
      balance: user.balance,
      products: products,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('제품 목록을 가져오는 중 오류 발생:', error);
    return NextResponse.json({ error: '제품 목록을 가져오지 못했습니다.' }, { status: 500 });
  }
}

// POST - Product
export async function POST(req: Request) {
    try {
      // 사용자 인증
      const payload = await authenticate(req);
      if (!payload) {
        return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
      }
  
      // 관리자 권한 확인
      if (payload.role !== 'ADMIN') {
        return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
      }
  
      const { name, picture, status, description, team_id } = await req.json();
  
      // 입력 값 검증
      if (!name || !picture || !status || !description || !team_id) {
        return NextResponse.json({ error: '필수 항목이 누락되었습니다.' }, { status: 400 });
      }
  
      // 팀 존재 여부 확인
      const team = await prisma.team.findUnique({
        where: { team_id },
      });
  
      if (!team) {
        return NextResponse.json({ error: '해당 팀을 찾을 수 없습니다.' }, { status: 404 });
      }
  
      // 새로운 제품 생성 및 팀과 연결
      const newProduct = await prisma.product.create({
        data: {
          name,
          picture,
          status,
          description,
          team: {
            connect: { team_id },
          },
        },
      });
  
      // 팀의 product_id 업데이트
      await prisma.team.update({
        where: { team_id },
        data: { product_id: newProduct.product_id },
      });
  
      return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
      console.error('제품 생성 중 오류 발생:', error);
      return NextResponse.json({ error: '제품을 생성하지 못했습니다.' }, { status: 500 });
    }
  }
  