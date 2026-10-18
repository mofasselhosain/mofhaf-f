"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  CheckCircle2,
} from "lucide-react";

import type { Product } from "@/types/product";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export function ProductDetailsDialog({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: ProductDetailsDialogProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const stock = Math.max(0, product.stock ?? 20);

  const discount =
    product.originalPrice > 0 &&
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const formatPrice = (price: number) =>
    `৳${price.toLocaleString("en-BD")}`;

  const features = product.features?.length
    ? product.features
    : [
        "Designed for everyday use",
        "Practical and modern design",
        "Part of the MOFHAF collection",
      ];

  function handleAddToCart() {
    if (stock <= 0) return;

    onAddToCart?.(product as any, quantity);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex max-h-[95dvh]
          w-[calc(100vw-1rem)] max-w-none
          flex-col gap-0 overflow-x-hidden overflow-y-auto
          rounded-xl border p-0
          sm:w-[calc(100vw-2rem)] sm:max-w-3xl sm:rounded-2xl
          md:max-w-4xl
          lg:max-w-5xl
          xl:max-w-6xl
        "
      >
        <div className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Product images, description, pricing, stock,
            quantity selection, and purchase options.
          </DialogDescription>
        </div>

        <div className="grid min-w-0 grid-cols-1 md:grid-cols-2">
          {/* Product image */}
          <div
            className="
              relative flex min-w-0 items-center justify-center
              bg-gray-50 p-4
              min-[400px]:p-6
              sm:min-h-[350px]
              md:min-h-[440px] md:p-6
              lg:min-h-[520px] lg:p-8
              xl:min-h-[560px]
            "
          >
            {discount > 0 && (
              <Badge className="absolute left-3 top-3 z-10 bg-red-500 text-white hover:bg-red-500 sm:left-5 sm:top-5">
                {discount}% OFF
              </Badge>
            )}

            <div className="relative aspect-square w-full max-w-[240px] min-[400px]:max-w-[300px] sm:max-w-sm md:max-w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 45vw, 40vw"
                className="object-contain p-2 sm:p-3"
              />
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border bg-white/95 px-2.5 py-1.5 text-[10px] font-medium text-gray-600 shadow-sm sm:bottom-5 sm:left-5 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs">
              <CheckCircle2 className="size-3.5 shrink-0 text-emerald-600 sm:size-4" />
              MOFHAF Collection
            </div>
          </div>

          {/* Product details */}
          <div className="min-w-0 p-4 sm:p-6 lg:p-8 xl:p-9">
            <Badge
              variant="secondary"
              className="max-w-full rounded-full px-3 py-1 text-emerald-800"
            >
              {product.category}
            </Badge>

            <h2 className="mt-3 break-words text-lg font-bold leading-snug text-gray-900 min-[400px]:text-xl sm:mt-4 sm:text-2xl lg:text-3xl">
              {product.name}
            </h2>

            {/* Rating and availability */}
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs sm:mt-4 sm:gap-x-3 sm:text-sm">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
              </span>

              <span className="text-gray-300">|</span>

              <span className="text-gray-500">
                {product.sold.toLocaleString()} sold
              </span>

              <span className="text-gray-300">|</span>

              <span
                className={
                  stock > 0
                    ? "font-medium text-emerald-700"
                    : "font-medium text-red-600"
                }
              >
                {stock > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>

            <Separator className="my-4 sm:my-5" />

            {/* Pricing */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-bold text-emerald-800 sm:text-3xl">
                {formatPrice(product.price)}
              </span>

              {discount > 0 && (
                <span className="text-sm text-gray-400 line-through sm:text-base">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {discount > 0 && (
              <p className="mt-1.5 text-xs font-medium text-red-600 sm:mt-2 sm:text-sm">
                Save{" "}
                {formatPrice(
                  product.originalPrice - product.price
                )}{" "}
                ({discount}% off)
              </p>
            )}

            {/* Description */}
            <div className="mt-5 sm:mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Product description
              </h3>

              <p className="mt-2 break-words text-sm leading-6 text-gray-600">
                {product.description ||
                  `Discover the ${product.name} from our ${product.category} collection. Designed for everyday use with practical functionality and a modern style.`}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900">
                Product highlights
              </h3>

              <ul className="mt-3 space-y-2">
                {features.map((feature, index) => (
                  <li
                    key={`${feature}-${index}`}
                    className="flex items-start gap-2 text-sm leading-5 text-gray-600"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span className="min-w-0 break-words">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-5" />

            {/* Service benefits */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl bg-gray-50 p-2 text-center sm:gap-2 sm:p-3">
                <Truck className="size-5 shrink-0 text-emerald-700" />
                <span className="text-[10px] leading-4 text-gray-600 sm:text-xs">
                  Delivery options
                </span>
              </div>

              <div className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl bg-gray-50 p-2 text-center sm:gap-2 sm:p-3">
                <ShieldCheck className="size-5 shrink-0 text-emerald-700" />
                <span className="text-[10px] leading-4 text-gray-600 sm:text-xs">
                  Secure checkout
                </span>
              </div>

              <div className="flex min-w-0 flex-col items-center gap-1.5 rounded-xl bg-gray-50 p-2 text-center sm:gap-2 sm:p-3">
                <RotateCcw className="size-5 shrink-0 text-emerald-700" />
                <span className="text-[10px] leading-4 text-gray-600 sm:text-xs">
                  Return policy
                </span>
              </div>
            </div>

            <Separator className="my-5" />

            {/* Quantity selector */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-gray-800">
                Quantity
              </span>

              <div className="flex shrink-0 items-center rounded-lg border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.max(1, current - 1)
                    )
                  }
                  className="size-9 rounded-r-none sm:size-10"
                >
                  <Minus className="size-4" />
                </Button>

                <span
                  aria-live="polite"
                  className="min-w-10 text-center text-sm font-semibold"
                >
                  {quantity}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Increase quantity"
                  disabled={quantity >= stock}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(stock, current + 1)
                    )
                  }
                  className="size-9 rounded-l-none sm:size-10"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {/* Subtotal */}
            <p className="mt-3 text-xs text-gray-500 sm:text-sm">
              Subtotal:{" "}
              <span className="font-semibold text-gray-900">
                {formatPrice(product.price * quantity)}
              </span>
            </p>

            {/* Action buttons */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 sm:gap-3">
              <Button
                type="button"
                disabled={stock <= 0}
                onClick={handleAddToCart}
                className="h-11 w-full bg-emerald-700 text-sm font-semibold hover:bg-emerald-800"
              >
                <ShoppingBag className="mr-2 size-4 shrink-0" />
                Add to Cart
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={stock <= 0}
                onClick={handleAddToCart}
                className="h-11 w-full border-emerald-700 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                Buy Now
              </Button>
            </div>

            <p className="mt-3 text-center text-[10px] leading-5 text-gray-400 sm:text-[11px]">
              Delivery charges and return eligibility depend on
              your order and location.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}