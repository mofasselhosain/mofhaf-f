
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Search,
  ArrowUpDown,
  ShoppingBag,
  Star,
  PackageCheck,
  HeartOff,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type WishlistProduct = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  addedAt: number;
};

const initialWishlist: WishlistProduct[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    price: 2490,
    originalPrice: 3990,
    rating: 4.8,
    reviews: 1240,
    inStock: true,
    addedAt: 6,
  },
  {
    id: "2",
    name: "Smart Watch Series 9",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    price: 5490,
    originalPrice: 7490,
    rating: 4.6,
    reviews: 856,
    inStock: true,
    addedAt: 5,
  },
  {
    id: "3",
    name: "Classic Casual Sneakers",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    price: 1890,
    originalPrice: 2990,
    rating: 4.7,
    reviews: 640,
    inStock: false,
    addedAt: 4,
  },
  {
    id: "4",
    name: "Modern Minimalist Backpack",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
    price: 1590,
    originalPrice: 2290,
    rating: 4.5,
    reviews: 324,
    inStock: true,
    addedAt: 3,
  },
  {
    id: "5",
    name: "Professional Digital Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700",
    price: 12990,
    originalPrice: 15990,
    rating: 4.9,
    reviews: 532,
    inStock: true,
    addedAt: 2,
  },
  {
    id: "6",
    name: "Elegant Home Decoration",
    category: "Home & Living",
    image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=700",
    price: 990,
    originalPrice: 1490,
    rating: 4.4,
    reviews: 218,
    inStock: true,
    addedAt: 1,
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Living",
];

export default function MyWishlistPage() {
  const [products, setProducts] = useState(initialWishlist);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("newest");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.addedAt - a.addedAt);
    }

    return result;
  }, [products, search, category, sort]);

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed from wishlist");
  };

  const addToCart = (product: WishlistProduct) => {
    if (!product.inStock) {
      toast.error("This product is currently out of stock");
      return;
    }

    // Replace this with your real cart API/context action.
    toast.success(`${product.name} added to cart`);
  };

  const totalValue = products.reduce(
    (total, product) => total + product.price,
    0
  );

  const savings = products.reduce(
    (total, product) =>
      total + (product.originalPrice - product.price),
    0
  );

  return (
    <div className="min-h-screen space-y-6 pb-10">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">My Wishlist</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Save your favorite products and shop them whenever you want.
          </p>
        </div>

        <Button type="button" variant="outline" className="gap-2">
          <Link href="/products">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Saved Products
            </p>
            <Heart className="h-5 w-5 text-rose-500" />
          </div>
          <p className="mt-3 text-2xl font-bold">{products.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Products in your wishlist
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Wishlist Value
            </p>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 text-2xl font-bold">
            ৳{totalValue.toLocaleString("en-BD")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Total current product prices
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Potential Savings
            </p>
            <PackageCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-600">
            ৳{savings.toLocaleString("en-BD")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Compared with original prices
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your wishlist..."
              className="pl-9 pr-9"
            />
            {search && (
              <button
              type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select value={category} onValueChange={(value)=>setCategory(value ?? "All Categories")}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(value)=>setSort(value ?? "newest")}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Recently Added</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {category !== "All Categories" && (
            <Button
            type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCategory("All Categories")}
            >
              Clear filter
              <X className="ml-1 h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Wishlist Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            );

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <Badge className="absolute left-3 top-3 bg-rose-500 text-white hover:bg-rose-600">
                    -{discount}%
                  </Badge>

                  <button
                    onClick={() => removeProduct(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/95 text-rose-500 shadow transition hover:bg-rose-500 hover:text-white"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>

                  <Badge
                    variant="secondary"
                    className="absolute bottom-3 left-3"
                  >
                    {product.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="line-clamp-1 font-semibold transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      ৳{product.price.toLocaleString("en-BD")}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ৳{product.originalPrice.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    {product.inStock ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="font-medium text-emerald-600">
                          In Stock
                        </span>
                      </>
                    ) : (
                      <>
                        <PackageCheck className="h-4 w-4 text-rose-500" />
                        <span className="font-medium text-rose-500">
                          Out of Stock
                        </span>
                      </>
                    )}
                  </div>

                  <Separator />

                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <Button
                      className="w-full gap-2"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Remove from wishlist"
                      onClick={() => removeProduct(product.id)}
                      className="text-muted-foreground hover:border-rose-500 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed bg-card px-5 py-12 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/30">
            {products.length === 0 ? (
              <HeartOff className="h-9 w-9 text-rose-500" />
            ) : (
              <Search className="h-9 w-9 text-muted-foreground" />
            )}
          </div>

          <h2 className="text-xl font-bold">
            {products.length === 0
              ? "Your wishlist is empty"
              : "No products found"}
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {products.length === 0
              ? "Discover amazing products and save your favorites here for later."
              : "Try changing your search keyword or category filter."}
          </p>

          <Button
            type="button"
            className="mt-6 gap-2"
          >
            <Link href="/products">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {(search || category !== "All Categories") && (
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
              }}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
