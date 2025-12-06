import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import { AddToCartButton } from './AddToCartButton'
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils/cart'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage,
  )

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link
        href={`/products/${product.id.toString()}`}
        className="relative block h-64"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{product.discountPercentage.toFixed(0)}%
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link
          href={`/products/${product.id.toString()}`}
          className="block hover:text-blue-600"
        >
          <h3 className="line-clamp-2 min-h-[3rem] font-semibold text-gray-900">
            {product.title}
          </h3>
        </Link>

        {product.brand && (
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        )}

        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">
            {product.stock > 0
              ? `${product.stock.toString()} in stock`
              : 'Out of stock'}
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
