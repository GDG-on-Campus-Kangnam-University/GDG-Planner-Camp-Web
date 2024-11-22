import UserDepositCard from '@/components/Card/UserDepositCard'
import { ProductList } from '@/components/Product/ProductList'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import { getUser } from '../actions'
import { getInitialProducts } from './actions'

// const getCachedProducts = nextCache(getInitialProducts, ['home-products'])

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>

const UserHomePage = async () => {
  const initialProducts = await getInitialProducts()
  const user = await getUser()

  // const revalidate = async () => {
  //   'use server'
  //   revalidatePath('/home')
  // }

  return (
    <section className="flex flex-col gap-6">
      <hr />
      <UserDepositCard user={user} />
      <hr />
      <ProductList initialProducts={initialProducts} />

      <Link href="/statistics">
        <div className="fixed bottom-4 right-4 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-colors hover:bg-blue-700">
          통계 페이지
        </div>
      </Link>
    </section>
  )
}

export default UserHomePage
