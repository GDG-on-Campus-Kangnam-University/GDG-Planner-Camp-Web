// components/User.tsx
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
import { Ellipsis } from 'lucide-react'

const userData = {
  headers: ['사용자 ID', '사용자 이름', '비밀번호', '권한', '잔액'],
  rows: [
    ['U001', '홍길동', '******', '관리자', '₩200,000'],
    ['U002', '김철수', '******', '사용자', '₩50,000'],
    ['U003', '이영희', '******', '사용자', '₩150,000'],
  ],
}

export function User() {
  return (
    <Table className="rounded-lg border">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          {userData.headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.rows.map((row, rowIndex) => (
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
