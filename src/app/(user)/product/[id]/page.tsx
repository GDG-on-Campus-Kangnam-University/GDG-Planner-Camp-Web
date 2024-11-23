// app/product/[id]/page.tsx 또는 pages/product/[id].tsx
import MarkdownRenderer from '@/components/Markdown/MarkdownRender'
import ProductModal from '@/components/Modal/ProductModalControl'
import db from '@/lib/db'
import Image from 'next/image'

async function getProduct(id: string) {
  const products = await db.product.findFirst({
    where: {
      product_id: id,
    },
    select: {
      product_id: true,
      name: true,
      picture: true,
      status: true,
      description: true,
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

const markdownContent = `
## 사용자 화면

### 1. 로그인 화면

- **1.1 로그인 분리**
    - 로그인에 따라 어드민(Admin)과 일반 사용자를 구분합니다.
- **1.2 기능 제한**
    - 회원가입, 아이디 찾기, 비밀번호 찾기 기능은 제공되지 않습니다.
- **1.3 계정 생성 방법**
    - 사용자 계정은 어드민 계정이거나 직접 DB 조작으로 생성할 수 있습니다.
- **1.4 로그인 정보**
    - **아이디:** 학번
    - **비밀번호:** 전화번호 뒷자리

### 2. 프로덕트 리스트

- **2.1 프로덕트 정보**
    - **2.1.1 프로덕트 이름**
    - **2.1.2 프로덕트 설명**
    - **2.1.3 프로덕트 사진**
    - **2.1.4 프로덕트 개발 팀 이름**
- **2.2 비즈니스 모델 (2개)**
    - **2.2.1 수익 상품 이름**
    - **2.2.2 수익 상품 가격**
    - **2.2.3 수익 상품 개수**
    - **2.2.4 수익 상품 설명**
`

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id)

  return (
    <div className="flex flex-col justify-center gap-2 bg-white pb-16">
      <Image
        src={product?.picture ?? ''}
        alt="empty"
        width={600}
        height={633}
        className="w-full"
      />
      <div className="flex border-b border-b-slate-100">
        <p className="px-4 py-2 text-[24px]">{product?.team?.name}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <p className="text-[36px] font-bold">{product?.name}</p>
        <MarkdownRenderer markdownContent={markdownContent} />
      </div>
      <ProductModal />
    </div>
  )
}

export default ProductDetailPage
