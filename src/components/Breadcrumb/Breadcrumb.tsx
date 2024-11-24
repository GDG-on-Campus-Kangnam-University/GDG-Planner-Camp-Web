import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Layers3 } from 'lucide-react'

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Layers3 size={16} />
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/* {selectedItem !== 'Home' && (
          <BreadcrumbItem>
            <BreadcrumbPage>{selectedItem}</BreadcrumbPage>
          </BreadcrumbItem>
        )} */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
