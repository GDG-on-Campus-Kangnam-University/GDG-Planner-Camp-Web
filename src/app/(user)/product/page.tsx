import { getUser } from '@/app/login/actions'
import UserDepositCard from '@/components/Card/UserDepositCard'
import { ProductList } from '@/components/Product/ProductList'
import Link from 'next/link'

const ProductPage = async () => {
  const user = await getUser()

  return (
    <section className="flex flex-col gap-6">
      <UserDepositCard user={user} />
      <hr />
      <ProductList />
      <Link href="/statistics">
        <div className="fixed bottom-4 right-4 rounded-full bg-blue-600 p-4 text-sm text-white shadow-lg transition-colors hover:bg-blue-700 sm:text-lg">
          통계 화면
        </div>
      </Link>
    </section>
  )
}

export default ProductPage
