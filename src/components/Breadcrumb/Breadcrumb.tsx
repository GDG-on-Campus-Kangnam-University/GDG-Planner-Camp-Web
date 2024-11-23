import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Layers3 } from 'lucide-react'

export function BreadcrumbDemo({ selectedItem }: { selectedItem: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Layers3 size={16} />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {selectedItem !== 'Home' && (
          <BreadcrumbItem>
            <BreadcrumbPage>{selectedItem}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
