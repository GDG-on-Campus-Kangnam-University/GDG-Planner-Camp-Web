'use client'

import { getUploadUrl, PostProduct } from '@/app/admin/product/action'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD_OUT = 'sold_out',
  WAITING = 'waiting',
}

interface ModelData {
  modelName: string
  modelDescription: string
  modelPrice: number
  modelQuantity: number
}

export interface ProductFormData {
  productName: string
  description: string
  team_id: string
  photo: string
  productImage: FileList
  model: ModelData
}

export interface ProductData {
  productName: string
  description: string
  team_id: string
  photo: string
  model: ModelData
}

export const PostProductModalControl = () => {
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
        className="w-40 bg-blue-500 px-3 hover:bg-blue-400"
        onClick={openModal}
      >
        <p className="text-sm">추가하기</p>
      </Button>
      {isModalOpen && <PostProductModal closeModal={closeModal} />}
    </>
  )
}

const PostProductModal = ({ closeModal }: { closeModal: () => void }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [uploadUrl, setUploadUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<ProductFormData>({
    defaultValues: {
      model: {
        modelName: '',
        modelDescription: '',
        modelPrice: 0,
        modelQuantity: 0,
      },
    },
    mode: 'onChange',
  })

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      closeModal()
    }, 300)
  }

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event
    if (!files) {
      return
    }
    const file = files[0]

    setFile(file)
    const { success, result } = await getUploadUrl()
    if (success) {
      const { id, uploadURL } = result
      setUploadUrl(uploadURL)
      setValue(
        'photo',
        `https://imagedelivery.net/ysR4eOJgia8sQeiFnFYhhA/${id}/public`,
      )
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    console.log('폼 데이터:', data)
    if (!file) {
      return
    }

    const cloudflareForm = new FormData()
    cloudflareForm.append('file', file)
    const response = await fetch(uploadUrl, {
      method: 'post',
      body: cloudflareForm,
    })
    if (response.status !== 200) {
      return
    }
    // await PostProduct(formData)

    try {
      await PostProduct({
        productName: data.productName,
        description: data.description,
        photo: data.photo,
        team_id: data.team_id,
        model: {
          modelName: data.model.modelName,
          modelDescription: data.model.modelDescription,
          modelPrice: data.model.modelPrice,
          modelQuantity: data.model.modelQuantity,
        },
      })
      console.log('Product created:')
      closeModal()
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isClosing ? 'opacity-0' : 'opacity-40'
        } z-40`}
      ></div>
      <div
        className={`fixed inset-0 flex items-center justify-center transition-transform ${
          isClosing ? 'animate-scale-out' : 'animate-scale-in'
        } z-50`}
      >
        <div className="w-[600px] rounded-[16px] bg-white p-6 shadow-lg">
          <form
            className="flex flex-col gap-6 bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              {...register('productName', { required: true })}
              placeholder="제품 이름"
            />
            <Textarea
              {...register('description', { required: true })}
              placeholder="제품 설명"
              className="resize-none"
            />
            <Input
              type="file"
              {...register('productImage', { required: true })}
              accept="image/*"
              onChange={onImageChange}
            />
            <Input
              {...register('team_id', { required: true })}
              placeholder="팀 아이디"
            />

            {/* 단일 모델 입력 */}
            <div className="flex flex-col gap-4 border-t pt-4">
              <p className="font-bold">모델</p>
              <Input
                type="text"
                {...register('model.modelName', { required: true })}
                placeholder="모델 이름"
              />
              <Input
                {...register('model.modelDescription', { required: true })}
                placeholder="모델 설명"
                className="resize-none"
              />
              <Input
                type="number"
                {...register('model.modelPrice', {
                  required: true,
                })}
                placeholder="가격"
              />
              <Input
                type="number"
                {...register('model.modelQuantity', {
                  required: true,
                  min: 0,
                })}
                placeholder="총 개수"
              />
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
                disabled={!isValid} // 폼이 유효하지 않으면 비활성화
              >
                등록하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
