
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   ArrowUpRight,
//   Heart,
//   Search,
//   ShoppingCart,
//   Star,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { IProduct } from "@/types/product";



// interface ProductCardProps {
//   product: IProduct;
//   onSimilarItems?: (product: IProduct) => void;
//   onAddToCart?: (product: IProduct) => void;
//   onToggleFavorite?: (product: IProduct) => void;
//   isFavorite?: boolean;
//   currency?: string;
// }

// export function ProductCard({
//   product,
//   onSimilarItems,
//   onAddToCart,
//   onToggleFavorite,
//   isFavorite = false,
//   currency = "৳",
// }: ProductCardProps) {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const discount =
//     product.originalPrice && product.originalPrice > product.price
//       ? Math.round(
//           ((product.originalPrice - product.price) /
//             product.originalPrice) *
//             100,
//         )
//       : 0;

//   const price = (amount: number) =>
//     `${currency}${amount.toLocaleString("en-US")}`;

//   return (
//     <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/[0.07]">
//       {/* Product image */}
//       <div className="relative aspect-[4/4.3] overflow-hidden bg-muted/30">
//         <Link
//           href={`/products/${product.slug}`}
//           aria-label={`View ${product.name}`}
//           className="absolute inset-0"
//         >
//           <Image
//             src={product.image}
//             alt={product.name}
//             fill
//             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             className={`object-contain p-3 transition-all duration-500 ease-out group-hover:scale-105 ${
//               imageLoaded ? "opacity-100" : "opacity-0"
//             }`}
//             onLoad={() => setImageLoaded(true)}
//           />

//           {!imageLoaded && (
//             <div className="absolute inset-0 animate-pulse bg-muted" />
//           )}
//         </Link>

//         {/* Product badges */}
//         <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
//           {discount > 0 && (
//             <Badge className="rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-rose-600">
//               -{discount}%
//             </Badge>
//           )}

//           {product.badge && (
//             <Badge
//               variant="secondary"
//               className="rounded-md border bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur"
//             >
//               {product.badge}
//             </Badge>
//           )}
//         </div>

//         {/* Favorite button */}
//         <Button
//           type="button"
//           variant="secondary"
//           size="icon"
//           aria-label={
//             isFavorite ? "Remove from favorites" : "Add to favorites"
//           }
//           aria-pressed={isFavorite}
//           onClick={() => onToggleFavorite?.(product)}
//           className={`absolute right-3 top-3 z-20 size-9 rounded-full bg-background/90 shadow-sm backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-background ${
//             isFavorite
//               ? "text-rose-600 opacity-100"
//               : "text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
//           }`}
//         >
//           <Heart
//             className={`size-4 ${isFavorite ? "fill-current" : ""}`}
//           />
//         </Button>

//         {/* Hover action overlay */}
//         <div className="absolute inset-x-0 bottom-0 z-10 translate-y-0 bg-gradient-to-t from-black/35 via-transparent to-transparent px-3 pb-3 pt-12 sm:translate-y-3 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
//           <div className="flex flex-col gap-2 sm:flex-row">
//             <Button
              
//               size="sm"
//               className="h-9 flex-1 rounded-lg bg-primary text-xs font-semibold shadow-md"
//             >
//               <Link href={`/products/${product.slug}`}>
//                 <ArrowUpRight className="mr-1.5 size-4" />
//                 See Details
//               </Link>
//             </Button>

//             <Button
//               type="button"
//               variant="secondary"
//               size="sm"
//               onClick={() => onSimilarItems?.(product)}
//               className="h-9 flex-1 rounded-lg border border-white/30 bg-background/95 text-xs font-semibold shadow-md hover:bg-background"
//             >
//               <Search className="mr-1.5 size-3.5" />
//               Similar Items
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Product information */}
//       <div className="flex flex-1 flex-col p-3.5 sm:p-4">
//         {product.category && (
//           <p className="mb-1.5 truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
//             {product.category}
//           </p>
//         )}

//         <Link
//           href={`/products/${product.slug}`}
//           className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground transition-colors hover:text-primary sm:text-[15px]"
//         >
//           {product.name}
//         </Link>

//         {/* Rating */}
//         <div className="mt-2 flex items-center gap-1.5">
//           <div
//             className="flex items-center gap-0.5"
//             aria-label={`Rated ${product.rating ?? 0} out of 5`}
//           >
//             {Array.from({ length: 5 }).map((_, index) => (
//               <Star
//                 key={index}
//                 className={`size-3.5 ${
//                   index < Math.round(product.rating ?? 0)
//                     ? "fill-amber-400 text-amber-400"
//                     : "text-muted-foreground/30"
//                 }`}
//               />
//             ))}
//           </div>

//           <span className="text-xs font-medium text-muted-foreground">
//             {(product.rating ?? 0).toFixed(1)}
//           </span>

//           {product.reviews !== undefined && (
//             <span className="truncate text-xs text-muted-foreground">
//               ({product.reviews.toLocaleString("en-US")})
//             </span>
//           )}
//         </div>

//         {/* Price */}
//         <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
//           <span className="text-lg font-bold tracking-tight text-foreground">
//             {price(product.price)}
//           </span>

//           {discount > 0 && product.originalPrice && (
//             <span className="text-xs text-muted-foreground line-through">
//               {price(product.originalPrice)}
//             </span>
//           )}
//         </div>

//         {/* Add to cart */}
//         <Button
//           type="button"
//           variant="outline"
//           onClick={() => onAddToCart?.(product)}
//           className="mt-4 h-10 w-full rounded-xl border-primary/20 text-sm font-semibold transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
//         >
//           <ShoppingCart className="mr-2 size-4" />
//           Add to Cart
//         </Button>
//       </div>
//     </article>
//   );
// }
