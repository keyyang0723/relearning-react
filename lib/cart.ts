// lib/cart.ts
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

// カート用セッションIDを取得 or 新規発行
export function getOrCreateCartSessionId() {
  const cookieStore = cookies();
  const existing = cookieStore.get('cart_session_id')?.value;

  if (existing) return existing;

  const newId = randomUUID();

  cookieStore.set('cart_session_id', newId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30日
  });

  return newId;
}

// セッションIDに紐づく Cart を、中身込みで取得
export async function findCartBySessionId(sessionId: string) {
  return prisma.cart.findFirst({
    where: { sessionId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

// Cart が無ければ作成して返す
export async function getOrCreateCart(sessionId: string) {
  const existing = await prisma.cart.findFirst({
    where: { sessionId },
  });

  if (existing) return existing;

  return prisma.cart.create({
    data: {
      sessionId,
    },
  });
}
