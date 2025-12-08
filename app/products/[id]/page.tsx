import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { fetchProduct } from '@/lib/api/products'
import { Header } from '@/components/layout/Header'
import { ProductDetailActions } from '@/components/products/ProductDetailActions'
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils/cart'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

async function fetchProductData(id: number) {
  try {
    return await fetchProduct(id)
  } catch (error) {
    if (error instanceof Error && error.message.includes('Product not found')) {
      return null
    }
    throw error
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await fetchProductData(Number(id))

  if (!product) {
    notFound()
  }

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discountPercentage,
  )

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 right-4 rounded bg-red-500 px-3 py-1 text-sm font-bold text-white">
                  -{product.discountPercentage.toFixed(0)}% OFF
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${(index + 1).toString()}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.brand && (
              <p className="mb-2 text-sm font-medium tracking-wide text-gray-600 uppercase">
                {product.brand}
              </p>
            )}

            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-xl text-yellow-400">★</span>
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">
                {product.reviews.length} reviews
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(discountedPrice)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="mt-1 font-medium text-green-600">
                  You save {formatPrice(product.price - discountedPrice)} (
                  {product.discountPercentage.toFixed(0)}%)
                </p>
              )}
            </div>

            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="font-medium text-green-600">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="font-medium text-red-600">✗ Out of Stock</p>
              )}
            </div>

            <ProductDetailActions product={product} />

            <div className="mb-6 border-t border-gray-200 pt-6">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Description
              </h2>
              <p className="leading-relaxed text-gray-700">
                {product.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Product Details
              </h2>
              <dl className="grid grid-cols-1 gap-3">
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <dt className="text-gray-600">Category</dt>
                  <dd className="font-medium text-gray-900">
                    {product.category}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="font-medium text-gray-900">{product.sku}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <dt className="text-gray-600">Weight</dt>
                  <dd className="font-medium text-gray-900">
                    {product.weight}g
                  </dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <dt className="text-gray-600">Warranty</dt>
                  <dd className="font-medium text-gray-900">
                    {product.warrantyInformation}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    {product.shippingInformation}
                  </dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="text-gray-600">Return Policy</dt>
                  <dd className="font-medium text-gray-900">
                    {product.returnPolicy}
                  </dd>
                </div>
              </dl>
            </div>

            {product.reviews.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Customer Reviews
                </h2>
                <div className="space-y-4">
                  {product.reviews.slice(0, 3).map((review, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {review.reviewerName}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-medium text-gray-700">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
