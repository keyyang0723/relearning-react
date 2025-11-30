// app/api/cart/route.ts
import { NextResponse } from 'next/server';
import { findCartBySessionId, getOrCreateCartSessionId } from '@/lib/cart';

export async function GET() {
  try {
    const sessionId = getOrCreateCartSessionId();
    const cart = await findCartBySessionId(sessionId);

    if (!cart) {
      // カート未作成なら「空カート」として返す
      return NextResponse.json({
        id: null,
        items: [],
        totalPrice: 0,
      });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );

    return NextResponse.json({
      id: cart.id,
      items: cart.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
        },
      })),
      totalPrice,
    });
  } catch (error) {
    console.error('[GET /api/cart] error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
