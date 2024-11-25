'use server'

import db from '@/lib/db'
import getSession from '@/lib/sessions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Zod 스키마를 사용하여 입력 데이터 검증
const purchaseSchema = z.object({
  model_id: z.string().uuid(),
  quantity: z.number().int().positive(),
})

// 반환 타입 정의
export type PurchaseProductResult = null | {
  formErrors?: {
    purchase?: string
  }
}

export async function purchaseProduct(
  formData: FormData,
): Promise<PurchaseProductResult> {
  // FormData에서 데이터 추출
  const model_id = formData.get('model_id')
  const quantity = formData.get('quantity')

  // 데이터 검증
  const result = purchaseSchema.safeParse({
    model_id,
    quantity: Number(quantity),
  })

  if (!result.success) {
    // 검증 실패 시 에러 반환
    return { formErrors: { purchase: '유효하지 않은 입력 데이터입니다.' } }
  }

  const { model_id: validModelId, quantity: validQuantity } = result.data

  // 세션에서 사용자 정보 가져오기
  const session = await getSession()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const userId = session.user.id

  // 트랜잭션을 사용하여 데이터 일관성 유지
  try {
    await db.$transaction(async (tx) => {
      // 사용자 정보 가져오기
      const user = await tx.user.findUnique({
        where: { user_id: userId },
        select: { balance: true, team_id: true },
      })

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.')
      }

      // 모델 정보 가져오기
      const model = await tx.model.findUnique({
        where: { model_id: validModelId },
        include: {
          product: {
            select: { team_id: true },
          },
        },
      })

      if (!model) {
        throw new Error('모델을 찾을 수 없습니다.')
      }

      // 현재 구매 수 확인
      const currentPurchaseCount = await tx.purchase.count({
        where: { model_id: validModelId },
      })

      if (currentPurchaseCount + validQuantity > model.total_count) {
        throw new Error('해당 모델의 재고가 부족합니다.')
      }

      // 사용자의 팀과 모델의 팀 비교
      if (user.team_id && model.product?.team_id === user.team_id) {
        throw new Error('자신이 속한 팀의 프로덕트는 구매할 수 없습니다.')
      }

      // 총 구매 비용 계산
      const totalCost = model.price * validQuantity

      if (user.balance < totalCost) {
        throw new Error('잔액이 부족합니다.')
      }

      // 구매 기록 생성
      await tx.purchase.create({
        data: {
          user_id: userId,
          model_id: validModelId,
          quantity: validQuantity,
          purchase_date: new Date(),
        },
      })

      // 사용자의 잔액 업데이트
      await tx.user.update({
        where: { user_id: userId },
        data: { balance: { decrement: totalCost } },
      })
    })

    // 구매 성공
    return null // 성공 시 null 반환
  } catch (error: unknown) {
    // 에러 처리
    let errorMessage = '구매 중 오류가 발생했습니다.'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error('구매 오류:', errorMessage)
    return { formErrors: { purchase: errorMessage } }
  }
}
