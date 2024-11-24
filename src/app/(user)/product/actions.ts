import db from '@/lib/db'

export async function getInitialProducts() {
  const products = await db.product.findMany({
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
  return products
}
