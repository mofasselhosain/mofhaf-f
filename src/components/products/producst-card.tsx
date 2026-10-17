
"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star, Check } from "lucide-react";
import { Product } from "@/types/product";


type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
};

function formatPrice(price: number) {
  return "৳" + price.toLocaleString("en-US");
}

export function ProductCard({
  product,
  onAddToCart,
  onWishlist,
  onQuickView,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <article className="group min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
      <Image
     src={product.image}
     alt={product.name}
     fill
     sizes="200px"
    className="object-cover object-fill  p-2 transition-transform duration-300 group-hover:scale-105"
  />

        {discount > 0 && (
          <span className="absolute left-1.5 top-1.5 rounded bg-rose-600 px-1.5 py-0.5 text-[10px] font-bold text-white sm:text-xs">
            -{discount}%
          </span>
        )}

        {/* Action buttons */}
        <div className="absolute right-1.5 top-1.5 flex flex-col gap-1.5 sm:right-2 sm:top-2">
          <button
            type="button"
            aria-label="Toggle wishlist"
            aria-pressed={liked}
            onClick={() => {
              setLiked((previous) => !previous);
              onWishlist?.(product);
            }}
            className="flex size-7 items-center justify-center rounded-full bg-white/95 shadow transition-colors hover:bg-rose-50 sm:size-8"
          >
            <Heart
              className={`size-3.5 sm:size-4 ${
                liked ? "fill-rose-500 text-rose-500" : "text-gray-600"
              }`}
            />
          </button>

          <button
            type="button"
            aria-label="Quick view"
            onClick={() => onQuickView?.(product)}
            className="flex size-7 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow transition-colors hover:bg-emerald-50 hover:text-emerald-700 sm:size-8"
          >
            <Eye className="size-3.5 sm:size-4" />
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="p-2 sm:p-3">
        <p className="mb-1 truncate text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
          {product.category}
        </p>

        <h3
          title={product.name}
          className="line-clamp-2 min-h-2 text-xs font-medium leading-4 text-gray-800 transition-colors group-hover:text-emerald-700 sm:min-h-2 sm:text-sm sm:leading-5"
        >
          {product.name}
        </h3>

        <div className=" flex flex-wrap items-center gap-x-.5 ">
          <span className="text-sm font-bold text-gray-950 sm:text-base">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-[6px] text-gray-400 line-through sm:text-xs">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1 text-[10px] sm:text-xs">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-gray-700">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-gray-400">
            ({product.sold.toLocaleString("en-US")} sold)
          </span>
        </div>

        <p className="mt-1 truncate text-[10px] text-emerald-700 sm:text-xs">
          Free delivery
        </p>

        <button
          type="button"
          onClick={() => {
            onAddToCart?.(product);
            setAdded(true);
          }}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-2 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-800 active:scale-[0.98] sm:text-xs"
        >
          {added ? (
            <>
              <Check className="size-3.5" />
              Added
            </>
          ) : (
            <>
              <ShoppingCart className="size-3.5" />
              Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
