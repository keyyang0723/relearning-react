// components/AddToCartButton.tsx
'use client';

import { useState, useTransition } from 'react';

type AddToCartButtonProps = {
  productId: number;
};

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  async function handleClick() {
    setMessage(null);

    try {
      const res = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!res.ok) {
        setMessage('カート追加に失敗しました');
        return;
      }

      const data = await res.json();
      console.log('cart', data);
      setMessage('カートに追加しました');
    } catch (err) {
      console.error(err);
      setMessage('エラーが発生しました');
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => startTransition(handleClick)}
        disabled={isPending}
        className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white disabled:opacity-50"
      >
        {isPending ? '追加中...' : 'カートに入れる'}
      </button>
      {message && (
        <p className="mt-1 text-xs text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
}
