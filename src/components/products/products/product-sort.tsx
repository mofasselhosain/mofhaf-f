
"use client";

import { ArrowDownWideNarrow } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name"
  | "rating"
  | "popular"
  | "newest";

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function ProductSort({
  value,
  onChange,
}: ProductSortProps) {
  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      <ArrowDownWideNarrow className="size-4 shrink-0 text-muted-foreground" />

      <Select
        value={value}
        onValueChange={(value) => onChange(value as SortOption)}
      >
        <SelectTrigger className="w-full rounded-full sm:w-[190px]">
          <SelectValue placeholder="Sort Products" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="name">Name: A to Z</SelectItem>
          <SelectItem value="rating">Top Rated</SelectItem>
          <SelectItem value="popular">Best Selling</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
