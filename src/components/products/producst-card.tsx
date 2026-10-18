
"use client";

import Image from "next/image";
import { Eye, Layers2, Star, ArrowUpRight } from "lucide-react";

import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onSameItems: (product: Product) => void;
}

export function ProductCard({
  product,
  onQuickView,
  onSameItems,
}: ProductCardProps) {
  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-fill transition-transform duration-500 group-hover:scale-105 sm:"
        />

        {discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
            -{discount}%
          </span>
        )}

        <span className="absolute right-2 top-2 z-10 rounded-md bg-white/90 px-2 py-1 text-[10px] font-medium text-gray-600 shadow-sm sm:right-3 sm:top-3 sm:text-xs">
          {product.category}
        </span>

        {/* Actions appear on hover or keyboard focus */}
        <div className="absolute inset-x-2 bottom-2 z-20 flex translate-y-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:inset-x-3 sm:bottom-3">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex min-h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-2 py-2 text-xs font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:text-sm"
          >
            <Eye className="size-4" />
            See Details
            <ArrowUpRight className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onSameItems(product)}
            className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white/95 px-2 py-2 text-xs font-semibold text-gray-800 shadow-lg transition hover:border-emerald-500 hover:bg-emerald-50 sm:text-sm"
          >
            <Layers2 className="size-4" />
            See Items
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3
          title={product.name}
          className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-gray-800 transition-colors group-hover:text-emerald-800 sm:text-sm"
        >
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-700">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-gray-400 sm:text-xs">
            ({product.sold} sold)
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-bold text-emerald-800 sm:text-lg">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {discount > 0 && (
            <span className="text-[10px] text-gray-400 line-through sm:text-xs">
              ৳{product.originalPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
