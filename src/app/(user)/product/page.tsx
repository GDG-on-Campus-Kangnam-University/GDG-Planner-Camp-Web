import UserDepositCard from '@/components/Card/UserDepositCard'
import { ProductList } from '@/components/Product/ProductList'
import { Prisma } from '@prisma/client'
import Link from 'next/link'

import { getUser } from '@/app/login/actions'
import { getInitialProducts } from './actions'

// const getCachedProducts = nextCache(getInitialProducts, ['home-products'])

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>

const ProductPage = async () => {
  const initialProducts = await getInitialProducts()
  const user = await getUser()

  // const revalidate = async () => {
  //   'use server'
  //   revalidatePath('/home')
  // }

  return (
    <section className="flex flex-col gap-6">
      <UserDepositCard user={user} />
      <hr />
      <ProductList initialProducts={initialProducts} />

      <Link href="/statistics">
        <div className="fixed bottom-4 right-4 rounded-full bg-blue-600 p-4 text-sm text-white shadow-lg transition-colors hover:bg-blue-700 sm:text-lg">
          통계 화면
        </div>
      </Link>
    </section>
  )
}

export default ProductPage
