'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'

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
}: {
  model: Model[]
  closeModal: () => void
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const maxQuantity = 3 // 최대 구매 수량

  const { handleSubmit, watch, setValue } = useForm<{ quantity: number }>({
    defaultValues: {
      quantity: 0,
    },
  })

  const quantity = watch('quantity')

  // 총 결제 금액 계산
  const totalPrice = quantity * model[0]?.price || 0

  const handleIncrease = () => {
    setValue('quantity', quantity + 1) // 수량 증가
  }

  const handleDecrease = () => {
    setValue('quantity', quantity - 1) // 수량 감소
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  const onSubmit = async () => {
    console.log('click')
  }
  return (
    <>
      {/* 배경 요소 */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isClosing ? 'opacity-0' : 'opacity-40'
        } z-40`}
      ></div>

      {/* 모달 내용 */}
      <div
        className={`fixed bottom-0 w-[600px] rounded-t-[16px] bg-white p-6 shadow-lg ${
          isClosing ? 'animate-slideDown' : 'animate-slideUp'
        } z-50`}
      >
        <form
          className="flex flex-col gap-6 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              <p className="text-sm font-medium leading-5">
                구매 수량(최대 {maxQuantity}개)
              </p>
              <p className="text-[18px]">
                {model[0]?.price.toLocaleString()}원
              </p>
            </div>
            <div className="flex w-full gap-3">
              <Input
                type="number"
                className="flex w-[400px] border-slate-100 text-center"
                value={quantity}
                readOnly
              />
              <Button
                type="button"
                className="w-[64px] rounded-md border border-slate-100 bg-white text-black hover:bg-slate-50"
                onClick={handleDecrease} // + 클릭 시 증가
              >
                -
              </Button>
              <Button
                type="button"
                className="w-[64px] rounded-md border border-slate-100 bg-white text-black hover:bg-slate-50"
                onClick={handleIncrease} // - 클릭 시 감소
                disabled={quantity >= maxQuantity}
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
          <div className="flex items-center gap-6">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="w-full bg-gray-400 hover:bg-gray-300"
            >
              취소하기
            </Button>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400"
              disabled={quantity === 0} // 수량이 0일 경우 비활성화
            >
              구매하기
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
