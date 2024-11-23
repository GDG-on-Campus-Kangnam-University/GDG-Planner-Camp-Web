import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '../ui/checkbox'
import { ArrowDownUp, Ellipsis } from 'lucide-react'
import { useState } from 'react'

// 데이터 정의
const tableData = {
  프로덕트: {
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
  },
  사용자: {
    headers: ['사용자 ID', '사용자 이름', '비밀번호', '권한', '잔액'],
    rows: [
      ['U001', '홍길동', '******', '관리자', '₩200,000'],
      ['U002', '김철수', '******', '사용자', '₩50,000'],
      ['U003', '이영희', '******', '사용자', '₩150,000'],
    ],
  },
}

export function TableDemo({ selectedItem }) {
  const data = tableData[selectedItem] || { headers: [], rows: [] }

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // 정렬 함수
  const sortData = () => {
    const sortedRows = [...data.rows].sort((a, b) => {
      const nameA = a[1].toLowerCase()
      const nameB = b[1].toLowerCase()

      if (sortDirection === 'asc') {
        return nameA.localeCompare(nameB)
      } else {
        return nameB.localeCompare(nameA)
      }
    })

    console.log(sortedRows) // 정렬된 데이터를 콘솔에 출력

    return sortedRows
  }

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <Table className="border">
      <TableCaption>{`${selectedItem} 목록`}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox />
          </TableHead>
          {data.headers.map((header, index) => {
            return (
              <TableHead key={index} className={index === 1 ? 'w-1/2' : ''}>
                <div className="flex items-center gap-1.5">
                  {header}
                  {index === 1 && (
                    <ArrowDownUp
                      size={16}
                      onClick={toggleSortDirection}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortData().map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell>
              <Checkbox />
            </TableCell>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
            <TableCell>
              <Ellipsis size={12} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
