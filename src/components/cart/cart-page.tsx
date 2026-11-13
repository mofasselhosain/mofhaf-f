
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const {
    items,
    cartCount,
    subtotal,
    isHydrated,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (!isHydrated) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        Loading your cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 rounded-full bg-muted p-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">
          Your Cart is Empty
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          You haven't added any products to your cart yet.
        </p>

        <Button  className="mt-6">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have {cartCount} item(s) in your cart.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearCart}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_350px]">
        {/* Cart Products */}
        <section className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
            >
              {/* Product Image */}
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:w-28">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>

              {/* Product Information */}
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">
                  {product.category}
                </p>

                <h2 className="mt-1 line-clamp-2 font-semibold">
                  {product.name}
                </h2>

                <p className="mt-2 font-bold">
                  ৳{product.price.toLocaleString("en-BD")}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Stock: {product.stock ?? 0}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    disabled={quantity <= 1}
                    onClick={() =>
                      updateQuantity(product.id, quantity - 1)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="min-w-8 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    disabled={quantity >= (product.stock ?? 0)}
                    onClick={() =>
                      updateQuantity(product.id, quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>

              <div className="text-right font-bold sm:w-28">
                ৳{(product.price * quantity).toLocaleString("en-BD")}
              </div>
            </div>
          ))}
        </section>

        {/* Order Summary */}
        <aside className="rounded-xl border p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Order Summary</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Total Items
              </span>
              <span>{cartCount}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal
              </span>
              <span>
                ৳{subtotal.toLocaleString("en-BD")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Shipping
              </span>
              <span>Calculated at checkout</span>
            </div>

            <Separator />

            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>৳{subtotal.toLocaleString("en-BD")}</span>
            </div>
          </div>

          <Button className="mt-6 w-full" >
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>

          <Button
            variant="outline"
            className="mt-3 w-full"
            
          >
            <Link href="/product">Continue Shopping</Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}
