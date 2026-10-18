

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
 type IProduct = {
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
