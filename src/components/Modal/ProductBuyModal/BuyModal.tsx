'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { purchaseProduct } from './actions'

interface Model {
  model_id: string
  name: string
  price: number
  total_count: number
  description: string
}

export const BuyModal = ({
  model,
  closeModal,
  user,
}: {
  model: Model[]
  closeModal: () => void
  user: User
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const { handleSubmit, watch, setValue } = useForm<{ quantity: number }>({
    defaultValues: {
      quantity: 1, // 초기 수량을 1로 설정
    },
  })

  const quantity = watch('quantity')

  // 총 결제 금액 계산
  const totalPrice = quantity * model[0]?.price || 0

  // 구매 가능 최대 수량 계산 (잔액과 재고를 고려)
  const maxQuantityByBalance = Math.floor(user.balance / model[0]?.price)
  const maxQuantityByStock = model[0]?.total_count // 재고 수량
  const maxQuantity = Math.min(maxQuantityByBalance, maxQuantityByStock)

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setValue('quantity', quantity + 1) // 수량 증가
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setValue('quantity', quantity - 1) // 수량 감소 (0 이하로 내려가지 않도록)
    }
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  const onSubmit = handleSubmit(async () => {
    setLoading(true)
    setFormError(null)

    try {
      const formData = new FormData()
      formData.append('model_id', model[0].model_id)
      formData.append('quantity', quantity.toString())

      const result = await purchaseProduct(formData)

      if (result && result.formErrors && result.formErrors.purchase) {
        setFormError(result.formErrors.purchase)
      } else {
        // 구매 성공 시 모달 닫기 및 페이지 리프레시 또는 리디렉션
        handleCloseModal()
        router.push('/product') // 예시: 구매 내역 페이지로 이동
        router.refresh() // 또는 현재 페이지 새로고침
      }
    } catch (error: unknown) {
      let errorMessage = '구매 중 오류가 발생했습니다. 다시 시도해주세요.'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      setFormError(errorMessage)
      console.error('구매 오류:', error)
    } finally {
      setLoading(false)
    }
  })

  // 모달 열림 시 스크롤 막기
  useEffect(() => {
    // 모달이 열릴 때
    document.body.style.overflow = 'hidden'

    return () => {
      // 모달이 닫힐 때
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      {/* 배경 요소 */}
      <div
        className={`fixed inset-0 m-auto w-[600px] bg-black transition-opacity ${
          isClosing ? 'opacity-0' : 'opacity-40'
        } z-40`}
        onClick={handleCloseModal} // 배경 클릭 시 모달 닫기
      />
      {/* 모달 내용 */}
      <div
        className={`fixed bottom-0 mx-auto w-full max-w-[600px] rounded-t-[16px] bg-white p-6 shadow-lg ${
          isClosing ? 'animate-slideDown' : 'animate-slideUp'
        } z-50`}
      >
        <form className="flex flex-col gap-6 bg-white" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 p-2">
            {model.map((data) => (
              <div key={data.model_id}>
                <p className="text-[20px] font-bold">{data.name}</p>
                <p className="text-[16px]">{data.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                최대 구매 가능 수량: {maxQuantity}개
              </p>
              <p className="text-[18px]">
                {model[0]?.price.toLocaleString()}원
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                className="flex-grow text-center"
                value={quantity}
                readOnly
              />
              <Button
                type="button"
                className="w-[64px] rounded-md border border-slate-100 bg-white text-black hover:bg-slate-50"
                onClick={handleDecrease}
                disabled={quantity <= 1 || loading} // 수량이 1 이하일 때 비활성화
              >
                -
              </Button>
              <Button
                type="button"
                className="w-[64px] rounded-md border border-slate-100 bg-white text-black hover:bg-slate-50"
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity || loading}
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">총 결제 금액</p>
            <p className="text-sm font-medium">
              {totalPrice.toLocaleString()}원 {/* 총 결제 금액 */}
            </p>
          </div>
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex items-center gap-6">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="w-full bg-gray-400 hover:bg-gray-300"
              disabled={loading}
            >
              취소하기
            </Button>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400"
              disabled={quantity === 0 || loading}
            >
              {loading ? '구매 중...' : '구매하기'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
