// app/products/page.tsx（抜粋）

import { prisma } from '@/lib/prisma';
import { Product } from '@prisma/client';
import { AddToCartButton } from '@/components/AddToCartButton';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products: Product[] = await prisma.product.findMany({
    orderBy: { id: 'asc' },
  });

  if (products.length === 0) {
    // 省略
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-lg border p-4 shadow-sm flex flex-col gap-2"
          >
            {/* 画像などは省略 */}

            <h2 className="font-semibold text-lg">{product.name}</h2>

            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
            )}

            <p className="mt-auto text-right font-bold">
              ￥{product.price.toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">
              在庫: {product.stock} 個
            </p>

            {/* 👇 ここで追加 */}
            <AddToCartButton productId={product.id} />
          </article>
        ))}
      </div>
    </main>
  );
}
