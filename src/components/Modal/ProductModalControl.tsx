'use client'

import { User } from '@prisma/client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { BuyModal } from './ProductBuyModal/BuyModal'

interface Model {
  model_id: string
  name: string
  price: number
  total_count: number
  description: string
}

const ProductModal = ({ model, user }: { model: Model[]; user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="fixed bottom-0 w-[600px] bg-white px-6 py-3">
        <Button
          type="button"
          onClick={openModal}
          className="w-full bg-blue-500 hover:bg-blue-400"
        >
          제품 구매하기
        </Button>
      </div>
      {isModalOpen && (
        <BuyModal model={model} closeModal={closeModal} user={user} />
      )}
    </>
  )
}

export default ProductModal
