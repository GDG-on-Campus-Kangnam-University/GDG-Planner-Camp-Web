import { PrismaClient, ProductStatus } from '@prisma/client'

const prisma = new PrismaClient()

export async function getInitialProducts() {
  const products = await prisma.product.findMany({
    select: {
      product_id: true,
      name: true,
      picture: true,
      status: true,
      team: {
        select: {
          team_id: true,
          name: true,
        },
      },
    },
  })

  // 상태에 따른 정렬 순서 지정
  const statusOrder: Record<ProductStatus, number> = {
    NEW: 1,
    ONSALE: 2,
    WAITING: 3,
    SOLDOUT: 4,
  }

  // 제품 정렬
  products.sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status]
  })

  return products
}
