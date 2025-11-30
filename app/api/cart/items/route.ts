// app/api/cart/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  getOrCreateCartSessionId,
  getOrCreateCart,
  findCartBySessionId,
} from '@/lib/cart';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      productId?: number;
      quantity?: number;
    } | null;

    if (!body || typeof body.productId !== 'number') {
      return new NextResponse('productId is required', { status: 400 });
    }

    const quantity = body.quantity && body.quantity > 0 ? body.quantity : 1;

    // 商品が存在するか確認
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    });

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // セッションIDとCartを用意
    const sessionId = getOrCreateCartSessionId();
    const cart = await getOrCreateCart(sessionId);

    // すでに同じ商品がカートにあるか？
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });

    if (existingItem) {
      // 数量を足す
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // 新規追加
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
        },
      });
    }

    // 更新後のカートを返す
    const updatedCart = await findCartBySessionId(sessionId);

    const totalPrice =
      updatedCart?.items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0,
      ) ?? 0;

    return NextResponse.json({
      id: updatedCart?.id ?? null,
      items:
        updatedCart?.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
          },
        })) ?? [],
      totalPrice,
    });
  } catch (error) {
    console.error('[POST /api/cart/items] error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
