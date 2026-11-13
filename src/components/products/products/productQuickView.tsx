
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Heart,
  ShoppingCart,
  Star,
  PackageCheck,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  RotateCcw,
  Check,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

import type { Product } from "@/types/product";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProductQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onWishlist?: (product: Product) => void;
}

export function ProductQuickView({
  product,
  open,
  onOpenChange,
  onAddToCart,
  onWishlist,
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setFavorite(false);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const stock = product.stock ?? 0;

  const discount =
    product.originalPrice > product.price &&
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const rating = Math.min(5, Math.max(0, product.rating || 0));

  const handleWishlist = () => {
    setFavorite((prev) => !prev);
    onWishlist?.(product);
  };

  const handleAddToCart = () => {
    if (stock <= 0 || quantity > stock) return;

    onAddToCart?.(product, quantity);
    onOpenChange(false);
  };

  const trustFeatures = [
    {
      icon: Truck,
      label: "Fast Delivery",
    },
    {
      icon: ShieldCheck,
      label: "Secure Payment",
    },
    {
      icon: RotateCcw,
      label: "Easy Returns",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          !fixed !left-1/2 !top-1/2
          !-translate-x-1/2 !-translate-y-1/2

          flex flex-col gap-0
          overflow-hidden border
          bg-background p-0 shadow-2xl

          w-[calc(100vw-16px)]
          h-[94dvh]
          max-w-none
          rounded-xl

          sm:w-[calc(100vw-32px)]
          sm:h-[88dvh]
          sm:max-w-[720px]
          sm:rounded-2xl

          md:w-[94vw]
          md:h-[82dvh]
          md:max-w-[920px]

          lg:w-[94vw]
          lg:h-[85dvh]
          lg:max-w-[1150px]
          lg:rounded-3xl

          xl:w-[90vw]
          xl:h-[86dvh]
          xl:max-w-[1350px]

          2xl:w-[85vw]
          2xl:h-[88dvh]
          2xl:max-w-[1500px]
        "
      >
        {/* ================= HEADER ================= */}
        <DialogHeader
          className="
            shrink-0 border-b
            px-3 py-3 pr-12 text-left

            sm:px-5 sm:py-4
            lg:px-7
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex size-9 shrink-0
                items-center justify-center
                rounded-xl bg-primary/10

                sm:size-10
              "
            >
              <Sparkles className="size-5 text-primary" />
            </div>

            <div className="min-w-0">
              <DialogTitle
                className="
                  text-sm font-bold
                  sm:text-base
                  lg:text-lg
                "
              >
                Quick Product View
              </DialogTitle>

              <DialogDescription className="text-[10px] sm:text-xs">
                Discover product details and make your purchase.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* ================= MAIN CONTENT ================= */}
        <div
          className="
            min-h-0 flex-1
            overflow-x-hidden
            overflow-y-auto
            overscroll-contain

            lg:overflow-hidden
          "
        >
          <div
            className="
              grid min-h-full
              grid-cols-1 gap-4 p-3

              sm:gap-5 sm:p-5

              md:grid-cols-[0.9fr_1.1fr]
              md:gap-5 md:p-5

              lg:h-full
              lg:min-h-0
              lg:grid-cols-[1fr_1fr]
              lg:gap-7
              lg:p-7

              xl:grid-cols-[1.05fr_0.95fr]
              xl:gap-9 xl:p-8

              2xl:grid-cols-[1.1fr_0.9fr]
              2xl:gap-10 2xl:p-10
            "
          >
            {/* ================= LEFT IMAGE SECTION ================= */}
            <div
              className="
                flex min-w-0 flex-col gap-3

                lg:min-h-0
              "
            >
              {/* Product Image */}
              <div
                className="
                  group relative w-full
                  aspect-[4/3]
                  max-h-[300px]
                  overflow-hidden
                  rounded-xl border
                  bg-muted/30

                  sm:max-h-[350px]
                  sm:rounded-2xl

                  md:aspect-auto
                  md:h-full
                  md:min-h-[350px]
                  md:max-h-none

                  lg:min-h-0
                  lg:flex-1
                  lg:rounded-2xl

                  xl:rounded-3xl
                "
              >
                {/* Discount Badge */}
                {discount > 0 && (
                  <Badge
                    className="
                      absolute left-3 top-3 z-20
                      rounded-full bg-red-500
                      px-3 py-1
                      text-[10px] font-bold text-white
                      shadow-md hover:bg-red-500

                      sm:text-xs
                    "
                  >
                    SAVE {discount}%
                  </Badge>
                )}

                {/* Wishlist Button */}
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Toggle wishlist"
                  aria-pressed={favorite}
                  className="
                    absolute right-3 top-3 z-20
                    size-9 rounded-full shadow-md

                    sm:size-10
                  "
                  onClick={handleWishlist}
                >
                  <Heart
                    className={`
                      size-4 transition-colors
                      ${
                        favorite
                          ? "fill-red-500 text-red-500"
                          : ""
                      }
                    `}
                  />
                </Button>

                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="
                    (max-width: 640px) 94vw,
                    (max-width: 1024px) 45vw,
                    (max-width: 1280px) 50vw,
                    700px
                  "
                  className="
                    object-contain
                    p-5
                    transition-transform duration-500
                    group-hover:scale-105

                    sm:p-7
                    lg:p-8
                    xl:p-10
                    2xl:p-12
                  "
                />

                {/* Bottom Image Labels */}
                <div
                  className="
                    absolute bottom-3 left-3 right-3
                    flex items-center justify-between gap-2

                    sm:bottom-4 sm:left-4 sm:right-4
                  "
                >
                  <Badge
                    variant="secondary"
                    className="
                      max-w-[65%] truncate
                      rounded-full
                      bg-background/90
                      px-3 py-1
                      text-[10px]
                      shadow-sm backdrop-blur

                      sm:text-xs
                    "
                  >
                    {product.category}
                  </Badge>

                  <Badge
                    className={`
                      shrink-0 rounded-full
                      text-[9px] text-white sm:text-xs
                      ${
                        stock > 0
                          ? "bg-green-600 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-500"
                      }
                    `}
                  >
                    {stock > 0 ? (
                      <>
                        <Check className="mr-1 size-3" />
                        Available
                      </>
                    ) : (
                      "Sold Out"
                    )}
                  </Badge>
                </div>
              </div>

              {/* Trust Features */}
              <div className="grid shrink-0 grid-cols-3 gap-2">
                {trustFeatures.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="
                        flex min-w-0 flex-col
                        items-center justify-center
                        gap-1 rounded-xl border
                        bg-card p-2 text-center

                        sm:p-3
                      "
                    >
                      <Icon className="size-4 text-primary sm:size-5" />

                      <span
                        className="
                          text-[8px] font-medium
                          text-muted-foreground

                          sm:text-[10px]
                          lg:text-xs
                        "
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= RIGHT DETAILS SECTION ================= */}
            <div
              className="
                flex min-w-0 flex-col gap-4

                md:gap-4

                lg:min-h-0
                lg:overflow-y-auto
                lg:gap-5
                lg:pr-2

                xl:gap-6
                xl:pr-3
              "
            >
              {/* Product Name and Category */}
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full text-[9px] sm:text-xs"
                  >
                    {product.category}
                  </Badge>

                  {discount > 0 && (
                    <Badge
                      variant="outline"
                      className="
                        rounded-full text-[9px]
                        text-green-600 sm:text-xs
                      "
                    >
                      Best Deal
                    </Badge>
                  )}
                </div>

                <h2
                  className="
                    break-words
                    text-lg font-bold
                    leading-tight tracking-tight

                    sm:text-2xl
                    md:text-xl
                    lg:text-2xl
                    xl:text-3xl
                    2xl:text-4xl
                  "
                >
                  {product.name}
                </h2>

                <p
                  className="
                    mt-2 text-[11px]
                    leading-5 text-muted-foreground

                    sm:text-xs sm:leading-6
                    lg:text-sm
                  "
                >
                  {product.description ||
                    "Discover excellent quality, modern design and reliable performance. A great choice for your everyday needs."}
                </p>

                {/* Rating */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`
                          size-3 sm:size-4
                          ${
                            index < Math.round(rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          }
                        `}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-bold">
                    {rating.toFixed(1)}
                  </span>

                  <span className="text-[10px] text-muted-foreground sm:text-xs">
                    {(product.sold ?? 0).toLocaleString("en-BD")} sold
                  </span>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <p className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                  Our Best Price
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span
                    className="
                      text-2xl font-extrabold
                      tracking-tight text-primary

                      sm:text-3xl
                      md:text-2xl
                      lg:text-3xl
                      xl:text-4xl
                    "
                  >
                    ৳{product.price.toLocaleString("en-BD")}
                  </span>

                  {discount > 0 && (
                    <span className="text-xs text-muted-foreground line-through sm:text-sm">
                      ৳{product.originalPrice.toLocaleString("en-BD")}
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <p className="text-[10px] font-medium text-green-600 sm:text-xs">
                    You save ৳
                    {(product.originalPrice - product.price).toLocaleString("en-BD")}
                    {" "}({discount}% discount)
                  </p>
                )}
              </div>

              <Separator />

              {/* Stock Information */}
              <div
                className="
                  flex items-center justify-between
                  gap-2 rounded-xl border
                  bg-muted/20 p-2.5

                  sm:p-3
                "
              >
                <div className="flex min-w-0 items-center gap-2">
                  <PackageCheck
                    className={`
                      size-5 shrink-0
                      ${
                        stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    `}
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold">
                      {stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                      {stock > 0
                        ? `${stock} items available`
                        : "Currently unavailable"}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={`
                    shrink-0 rounded-full
                    text-[9px] sm:text-xs
                    ${
                      stock > 0
                        ? "border-green-500/30 text-green-600"
                        : "border-red-500/30 text-red-500"
                    }
                  `}
                >
                  {stock > 0 ? "Available" : "Sold Out"}
                </Badge>
              </div>

              {/* Quantity Selector */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold sm:text-sm">
                    Select Quantity
                  </span>

                  <span className="text-[9px] text-muted-foreground sm:text-xs">
                    Maximum: {stock}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-full border bg-background">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-none sm:size-10"
                      disabled={quantity <= 1}
                      onClick={() =>
                        setQuantity((q) => Math.max(1, q - 1))
                      }
                    >
                      <Minus className="size-3.5 sm:size-4" />
                    </Button>

                    <span className="min-w-9 text-center text-xs font-bold sm:text-sm">
                      {quantity}
                    </span>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-8 rounded-none sm:size-10"
                      disabled={quantity >= stock}
                      onClick={() =>
                        setQuantity((q) => Math.min(stock, q + 1))
                      }
                    >
                      <Plus className="size-3.5 sm:size-4" />
                    </Button>
                  </div>

                  <span className="text-[10px] text-muted-foreground sm:text-xs">
                    {quantity} × ৳
                    {product.price.toLocaleString("en-BD")}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div
                className="
                  flex items-center justify-between
                  gap-2 rounded-xl
                  bg-primary/5 p-3

                  sm:p-4
                "
              >
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Amount
                  </p>

                  <p className="text-[9px] text-muted-foreground sm:text-[10px]">
                    Selected quantity
                  </p>
                </div>

                <span className="text-xl font-extrabold text-primary sm:text-2xl">
                  ৳{(product.price * quantity).toLocaleString("en-BD")}
                </span>
              </div>

              {/* Purchase Actions */}
              <div className="flex gap-2 pt-1 sm:gap-3">
                <Button
                  type="button"
                  className="
                    h-10 min-w-0 flex-1
                    gap-2 rounded-full
                    text-[11px] font-semibold

                    sm:h-12 sm:text-sm
                  "
                  disabled={stock <= 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="size-4 shrink-0" />
                  Add to Cart
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Toggle wishlist"
                  aria-pressed={favorite}
                  className="
                    size-10 shrink-0
                    rounded-full

                    sm:size-12
                  "
                  onClick={handleWishlist}
                >
                  <Heart
                    className={
                      favorite
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                </Button>
              </div>

              {/* Secure Shopping */}
              <div className="flex items-center justify-center gap-2 border-t pt-3">
                <BadgeCheck className="size-4 shrink-0 text-green-600" />

                <span className="text-center text-[9px] text-muted-foreground sm:text-xs">
                  Shop confidently with MOFHAF
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
