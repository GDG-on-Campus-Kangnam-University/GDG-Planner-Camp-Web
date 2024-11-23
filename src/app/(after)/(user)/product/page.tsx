import UserDepositCard from '@/components/Card/UserDepositCard'
import ProductList from '@/components/Product/ProductList'
import db from '@/lib/db'
import getSession from '@/lib/sessions'
import { Prisma } from '@prisma/client'
import { notFound } from 'next/navigation'

// const getCachedProducts = nextCache(getInitialProducts, ['home-products'])

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      product_id: true,
      name: true,
      picture: true,
      status: true,
      team: {
        select: {
          team_id: true,
          name: true,
        },
      },
    },
  })
  return products
}

async function getUser() {
  const session = await getSession()
  if (session.user?.id) {
    const user = await db.user.findUnique({
      where: {
        user_id: session.user?.id,
      },
    })
    if (user) {
      return user
    }
  }
  notFound()
}

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
    </section>
  )
}

export default UserHomePage
