'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { getModelById } from './actions'

interface Model {
  model_id: string
  name: string
  price: number
  total_count: number
  description: string
}

export const BuyModal = ({
  productId,
  closeModal,
}: {
  productId: string
  closeModal: () => void
}) => {
  const [models, setModels] = useState<Model[]>([]) // 모델 데이터 상태
  const [isClosing, setIsClosing] = useState(false)
  const [quantity, setQuantity] = useState(0) // 구매 수량 상태 추가
  const maxQuantity = 3 // 최대 구매 수량

  // 모델 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelsData = await getModelById(productId) // API로 모델 데이터 가져오기
        setModels([modelsData]) // 모델 데이터를 상태에 설정
      } catch (error) {
        console.error('모델 데이터를 가져오는 데 실패했습니다:', error)
      }
    }

    fetchModels() // 컴포넌트가 마운트될 때 실행
  }, [productId]) // productId가 변경될 때마다 데이터 새로 가져오기

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1) // 수량 증가
  }

  const handleDecrease = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1) // 수량 감소 (0 미만으로는 안됨)
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  // 총 결제 금액 계산
  const totalPrice = quantity * models[0]?.price || 0 // models 배열에서 첫 번째 모델의 price 사용

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
        <form className="flex flex-col gap-6 bg-white">
          <div className="flex flex-col gap-2 p-2">
            {models.map((model) => (
              <div key={model.model_id}>
                <p className="text-[20px] font-bold">{model.name}</p>
                <p className="text-[16px]">{model.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-5">
                구매 수량(최대 {maxQuantity}개)
              </p>
              <p className="text-[18px]">
                {models[0]?.price.toLocaleString()}원
              </p>
            </div>
            <div className="flex w-full gap-3">
              <Input
                type="number"
                className="flex w-[400px] border-slate-100 text-center"
                value={quantity} // input 값은 상태로 관리
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
                disabled={quantity >= maxQuantity} // 수량이 최대일 경우 비활성화
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
