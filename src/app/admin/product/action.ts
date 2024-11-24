'use server'

import {
  ProductFormData,
  ProductStatus,
} from '@/components/Modal/PostProductModal'
import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PostProduct(formData: ProductFormData) {
  console.log(formData)
  try {
    const product = await db.product.create({
      data: {
        name: formData.productName,
        description: formData.description,
        picture:
          formData.productImage && formData.productImage[0]
            ? formData.productImage[0].name
            : '',
        status: ProductStatus.AVAILABLE,
      },
    })
    console.log(product) // product 생성에서 payload 오류가 발생

    // const productWithModel = await db.product.update({
    //   where: { product_id: product.product_id },
    //   data: {
    //     models: {
    //       create: {
    //         name: formData.model.modelName,
    //         description: formData.model.modelDescription,
    //         price: formData.model.modelPrice,
    //         total_count: formData.model.modelQuantity,
    //       },
    //     },
    //   },
    // })

    return NextResponse.json({ product: product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 },
    )
  }
}
