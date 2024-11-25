// lib/actions.ts
'use server'

import db from '@/lib/db'

export async function getProduct(id: string) {
  const products = await db.product.findFirst({
    where: {
      product_id: id,
    },
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
  })
  return products
}

export async function getModels(id: string) {
  const model = await db.model.findFirst({
    where: { product_id: id },
    select: {
      model_id: true,
      name: true,
      price: true,
      total_count: true,
      description: true,
      product: true,
      product_id: true,
      purchases: true,
    },
  })
  return model ? [model] : []
}

export const getModelById = async (id: string) => {
  try {
    const model = await db.model.findFirst({
      where: { product_id: id },
      select: {
        model_id: true,
        name: true,
        price: true,
        total_count: true,
        description: true,
        product: true,
        product_id: true,
        purchases: true,
      },
    })

    if (!model) {
      throw new Error('모델을 찾을 수 없습니다.')
    }

    return model
  } catch (error) {
    console.log(error)
    throw new Error('모델 데이터를 가져오는 데 실패했습니다.')
  }
}
