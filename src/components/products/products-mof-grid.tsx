
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { toast } from "sonner";


// import type { IProduct } from "@/types/product";
// import { ProductCard } from "./producst-mof-card";

// const products: IProduct[] = [
//   {
//     id: "1",
//     name: "4K Mini Action Camera with Wide-Angle Lens",
//     slug: "4k-mini-action-camera",
//     image: "/products/camera.jpg",
//     price: 2490,
//     originalPrice: 3990,
//     rating: 4.8,
//     reviews: 1240,
//     badge: "Best Seller",
//     category: "Electronics",
//   },
//   {
//     id: "2",
//     name: "Foldable Mini Drone with HD Camera",
//     slug: "foldable-mini-drone",
//     image: "/products/drone.jpg",
//     price: 5490,
//     originalPrice: 7490,
//     rating: 4.6,
//     reviews: 856,
//     badge: "Popular",
//     category: "Gadgets",
//   },
//   {
//     id: "3",
//     name: "Wireless Bluetooth Earbuds with Charging Case",
//     slug: "wireless-bluetooth-earbuds",
//     image: "/products/earbuds.jpg",
//     price: 1290,
//     originalPrice: 1990,
//     rating: 4.7,
//     reviews: 2150,
//     category: "Audio",
//   },
//   {
//     id: "4",
//     name: "Portable Smart Security Camera",
//     slug: "portable-security-camera",
//     image: "/products/security-camera.jpg",
//     price: 1890,
//     originalPrice: 2590,
//     rating: 4.5,
//     reviews: 642,
//     badge: "New",
//     category: "Smart Home",
//   },
// ];

// interface ProductGridProps {
//   items?: IProduct[];
//   onAddToCart?: (product: IProduct) => void;
//   onSimilarItems?: (product: IProduct) => void;
// }

// export default function MofProductGrid({
//   items = products,
//   onAddToCart,
//   onSimilarItems,
// }: ProductGridProps) {
//   const [favorites, setFavorites] = useState<string[]>([]);

//   function toggleFavorite(product: IProduct) {
//     const isFavorite = favorites.includes(product.id);

//     setFavorites((current) =>
//       isFavorite
//         ? current.filter((id) => id !== product.id)
//         : [...current, product.id]
//     );

//     toast.success(
//       isFavorite
//         ? "Removed from favorites"
//         : "Added to favorites"
//     );
//   }

//   function addToCart(product: IProduct) {
//     if (onAddToCart) {
//       onAddToCart(product);
//       toast.success(`${product.name} added to cart`);
//       return;
//     }

//     toast.info(`${product.name} — demo cart notification`);
//   }

//   function showSimilarItems(product: IProduct) {
//     if (onSimilarItems) {
//       onSimilarItems(product);
//       return;
//     }

//     const query = product.category ?? product.name;

//     window.location.href =
//       `/products?search=${encodeURIComponent(query)}`;
//   }

//   return (
//     <section className="w-full py-8">
//       <div className="mb-6 flex items-end justify-between gap-4">
//         <div>
//           <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
//             MOFHAF COLLECTION
//           </p>

//           <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
//             Trending Products
//           </h2>

//           <p className="mt-2 text-sm text-muted-foreground">
//             Discover products you'll love.
//           </p>
//         </div>

//         <Link
//           href="/products"
//           className="shrink-0 text-sm font-semibold text-primary hover:underline"
//         >
//           View all →
//         </Link>
//       </div>

//       <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
//         {items.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             currency="৳"
//             isFavorite={favorites.includes(product.id)}
//             onToggleFavorite={toggleFavorite}
//             onAddToCart={addToCart}
//             onSimilarItems={showSimilarItems}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

