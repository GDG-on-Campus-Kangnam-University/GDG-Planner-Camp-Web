// components/Product.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '../ui/checkbox'
import { ArrowDownUp, Ellipsis } from 'lucide-react'

const productData = {
  headers: [
    '프로덕트ID',
    '프로덕트 이름',
    '팀 ID',
    '프로덕트 상태',
    '총 매출액',
  ],
  rows: [
    ['P001', '제품 A', 'T001', '활성', '₩1,000,000'],
    ['P002', '제품 B', 'T002', '비활성', '₩500,000'],
    ['P003', '제품 C', 'T001', '활성', '₩700,000'],
  ],
}

export function Product() {
  return (
    <Table className="rounded-lg border">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          {productData.headers.map((header, index) => (
            <TableHead key={index}>
              <div className="flex items-center gap-1.5">
                {header}
                {index === 1 && (
                  <ArrowDownUp
                    size={16}
                    // onClick={toggleSortDirection}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {productData.rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>
              <Checkbox />
            </TableCell>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
            <TableCell>
              <Ellipsis size={16} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
