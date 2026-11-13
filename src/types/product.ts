

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  sold: number;
  category: string;
  description?: string;
  features?: string[];
  stock?: number;
}

 export type IProduct = {
 id: string;
  name: string;
  slug?: string;
  image: string;
  price: number;
  originalPrice: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  sold?:number;
  category?: string;
   
  
};

export interface ProductFilters {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  availability: "all" | "in-stock" | "out-of-stock";
  minDiscount: number;
  sortBy:
    | "featured"
    | "price-low"
    | "price-high"
    | "rating"
    | "newest"
    | "best-selling";
}
