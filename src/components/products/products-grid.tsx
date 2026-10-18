
"use client";

import { useState } from "react";
import { ProductCard } from "./producst-card";
import { ProductDetailsDialog } from "./product-details-dialog";
import type { Product } from "@/types/product";
import { Layers2, ArrowRight, Star } from "lucide-react";

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
    stock: 25,
    description:
      "Enjoy your favorite music with stylish wireless headphones designed for everyday listening and entertainment.",
    features: [
      "Comfortable over-ear design",
      "Wireless listening convenience",
      "Lightweight and portable",
      "Suitable for everyday use",
    ],
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
    stock: 18,
    description:
      "A minimal everyday watch with a clean design that complements casual and formal outfits.",
    features: [
      "Minimal contemporary style",
      "Versatile everyday accessory",
      "Easy-to-style design",
    ],
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
    stock: 30,
    description:
      "Sporty sneakers designed for an active lifestyle and everyday casual wear.",
    features: [
      "Sport-inspired design",
      "Casual everyday styling",
      "Versatile footwear option",
    ],
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
    stock: 12,
    description:
      "A versatile backpack for everyday carrying, commuting, and organizing essentials.",
    features: [
      "Everyday carry design",
      "Practical storage space",
      "Versatile casual styling",
    ],
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
    stock: 22,
    description:
      "A compact speaker concept for enjoying audio at home or while traveling.",
    features: [
      "Compact portable design",
      "Suitable for everyday listening",
      "Modern audio accessory",
    ],
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
    stock: 15,
    description:
      "Contemporary sunglasses that add a polished finishing touch to everyday outfits.",
    features: [
      "Contemporary frame styling",
      "Lightweight fashion accessory",
      "Suitable for casual outfits",
    ],
  },
];

type DialogState =
  | { type: "details"; product: Product }
  | { type: "items"; product: Product }
  | null;

export default function ProductGrid() {
  const [dialog, setDialog] = useState<DialogState>(null);

  const relatedProducts =
    dialog?.type === "items"
      ? products.filter(
          (product) =>
            product.category === dialog.product.category &&
            product.id !== dialog.product.id
        )
      : [];

  const selectedProduct =
    dialog?.type === "details" ? dialog.product : null;

  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-5 lg:px-8">
      {/* Section heading */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          MOFHAF COLLECTION
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Discover Our Products
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Explore quality products selected for you.
        </p>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(item) =>
              setDialog({ type: "details", product: item })
            }
            onSameItems={(item) =>
              setDialog({ type: "items", product: item })
            }
          />
        ))}
      </div>

      {/* Professional details dialog */}
      <ProductDetailsDialog
        product={selectedProduct}
        open={dialog?.type === "details"}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
        onAddToCart={(product, quantity) => {
          // Replace with your real cart state or API.
          console.log("Add to cart:", product.id, quantity);
        }}
      />

      {/* Related-items dialog */}
      {dialog?.type === "items" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDialog(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="related-items-title"
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={() => setDialog(null)}
              aria-label="Close related items"
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              ×
            </button>

            <div className="mb-5 pr-8">
              <div className="flex items-center gap-2 text-emerald-700">
                <Layers2 className="size-5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Related Collection
                </span>
              </div>

              <h2
                id="related-items-title"
                className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl"
              >
                More {dialog.product.category} Items
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Products related to {dialog.product.name}.
              </p>
            </div>

            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {relatedProducts.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() =>
                      setDialog({ type: "details", product })
                    }
                    className="group overflow-hidden rounded-xl border border-gray-200 text-left transition hover:border-emerald-500 hover:shadow-md"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="size-full object-contain p-3 transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="p-3">
                      <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                        {product.name}
                      </p>

                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {product.rating.toFixed(1)}
                        <span>· {product.sold} sold</span>
                      </div>

                      <p className="mt-2 font-bold text-emerald-700">
                        ৳{product.price.toLocaleString("en-BD")}
                      </p>

                      <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        See Details
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 px-4 py-10 text-center">
                <Layers2 className="mx-auto size-8 text-gray-400" />
                <p className="mt-3 font-semibold text-gray-800">
                  No other items yet
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  There are no other demo products in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
