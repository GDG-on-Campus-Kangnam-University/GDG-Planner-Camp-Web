'use server'

import { ProductData } from '@/components/Modal/PostProductModal'
import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PostProduct(formData: ProductData) {
  try {
    const product = await db.product.create({
      data: {
        name: formData.productName,
        description: formData.description,
        picture: formData.photo,
        team_id: formData.team_id,
      },
    })

    await db.model.create({
      data: {
        name: formData.model.modelName,
        description: formData.model.modelDescription,
        price: Number(formData.model.modelPrice), // 숫자로 변환
        total_count: Number(formData.model.modelQuantity), // 숫자로 변환
        product: product.product_id
          ? {
              connect: { product_id: product.product_id },
            }
          : undefined,
      },
    })

    return true
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 },
    )
  }
}

// export async function uploadProduct(formData: FormData) {
//   const data = {
//     photo: formData.get('photo'),
//     title: formData.get('title'),
//     price: formData.get('price'),
//     description: formData.get('description'),
//   }
//   const result = productSchema.safeParse(data)
//   if (!result.success) {
//     return result.error.flatten()
//   } else {
//     const session = await getSession()
//     if (session.id) {
//       const product = await db.product.create({
//         data: {
//           title: result.data.title,
//           description: result.data.description,
//           price: result.data.price,
//           photo: result.data.photo,
//           user: {
//             connect: {
//               id: session.id,
//             },
//           },
//         },
//         select: {
//           id: true,
//         },
//       })
//       redirect(`/products/${product.id}`)
//       //redirect("/products")
//     }
//   }
// }

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    },
  )
  const data = await response.json()
  return data
}
