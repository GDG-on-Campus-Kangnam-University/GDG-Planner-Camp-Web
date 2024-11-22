import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 팀 생성
  const team = await prisma.team.create({
    data: {
      name: 'Team A',
      revenue: 100000,
    },
  });

  // 유저 생성
  const user = await prisma.user.create({
    data: {
      name: '홍길동',
      password: 1234,
      balance: 50000,
      role: 'USER',
      team: {
        connect: { team_id: team.team_id },
      },
    },
  });

  // 프로덕트 생성
  const product = await prisma.product.create({
    data: {
      name: 'Product A',
      picture: 'product-a.jpg',
      status: 'ACTIVE',
      description: 'Product A description',
      teams: {
        connect: { team_id: team.team_id },
      },
    },
  });

  // 모델 생성
  const model = await prisma.model.create({
    data: {
      name: 'Model A',
      total_count: 100,
      price: 1000,
      description: 'Model A description',
      product: {
        connect: { product_id: product.product_id },
      },
    },
  });

  // 구매 생성
  const purchase = await prisma.purchase.create({
    data: {
      quantity: 2,
      purchase_date: new Date(),
      user: {
        connect: { user_id: user.user_id },
      },
      model: {
        connect: { model_id: model.model_id },
      },
    },
  });

  // 글로벌 세팅 생성
  const setting = await prisma.globalSetting.create({
    data: {
      blurred: true,
      team: {
        connect: { team_id: team.team_id },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
