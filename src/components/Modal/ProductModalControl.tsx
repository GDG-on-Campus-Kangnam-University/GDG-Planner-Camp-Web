// components/ProductModal.tsx
'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { BuyModal } from './BuyModal'
import { PostProductModal } from './PostProductModal'

const ProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        type="button"
        onClick={openModal}
        className="w-full bg-blue-500 hover:bg-blue-400"
      >
        제품 구매하기
      </Button>
      {isModalOpen && <PostProductModal closeModal={closeModal} />}
    </>
  )
}

export default ProductModal
