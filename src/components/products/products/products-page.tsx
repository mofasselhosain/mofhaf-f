
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

import type { Product } from "@/types/product";
import { products } from "@/lib/product-data";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ProductCard } from "./product-card-pro";
import { ProductSort, type SortOption } from "./product-sort";
import { ProductQuickView } from "./productQuickView";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Groceries",
];

const PAGE_SIZE = 8;

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>([]);

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState("all");

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const handleAddToCart = (
    product: Product,
    quantity: number
  ) => {
    console.log("Added to cart:", product, quantity);
    // Connect your cart API or cart context here.
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );

    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setRating(0);
    setAvailability("all");
    setSortBy("featured");
    setPage(1);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    rating > 0 ||
    search.trim().length > 0 ||
    availability !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword)
      );
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Price
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );

    // Rating
    if (rating > 0) {
      result = result.filter(
        (product) => product.rating >= rating
      );
    }

    // Availability
    if (availability === "in-stock") {
      result = result.filter(
        (product) => (product.stock ?? 0) > 0
      );
    }

    if (availability === "out-of-stock") {
      result = result.filter(
        (product) => (product.stock ?? 0) <= 0
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "popular":
        result.sort(
          (a, b) => (b.sold ?? 0) - (a.sold ?? 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    search,
    selectedCategories,
    priceRange,
    rating,
    availability,
    sortBy,
  ]);

  const totalPages = Math.ceil(
    filteredProducts.length / PAGE_SIZE
  );

  // Keep page valid when filters reduce the result count.
  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Shared filters for desktop sidebar and mobile drawer.
  const FilterContent = () => (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Filters</h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="h-8 text-primary"
        >
          <RotateCcw className="mr-1.5 size-3.5" />
          Reset
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">Categories</h4>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </section>

      <Separator />

      {/* Price */}
      <section className="space-y-4">
        <h4 className="text-sm font-semibold">Price Range</h4>

        <Slider
          value={priceRange}
          min={0}
          max={10000}
          step={100}
          onValueChange={(value) => {
            if (Array.isArray(value)) {
              setPriceRange([...value]);
              setPage(1);
            }
          }}
        />

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="rounded-md border bg-muted/30 px-2.5 py-2">
            ৳{priceRange[0].toLocaleString("en-BD")}
          </span>

          <span className="text-muted-foreground">to</span>

          <span className="rounded-md border bg-muted/30 px-2.5 py-2">
            ৳{priceRange[1].toLocaleString("en-BD")}
          </span>
        </div>
      </section>

      <Separator />

      {/* Rating */}
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">Customer Rating</h4>

        {[4, 3, 2, 1].map((value) => (
          <label
            key={value}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="radio"
              name="rating"
              checked={rating === value}
              onChange={() => {
                setRating(value);
                setPage(1);
              }}
              className="size-4 accent-primary"
            />

            <span className="text-amber-500">
              {"★".repeat(value)}
            </span>

            <span className="text-muted-foreground">& up</span>
          </label>
        ))}
      </section>

      <Separator />

      {/* Availability */}
      <section className="space-y-3">
        <h4 className="text-sm font-semibold">Availability</h4>

        {[
          { label: "All Products", value: "all" },
          { label: "In Stock", value: "in-stock" },
          { label: "Out of Stock", value: "out-of-stock" },
        ].map((item) => (
          <label
            key={item.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <input
              type="radio"
              name="availability"
              checked={availability === item.value}
              onChange={() => {
                setAvailability(item.value);
                setPage(1);
              }}
              className="size-4 accent-primary"
            />

            {item.label}
          </label>
        ))}
      </section>
    </div>
  );

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-[1800px] px-3 py-5 sm:px-5 sm:py-7 md:px-6 lg:px-8 xl:px-10 2xl:px-12">

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <span>Home</span>
          <span>/</span>
          <span className="font-medium text-foreground">Products</span>
        </div>

        {/* Heading */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Discover Products
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm">
              Find the perfect products for your everyday needs.
              Explore our latest collections and exclusive deals.
            </p>
          </div>

          <Badge
            variant="secondary"
            className="w-fit rounded-full px-3 py-1.5 text-xs sm:text-sm"
          >
            {filteredProducts.length} Products Found
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-8 2xl:grid-cols-[280px_minmax(0,1fr)]">

          {/* Desktop Sidebar */}
          <aside className="hidden h-fit rounded-xl border bg-background p-4 lg:sticky lg:top-24 lg:block xl:p-5">
            <FilterContent />
          </aside>

          {/* Products Section */}
          <section className="min-w-0 space-y-4 sm:space-y-5">

            {/* Toolbar */}
            <div className="flex flex-col gap-3 rounded-xl border bg-background p-3 sm:p-4 md:flex-row md:items-center">

              {/* Search */}
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="h-10 pl-10 text-sm sm:h-11"
                />
              </div>

              {/* Mobile and Tablet Filters */}
              <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                <SheetTrigger >
                  <Button
                    variant="outline"
                    className="h-10 w-full shrink-0 md:w-auto lg:hidden"
                  >
                    <SlidersHorizontal className="mr-2 size-4" />
                    Filters

                    {selectedCategories.length + (rating > 0 ? 1 : 0) > 0 && (
                      <Badge className="ml-2 h-5 min-w-5 justify-center rounded-full px-1">
                        {selectedCategories.length + (rating > 0 ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[85vw] max-w-[380px] overflow-y-auto p-5 sm:w-[360px]"
                >
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle>Product Filters</SheetTitle>
                  </SheetHeader>

                  <FilterContent />

                  <div className="sticky bottom-0 mt-6 border-t bg-background pt-4">
                    <Button
                      className="w-full"
                      onClick={() => setFilterOpen(false)}
                    >
                      Show {filteredProducts.length} Products
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sorting */}
              <div className="w-full shrink-0 sm:w-auto">
                <ProductSort
                  value={sortBy}
                  onChange={(value) => {
                    setSortBy(value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1 py-1">
                    {category}

                    <button
                      onClick={() => toggleCategory(category)}
                      aria-label={`Remove ${category} filter`}
                      className="ml-1 rounded-full hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}

                {rating > 0 && (
                  <Badge variant="secondary" className="gap-1 py-1">
                    {rating}+ Stars

                    <button
                      onClick={() => {
                        setRating(0);
                        setPage(1);
                      }}
                      aria-label="Remove rating filter"
                      className="ml-1 rounded-full hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}

                {search.trim() && (
                  <Badge variant="secondary" className="gap-1 py-1">
                    Search: {search}

                    <button
                      onClick={() => {
                        setSearch("");
                        setPage(1);
                      }}
                      aria-label="Remove search filter"
                      className="ml-1 rounded-full hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}

                {availability !== "all" && (
                  <Badge variant="secondary" className="gap-1 py-1">
                    {availability === "in-stock" ? "In Stock" : "Out of Stock"}

                    <button
                      onClick={() => {
                        setAvailability("all");
                        setPage(1);
                      }}
                      aria-label="Remove availability filter"
                      className="ml-1 rounded-full hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}

                {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                  <Badge variant="secondary" className="gap-1 py-1">
                    ৳{priceRange[0]} - ৳{priceRange[1]}

                    <button
                      onClick={() => {
                        setPriceRange([0, 10000]);
                        setPage(1);
                      }}
                      aria-label="Remove price filter"
                      className="ml-1 rounded-full hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="link"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 px-2 text-xs"
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Showing{" "}
                {filteredProducts.length > 0
                  ? (currentPage - 1) * PAGE_SIZE + 1
                  : 0}
                {" - "}
                {Math.min(currentPage * PAGE_SIZE, filteredProducts.length)}
                {" of "}
                {filteredProducts.length} products
              </p>

              <span className="text-xs text-muted-foreground">
                Page {currentPage} of {Math.max(totalPages, 1)}
              </span>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={handleQuickView}
                    onAddToCart={(item) => handleAddToCart(item, 1)}
                    // onSameItems={(item) => {
                    //   setSelectedCategories([item.category]);
                    //   setPage(1);
                    // }}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-background px-4 py-16 text-center sm:py-20">
                <Search className="mx-auto mb-4 size-9 text-muted-foreground sm:size-10" />

                <h3 className="text-base font-semibold sm:text-lg">
                  No products found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground sm:text-sm">
                  Try changing your filters or search keywords.
                </p>

                <Button className="mt-5" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Responsive Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
                <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
                  Showing {(currentPage - 1) * PAGE_SIZE + 1}-
                  {Math.min(currentPage * PAGE_SIZE, filteredProducts.length)}
                  {" "}of {filteredProducts.length} products
                </p>

                <div className="flex flex-wrap items-center justify-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 sm:size-9"
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  )
                    .filter((number) => {
                      return (
                        number === 1 ||
                        number === totalPages ||
                        Math.abs(number - currentPage) <= 1
                      );
                    })
                    .map((number, index, visiblePages) => (
                      <div key={number} className="flex items-center gap-1">
                        {index > 0 &&
                          number - visiblePages[index - 1] > 1 && (
                            <span className="px-1 text-xs text-muted-foreground">
                              ...
                            </span>
                          )}

                        <Button
                          size="icon"
                          className="size-8 sm:size-9"
                          variant={
                            currentPage === number ? "default" : "outline"
                          }
                          onClick={() => setPage(number)}
                          aria-label={`Go to page ${number}`}
                          aria-current={
                            currentPage === number ? "page" : undefined
                          }
                        >
                          {number}
                        </Button>
                      </div>
                    ))}

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 sm:size-9"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    aria-label="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Quick View Dialog */}
      <ProductQuickView
        product={selectedProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}
