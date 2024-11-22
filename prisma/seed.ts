import prisma from "@/lib/prisma";

async function main() {
  // 더미 팀 데이터 생성
  const team = await prisma.team.create({
    data: {
      name: "Team Alpha",
      product: {
        create: {
          name: "Product A",
          picture: "https://example.com/image.png",
          status: "available",
          description: "This is a sample product.",
        },
      },
      settings: {
        create: {
          blurred: false,
        },
      },
    },
  });

  // 더미 유저 데이터 생성
  const users = await prisma.user.createMany({
    data: [
      {
        user_id: 1,
        password: "password123",
        name: "Alice",
        balance: 50000,
        role: "admin",
        team_id: team.team_id,
      },
      {
        user_id: 2,
        password: "password456",
        name: "Bob",
        balance: 70000,
        role: "member",
        team_id: team.team_id,
      },
    ],
  });

  // 더미 모델 데이터 생성
  const model = await prisma.model.create({
    data: {
      name: "Model X",
      total_count: 100,
      price: 1000,
      description: "This is a sample model.",
      product_id: team.product_id,
    },
  });

  // 더미 구매 데이터 생성
  await prisma.purchase.create({
    data: {
      user_id: 1,
      model_id: model.model_id,
      quantity: 2,
      purchase_date: new Date(),
    },
  });

  console.log("Dummy data has been created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
