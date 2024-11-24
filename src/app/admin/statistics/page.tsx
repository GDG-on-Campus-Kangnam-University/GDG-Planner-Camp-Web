import { BreadcrumbDemo } from '@/components/Breadcrumb/Breadcrumb'

const page = async () => {
  return (
    <div className="flex w-full flex-col gap-7 px-6 py-3">
      <BreadcrumbDemo />
      <div className="flex">
        <h1 className="flex-1 text-[24px] font-semibold">통계</h1>
      </div>
    </div>
  )
}

export default page
