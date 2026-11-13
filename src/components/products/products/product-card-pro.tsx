
// // // "use client";

// // // import Image from "next/image";
// // // import { useState } from "react";
// // // import {
// // //   Heart,
// // //   ShoppingCart,
// // //   Star,
// // //   ArrowUpRight,
// // // } from "lucide-react";

// // // import type { Product } from "@/types/product";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Card } from "@/components/ui/card";

// // // interface ProductCardProps {
// // //   product: Product;
// // //   onAddToCart?: (product: Product) => void;
// // // }

// // // export function ProductCard({
// // //   product,
// // //   onAddToCart,
// // // }: ProductCardProps) {
// // //   const [isFavorite, setIsFavorite] = useState(false);

// // //   const discount = product.originalPrice > 0
// // //     ? Math.round(
// // //         ((product.originalPrice - product.price) /
// // //           product.originalPrice) *
// // //           100
// // //       )
// // //     : 0;

// // //   return (
// // //     <Card className="group  overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
// // //       <div className="relative mt-0 aspect-square overflow-hidden bg-muted/40">

// // //   <Image
// // //     src={product.image}
// // //     alt={product.name}
// // //     fill
// // //     priority={false}
// // //     sizes="
// // //       (max-width: 640px) 50vw,
// // //       (max-width: 1024px) 33vw,
// // //       (max-width: 1280px) 25vw,
// // //       20vw
// // //     "
// // //     className=" object-contain object-fill    transition-transform rounded-2xl mt-0 duration-500 group-hover:scale-110"
// // //   />


// // //         {discount > 0 && (
// // //           <Badge className="absolute left-3 top-1 bg-red-500 text-white">
// // //             -{discount}%
// // //           </Badge>
// // //         )}

// // //         <Button
// // //           size="icon"
// // //           variant="secondary"
// // //           className="absolute right-3 top-1 rounded-full shadow-sm"
// // //           onClick={() => setIsFavorite(!isFavorite)}
// // //         >
// // //           <Heart
// // //             className={`h-4 w-4 ${
// // //               isFavorite
// // //                 ? "fill-red-500 text-red-500"
// // //                 : ""
// // //             }`}
// // //           />
// // //         </Button>

// // //         <div className="absolute inset-x-0 bottom-0 translate-y-full bg-background/95 p-3 transition-transform duration-300 group-hover:translate-y-0">
// // //           <Button
// // //             className="w-full"
// // //             size="sm"
// // //             onClick={() => onAddToCart?.(product)}
// // //             disabled={!product.stock}
// // //           >
// // //             <ShoppingCart className="mr-2 h-4 w-4" />
// // //             Add to Cart
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       <div className="space-y-1 p-1 sm:p-1">
// // //         <p className="text-xs font-medium text-muted-foreground">
// // //           {product.category}
// // //         </p>

// // //         <h3 className="line-clamp-2 min-h-10 text-sm font-semibold transition-colors group-hover:text-primary">
// // //           {product.name}
// // //         </h3>

// // //         <div className="flex items-center gap-1">
// // //           <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
// // //           <span className="text-xs font-semibold">
// // //             {product.rating}
// // //           </span>
// // //           <span className="text-xs text-muted-foreground">
// // //             ({product.sold.toLocaleString()} sold)
// // //           </span>
// // //         </div>

// // //         <div className="flex flex-wrap items-center gap-2">
// // //           <span className="text-base font-bold text-primary">
// // //             ৳{product.price.toLocaleString()}
// // //           </span>

// // //           {product.originalPrice > product.price && (
// // //             <span className="text-xs text-muted-foreground line-through">
// // //               ৳{product.originalPrice.toLocaleString()}
// // //             </span>
// // //           )}
// // //         </div>

// // //         <div className="flex items-center justify-between">
// // //           <span className={`text-xs ${
// // //             product.stock
// // //               ? "text-green-600"
// // //               : "text-red-500"
// // //           }`}>
// // //             {product.stock ? "In Stock" : "Out of Stock"}
// // //           </span>

// // //           <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
// // //         </div>
// // //       </div>
// // //     </Card>
// // //   );
// // // }

// // "use client";

// // import Image from "next/image";
// // import { useState } from "react";
// // import {
// //   Eye,
// //   Layers2,
// //   Heart,
// //   ShoppingCart,
// //   Star,
// //   ArrowUpRight,
// // } from "lucide-react";

// // import type { Product } from "@/types/product";

// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Card } from "@/components/ui/card";

// // interface ProductCardProps {
// //   product: Product;
// //   onQuickView?: (product: Product) => void;
// //   onSameItems?: (product: Product) => void;
// //   onAddToCart?: (product: Product) => void;
// // }

// // export function ProductCard({
// //   product,
// //   onQuickView,
// //   onSameItems,
// //   onAddToCart,
// // }: ProductCardProps) {
// //   const [isFavorite, setIsFavorite] = useState(false);

// //   const discount =
// //     product.originalPrice > product.price &&
// //     product.originalPrice > 0
// //       ? Math.round(
// //           ((product.originalPrice - product.price) /
// //             product.originalPrice) *
// //             100
// //         )
// //       : 0;

// //   return (
// //     <Card className="group relative min-w-0 overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

// //       {/* Product Image */}
// //       <div className="relative aspect-square overflow-hidden bg-muted/40">

// //         <Image
// //           src={product.image}
// //           alt={product.name}
// //           fill
// //           priority={false}
// //           sizes="
// //             (max-width: 640px) 50vw,
// //             (max-width: 1024px) 33vw,
// //             (max-width: 1280px) 25vw,
// //             20vw
// //           "
// //           className="object-contain p-3 transition-transform duration-500 group-hover:scale-110 sm:p-4"
// //         />

// //         {/* Discount */}
// //         {discount > 0 && (
// //           <Badge className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-2 text-white hover:bg-red-500 sm:left-3 sm:top-3">
// //             -{discount}%
// //           </Badge>
// //         )}

// //         {/* Category */}
// //         <Badge
// //           variant="secondary"
// //           className="absolute right-2 top-2 z-10 max-w-[55%] truncate text-[10px] sm:right-3 sm:top-3 sm:text-xs"
// //         >
// //           {product.category}
// //         </Badge>

// //         {/* Favorite */}
// //         <Button
// //           type="button"
// //           size="icon"
// //           variant="secondary"
// //           aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
// //           aria-pressed={isFavorite}
// //           className="absolute right-2 top-10 z-20 size-8 rounded-full shadow-sm sm:right-3 sm:top-12 sm:size-9"
// //           onClick={() => setIsFavorite((prev) => !prev)}
// //         >
// //           <Heart
// //             className={`size-4 transition-colors ${
// //               isFavorite
// //                 ? "fill-red-500 text-red-500"
// //                 : "text-muted-foreground"
// //             }`}
// //           />
// //         </Button>

// //         {/* Hover Actions */}
// //         <div className="absolute inset-x-2 bottom-2 z-20 flex translate-y-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:inset-x-3 sm:bottom-3">

// //           {onQuickView && (
// //             <Button
// //               type="button"
// //               size="sm"
// //               className="w-full gap-2 text-xs sm:text-sm"
// //               onClick={() => onQuickView(product)}
// //             >
// //               <Eye className="size-4" />
// //               See Details
// //               <ArrowUpRight className="size-3.5" />
// //             </Button>
// //           )}

// //           {onSameItems && (
// //             <Button
// //               type="button"
// //               size="sm"
// //               variant="secondary"
// //               className="w-full gap-2 text-xs sm:text-sm"
// //               onClick={() => onSameItems(product)}
// //             >
// //               <Layers2 className="size-4" />
// //               See Items
// //             </Button>
// //           )}

// //           {onAddToCart && (
// //             <Button
// //               type="button"
// //               size="sm"
// //               variant="outline"
// //               className="w-full gap-2 bg-background/95 text-xs sm:text-sm"
// //               onClick={() => onAddToCart(product)}
// //               disabled={!product.stock}
// //             >
// //               <ShoppingCart className="size-4" />
// //               Add to Cart
// //             </Button>
// //           )}
// //         </div>
// //       </div>

// //       {/* Product Information */}
// //       <div className="space-y-2 p-3 sm:p-4">

// //         {/* Product Name */}
// //         <h3
// //           title={product.name}
// //           className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-foreground transition-colors group-hover:text-primary sm:text-sm"
// //         >
// //           {product.name}
// //         </h3>

// //         {/* Rating */}
// //         <div className="flex min-w-0 items-center gap-1.5">
// //           <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />

// //           <span className="text-xs font-semibold text-foreground">
// //             {product.rating.toFixed(1)}
// //           </span>

// //           <span className="truncate text-[10px] text-muted-foreground sm:text-xs">
// //             ({product.sold.toLocaleString("en-BD")} sold)
// //           </span>
// //         </div>

// //         {/* Price */}
// //         <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
// //           <span className="text-sm font-bold text-primary sm:text-lg">
// //             ৳{product.price.toLocaleString("en-BD")}
// //           </span>

// //           {discount > 0 && (
// //             <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
// //               ৳{product.originalPrice.toLocaleString("en-BD")}
// //             </span>
// //           )}
// //         </div>

// //         {/* Stock & Arrow */}
// //         <div className="flex items-center justify-between border-t pt-2">
// //           <span
// //             className={`text-[10px] font-medium sm:text-xs ${
// //               product.stock
// //                 ? "text-green-600"
// //                 : "text-red-500"
// //             }`}
// //           >
// //             {product.stock ? "In Stock" : "Out of Stock"}
// //           </span>

// //           <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // }

// // "use client";

// // import Image from "next/image";
// // import { useState } from "react";
// // import {
// //   Heart,
// //   ShoppingCart,
// //   Star,
// //   Eye,
// //   ArrowUpRight,
// //   PackageCheck,
// // } from "lucide-react";

// // import type { Product } from "@/types/product";

// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Card } from "@/components/ui/card";

// // interface ProductCardProps {
// //   product: Product;
// //   onQuickView?: (product: Product) => void;
// //   onAddToCart?: (product: Product) => void;
// //   onWishlist?: (product: Product) => void;
// // }

// // export function ProductCard({
// //   product,
// //   onQuickView,
// //   onAddToCart,
// //   onWishlist,
// // }: ProductCardProps) {
// //   const [isFavorite, setIsFavorite] = useState(false);

// //   const discount =
// //     product.originalPrice > product.price
// //       ? Math.round(
// //           ((product.originalPrice - product.price) /
// //             product.originalPrice) *
// //             100
// //         )
// //       : 0;

// //   return (
// //     <Card className="group relative min-w-0 overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

// //       {/* Image Container */}
// //       <div className="relative aspect-square overflow-hidden bg-muted/30">

// //         <Image
// //           src={product.image}
// //           alt={product.name}
// //           fill
// //           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
// //           className="object-contain p-3 transition-transform duration-500 group-hover:scale-110 sm:p-4"
// //         />

// //         {/* Discount Badge */}
// //         {discount > 0 && (
// //           <Badge className="absolute left-2 top-2 z-10 rounded-md bg-red-500 text-white hover:bg-red-500">
// //             -{discount}%
// //           </Badge>
// //         )}

// //         {/* Product Badge
// //         {product.badge && (
// //           <Badge
// //             variant="secondary"
// //             className="absolute bottom-2 left-2 z-10"
// //           >
// //             {product.badge}
// //           </Badge>
// //         )} */}

// //         {/* Wishlist */}
// //         <Button
// //           type="button"
// //           size="icon"
// //           variant="secondary"
// //           aria-label={
// //             isFavorite ? "Remove from wishlist" : "Add to wishlist"
// //           }
// //           aria-pressed={isFavorite}
// //           className="absolute right-2 top-2 z-20 size-8 rounded-full shadow-md"
// //           onClick={() => {
// //             setIsFavorite(!isFavorite);
// //             onWishlist?.(product);
// //           }}
// //         >
// //           <Heart
// //             className={`size-4 ${
// //               isFavorite
// //                 ? "fill-red-500 text-red-500"
// //                 : ""
// //             }`}
// //           />
// //         </Button>

// //         {/* Desktop Hover Actions */}
// //         <div className="absolute inset-x-2 bottom-2 z-20 hidden translate-y-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">

// //           <Button
// //             type="button"
// //             size="sm"
// //             className="w-full gap-2"
// //             onClick={() => onQuickView?.(product)}
// //           >
// //             <Eye className="size-4" />
// //             Quick View
// //           </Button>

// //           <Button
// //             type="button"
// //             size="sm"
// //             variant="secondary"
// //             className="w-full gap-2"
// //             onClick={() => onAddToCart?.(product)}
// //             disabled={(product.stock ?? 0) <= 0 }
// //           >
// //             <ShoppingCart className="size-4" />
// //             Add to Cart
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Product Information */}
// //       <div className="space-y-2 p-2.5 sm:p-4">

// //         {/* Category */}
// //         <p className="truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
// //           {product.category}
// //         </p>

// //         {/* Name */}
// //         <h3
// //           title={product.name}
// //           className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 transition-colors group-hover:text-primary sm:text-sm"
// //         >
// //           {product.name}
// //         </h3>

// //         {/* Rating */}
// //         <div className="flex items-center gap-1">
// //           <Star className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />

// //           <span className="text-xs font-semibold">
// //             {product.rating.toFixed(1)}
// //           </span>

// //           {/* <span className="truncate text-[10px] text-muted-foreground sm:text-xs">
// //             ({product.reviews.toLocaleString()} reviews)
// //           </span> */}
// //         </div>

// //         {/* Price */}
// //         <div className="flex flex-wrap items-baseline gap-2">

// //           <span className="text-sm font-bold text-primary sm:text-lg">
// //             ৳{product.price.toLocaleString("en-BD")}
// //           </span>

// //           {discount > 0 && (
// //             <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
// //               ৳{product.originalPrice.toLocaleString("en-BD")}
// //             </span>
// //           )}
// //         </div>

// //         {/* Stock */}
// //         <div className="flex items-center justify-between border-t pt-2">

// //           <span
// //             className={`flex items-center gap-1 text-[10px] font-medium sm:text-xs ${
// //               (product.stock ?? 0) > 0
// //                 ? "text-green-600"
// //                 : "text-red-500"
// //             }`}
// //           >
// //             <PackageCheck className="size-3.5" />
// //             {(product.stock ?? 0) > 0 ? "In Stock" : "Out of Stock"}
// //           </span>

// //           <span className="text-[10px] text-muted-foreground">
// //             {product.sold.toLocaleString()} sold
// //           </span>
// //         </div>

// //         {/* Mobile Actions */}
// //         <div className="flex gap-2 sm:hidden">

// //           <Button
// //             size="sm"
// //             variant="outline"
// //             className="min-w-0 flex-1 gap-1 text-xs"
// //             onClick={() => onQuickView?.(product)}
// //           >
// //             <Eye className="size-3.5" />
// //             Details
// //           </Button>

// //           <Button
// //             size="sm"
// //             className="min-w-0 flex-1 gap-1 text-xs"
// //             onClick={() => onAddToCart?.(product)}
// //             disabled={(product.stock ?? 0) <= 0}
// //           >
// //             <ShoppingCart className="size-3.5" />
// //             Cart
// //           </Button>
// //         </div>

// //         <ArrowUpRight className="absolute right-3 top-[52%] hidden size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
// //       </div>
// //     </Card>
// //   );
// // }


// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import {
//   Heart,
//   ShoppingCart,
//   Star,
//   Eye,
//   ArrowUpRight,
//   PackageCheck,
// } from "lucide-react";

// import type { Product } from "@/types/product";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";

// interface ProductCardProps {
//   product: Product;
//   onQuickView?: (product: Product) => void;
//   onAddToCart?: (product: Product) => void;
//   onWishlist?: (product: Product) => void;
// }

// export function ProductCard({
//   product,
//   onQuickView,
//   onAddToCart,
//   onWishlist,
// }: ProductCardProps) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   const stock = product.stock ?? 0;

//   const discount =
//     product.originalPrice > product.price
//       ? Math.round(
//           ((product.originalPrice - product.price) /
//             product.originalPrice) *
//             100
//         )
//       : 0;

//   return (
//     <Card className="group relative min-w-0 overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

//       {/* Product Image */}
//       <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-muted/30 p-4 sm:p-5">

//         {/* Rounded Full Image */}
//         <div className="relative size-[75%] overflow-hidden rounded-full bg-background shadow-sm ring-1 ring-border/50">
//           <Image
//             src={product.image}
//             alt={product.name}
//             fill
//             sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 18vw"
//             className="rounded-full object-contain p-3 transition-transform duration-500 group-hover:scale-110 sm:p-5"
//           />
//         </div>

//         {/* Discount */}
//         {discount > 0 && (
//           <Badge className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 text-white hover:bg-red-500">
//             -{discount}%
//           </Badge>
//         )}

//         {/* Wishlist */}
//         <Button
//           type="button"
//           size="icon"
//           variant="secondary"
//           aria-label={isFavorite ? "Remove wishlist" : "Add wishlist"}
//           aria-pressed={isFavorite}
//           className="absolute right-2 top-2 z-20 size-8 rounded-full shadow-md"
//           onClick={() => {
//             setIsFavorite((prev) => !prev);
//             onWishlist?.(product);
//           }}
//         >
//           <Heart
//             className={`size-4 ${
//               isFavorite ? "fill-red-500 text-red-500" : ""
//             }`}
//           />
//         </Button>

//         {/* Desktop Actions */}
//         <div className="absolute inset-x-3 bottom-3 z-20 hidden translate-y-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
//           <Button
//             size="sm"
//             className="w-full gap-2 rounded-full"
//             onClick={() => onQuickView?.(product)}
//           >
//             <Eye className="size-4" />
//             View Details
//           </Button>

//           <Button
//             size="sm"
//             variant="secondary"
//             className="w-full gap-2 rounded-full"
//             onClick={() => onAddToCart?.(product)}
//             disabled={stock <= 0}
//           >
//             <ShoppingCart className="size-4" />
//             Add to Cart
//           </Button>
//         </div>
//       </div>

//       {/* Product Information */}
//       <div className="space-y-2 p-3 sm:p-4">

//         <p className="truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
//           {product.category}
//         </p>

//         <h3
//           title={product.name}
//           className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 transition-colors group-hover:text-primary sm:text-sm"
//         >
//           {product.name}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1">
//           <Star className="size-3.5 fill-amber-400 text-amber-400" />
//           <span className="text-xs font-semibold">
//             {product.rating.toFixed(1)}
//           </span>
//         </div>

//         {/* Price */}
//         <div className="flex flex-wrap items-baseline gap-2">
//           <span className="text-sm font-bold text-primary sm:text-lg">
//             ৳{product.price.toLocaleString("en-BD")}
//           </span>

//           {discount > 0 && (
//             <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
//               ৳{product.originalPrice.toLocaleString("en-BD")}
//             </span>
//           )}
//         </div>

//         {/* Stock */}
//         <div className="flex items-center justify-between border-t pt-2">
//           <span
//             className={`flex items-center gap-1 text-[10px] font-medium sm:text-xs ${
//               stock > 0 ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             <PackageCheck className="size-3.5" />
//             {stock > 0 ? "In Stock" : "Out of Stock"}
//           </span>

//           <span className="text-[10px] text-muted-foreground">
//             {product.sold.toLocaleString()} sold
//           </span>
//         </div>

//         {/* Mobile Actions */}
//         <div className="flex gap-2 sm:hidden">
//           <Button
//             size="sm"
//             variant="outline"
//             className="min-w-0 flex-1 gap-1 rounded-full text-xs"
//             onClick={() => onQuickView?.(product)}
//           >
//             <Eye className="size-3.5" />
//             Details
//           </Button>

//           <Button
//             size="sm"
//             className="min-w-0 flex-1 gap-1 rounded-full text-xs"
//             onClick={() => onAddToCart?.(product)}
//             disabled={stock <= 0}
//           >
//             <ShoppingCart className="size-3.5" />
//             Cart
//           </Button>
//         </div>
//       </div>

//       <ArrowUpRight className="absolute right-3 top-[52%] hidden size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
//     </Card>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  ArrowUpRight,
  PackageCheck,
} from "lucide-react";

import type { Product } from "@/types/product";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onWishlist?: (product: Product) => void;
}

export function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onWishlist,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <Card className="group relative min-w-0 overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">

        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={false}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount */}
        {discount > 0 && (
          <Badge className="absolute left-2 top-2 z-10 rounded-full bg-red-500 px-2.5 text-white hover:bg-red-500 sm:left-3 sm:top-3">
            -{discount}%
          </Badge>
        )}

        {/* Category */}
        <Badge
          variant="secondary"
          className="absolute right-2 top-2 z-10 max-w-[55%] truncate text-[10px] sm:right-3 sm:top-3 sm:text-xs"
        >
          {product.category}
        </Badge>

        {/* Wishlist */}
        <Button
          type="button"
          size="icon"
          variant="secondary"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isFavorite}
          className="absolute right-2 top-10 z-20 size-8 rounded-full shadow-md sm:right-3 sm:top-12 sm:size-9"
          onClick={() => {
            setIsFavorite((prev) => !prev);
            onWishlist?.(product);
          }}
        >
          <Heart
            className={`size-4 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>

        {/* Desktop Hover Actions */}
        <div className="absolute inset-x-2 bottom-2 z-20 hidden translate-y-3 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:flex sm:inset-x-3 sm:bottom-3">

          <Button
            type="button"
            size="sm"
            className="w-full gap-2 rounded-full"
            onClick={() => onQuickView?.(product)}
          >
            <Eye className="size-4" />
            View Details
            <ArrowUpRight className="size-3.5" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="w-full gap-2 rounded-full"
            onClick={() => onAddToCart?.(product)}
            disabled={stock <= 0}
          >
            <ShoppingCart className="size-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-2 p-3 sm:p-4">

        <p className="truncate text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
          {product.category}
        </p>

        <h3
          title={product.name}
          className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 transition-colors group-hover:text-primary sm:text-sm"
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-muted-foreground sm:text-xs">
            ({product.sold.toLocaleString("en-BD")} sold)
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-sm font-bold text-primary sm:text-lg">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {discount > 0 && (
            <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
              ৳{product.originalPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center justify-between border-t pt-2">
          <span
            className={`flex items-center gap-1 text-[10px] font-medium sm:text-xs ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            <PackageCheck className="size-3.5" />
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>

        {/* Mobile Actions */}
        <div className="flex gap-2 sm:hidden">
          <Button
            size="sm"
            variant="outline"
            className="min-w-0 flex-1 gap-1 rounded-full text-xs"
            onClick={() => onQuickView?.(product)}
          >
            <Eye className="size-3.5" />
            Details
          </Button>

          <Button
            size="sm"
            className="min-w-0 flex-1 gap-1 rounded-full text-xs"
            onClick={() => onAddToCart?.(product)}
            disabled={stock <= 0}
          >
            <ShoppingCart className="size-3.5" />
            Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
