/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { fetcher } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { ProductCard } from '../Card/ProductCard'

export const ProductList = () => {
  const { data: products, error } = useSWR('/api/products', fetcher, {
    refreshInterval: 10000, // Re-fetch data every 10 seconds
  })

  const [page] = useState(0)
  const trigger = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!products) return

    const observer = new IntersectionObserver(
      async (entries) => {
        const element = entries[0]
        if (element.isIntersecting && trigger.current) {
          // Load more products when the trigger is visible
          observer.unobserve(trigger.current)
          // Implement pagination logic here if needed
          // For example, fetch the next page of products
        }
      },
      {
        threshold: 1.0,
      },
    )

    if (trigger.current) {
      observer.observe(trigger.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [products, page])

  if (error) return <div>Failed to load products.</div>
  if (!products) return <div>Loading products...</div>

  return (
    <div className="grid grid-cols-3 gap-x-1.5 gap-y-6 pb-8">
      {products.map((product: any) => (
        <ProductCard key={product.product_id} {...product} />
      ))}
      {/* Infinite scrolling trigger */}
      {/* Uncomment and adjust if implementing pagination */}
      {/* {!isLastPage && (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          Load more
        </span>
      )} */}
    </div>
  )
}
