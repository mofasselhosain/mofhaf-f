
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    name: "Elegant Summer Dress",
    price: 1290,
    oldPrice: 1890,
    rating: 4.8,
    sold: "120+",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Premium Casual Outfit",
    price: 1590,
    oldPrice: 2190,
    rating: 4.9,
    sold: "250+",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Winter Comfort Jacket",
    price: 2490,
    oldPrice: 3290,
    rating: 4.7,
    sold: "180+",
    image:
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&auto=format&fit=crop&q=80",
  },
];

const categories = [
  {
    name: "Women's Clothing",
    count: "Explore collection",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=80",
    href: "/categories/womens-clothing",
  },
  {
    name: "Men's Clothing",
    count: "Modern essentials",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=500&auto=format&fit=crop&q=80",
    href: "/categories/mens-clothing",
  },
  {
    name: "Toys & Games",
    count: "Fun for everyone",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=80",
    href: "/categories/toys-games",
  },
  {
    name: "Beauty & Health",
    count: "Everyday care",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=80",
    href: "/categories/beauty-health",
  },
  {
    name: "Furniture",
    count: "Make home beautiful",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80",
    href: "/categories/furniture",
  },
  {
    name: "Shoes",
    count: "Step into style",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80",
    href: "/categories/shoes",
  },
];

export default function MofhafCategorySection() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Discover MOFHAF
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              Shop by category
            </h2>
          </div>

          <Button  variant="outline" className="rounded-full">
            <Link href="/categories">
              View all <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Main layout */}
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left promotional panel */}
          <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-[#e8f0ed] p-6 sm:p-8">
            <div className="relative z-10 max-w-xs">
              <p className="text-3xl font-black tracking-tight text-neutral-950">
                MOFHAF
              </p>
              <p className="mt-2 text-sm text-neutral-600">
                Your style. Your choice.
              </p>

              <h3 className="mt-7 text-3xl font-semibold leading-tight text-neutral-950 sm:text-4xl">
                Discover your next favorite.
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Explore everyday essentials and timeless styles, all in one
                place.
              </p>

              <Button
              
                className="mt-5 rounded-full bg-neutral-950 px-6 text-white hover:bg-neutral-800"
              >
                <Link href="/shop">
                  Shop now <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            {/* Hero image */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[65%]">
              <Image
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&auto=format&fit=crop&q=85"
                alt="MOFHAF fashion collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#e8f0ed]/90 via-transparent to-[#e8f0ed]" />
            </div>

            {/* Featured products */}
            <div className="relative z-10 mt-auto grid grid-cols-3 gap-3 pt-64 sm:gap-4">
              {products.map((product) => (
                <Link
                  href="/shop"
                  key={product.name}
                  className="group min-w-0 overflow-hidden rounded-xl bg-white p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-3"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 30vw, 200px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <p className="mt-2 truncate text-xs font-semibold text-neutral-900 sm:text-sm">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm font-bold text-neutral-950">
                    ৳{product.price.toLocaleString("en-BD")}
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500 sm:text-xs">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    {product.rating} · {product.sold} sold
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Right category cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {categories.map((category, index) => (
              <Link
                href={category.href}
                key={category.name}
                className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl bg-neutral-100 p-4 sm:min-h-[270px] sm:p-5"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 45vw, 300px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="relative z-10">
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                    0{index + 1}
                  </span>

                  <h3 className="text-base font-semibold text-white sm:text-xl">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/80">
                    {category.count}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white">
                    Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
