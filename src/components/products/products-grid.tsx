
"use client";

import { useState } from "react";

import type { Product } from "@/types/product";
import { ProductCard } from "./producst-card";

const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    price: 1490,
    originalPrice: 1990,
    rating: 4.8,
    sold: 120,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Minimal Everyday Wristwatch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    price: 1890,
    originalPrice: 2490,
    rating: 4.7,
    sold: 86,
    category: "Fashion",
  },
  {
    id: "3",
    name: "Modern Running Sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    price: 2490,
    originalPrice: 3290,
    rating: 4.6,
    sold: 204,
    category: "Footwear",
  },
  {
    id: "4",
    name: "Classic Everyday Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    price: 1290,
    originalPrice: 1690,
    rating: 4.5,
    sold: 98,
    category: "Accessories",
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    price: 990,
    originalPrice: 1390,
    rating: 4.8,
    sold: 157,
    category: "Electronics",
  },
  {
    id: "6",
    name: "Stylish Everyday Sunglasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    price: 690,
    originalPrice: 990,
    rating: 4.4,
    sold: 75,
    category: "Fashion",
  },
];

export default function ProductGrid() {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickView, setQuickView] = useState<Product | null>(null);

  function toggleWishlist(product: Product) {
    setWishlist((current) =>
      current.includes(product.id)
        ? current.filter((id) => id !== product.id)
        : [...current, product.id]
    );
  }

  function addToCart(product: Product) {
    setCart((current) => [...current, product]);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 sm:py-10 lg:px-8">
      {/* Section heading */}
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
            MOFHAF COLLECTION
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            More to love
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Discover your favorite products.
          </p>
        </div>

        <div className="shrink-0 text-right text-xs text-gray-600 sm:text-sm">
          <p>Cart: {cart.length}</p>
          <p>Wishlist: {wishlist.length}</p>
        </div>
      </div>

      {/* Compact responsive grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onWishlist={toggleWishlist}
            onQuickView={setQuickView}
          />
        ))}
      </div>

      {/* Quick view dialog */}
      {quickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setQuickView(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close quick view"
              onClick={() => setQuickView(null)}
              className="absolute right-3 top-3 rounded-md px-2 py-1 text-xl text-gray-500 hover:bg-gray-100"
            >
              ×
            </button>

            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-50">
              <img
                src={quickView.image}
                alt={quickView.name}
                sizes="200"
                className="size-full object-contain p-4"
              />
            </div>

            <h3
              id="quick-view-title"
              className="text-lg font-semibold text-gray-900"
            >
              {quickView.name}
            </h3>

            <p className="mt-2 text-xl font-bold text-emerald-700">
              ৳{quickView.price.toLocaleString("en-US")}
            </p>

            <button
              type="button"
              onClick={() => {
                addToCart(quickView);
                setQuickView(null);
              }}
              className="mt-4 w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
