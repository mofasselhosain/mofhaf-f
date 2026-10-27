
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Menu,
//   X,
// } from "lucide-react";

// import {
//   brands,
//   categories,
//   navigation,
// } from "@/lib/demo-data";

// export function SecondHeader() {
//   const [open, setOpen] = useState(false);
//   const [activeSlug, setActiveSlug] = useState(
//     categories[0]?.slug ?? "",
//   );

//   const activeCategory =
//     categories.find((category) => category.slug === activeSlug) ??
//     categories[0];

//   function closeMenu() {
//     setOpen(false);
//   }

//   return (
//     <div
//       className="relative z-40 w-full border-b bg-white text-gray-800"
//       onMouseLeave={() => {
//         // Hover closing is desktop-only; mobile uses the close button.
//         if (window.matchMedia("(min-width: 768px)").matches) {
//           setOpen(false);
//         }
//       }}
//     >
//       {/* Navigation bar */}
//       <div className="mx-auto flex max-w-screen-2xl items-center gap-4 px-3 sm:gap-6 sm:px-5 lg:gap-8 lg:px-8">
//         <button
//           type="button"
//           aria-expanded={open}
//           aria-controls="second-header-mega-menu"
//           onMouseEnter={() => {
//             if (window.matchMedia("(min-width: 768px)").matches) {
//               setOpen(true);
//             }
//           }}
//           onClick={() => setOpen((value) => !value)}
//           className="flex shrink-0 items-center gap-2 py-3.5 text-sm font-semibold hover:text-teal-500 sm:py-4"
//         >
//           {open ? (
//             <X className="size-5" />
//           ) : (
//             <Menu className="size-5" />
//           )}

//           <span className="hidden sm:inline">All Categories</span>
//           <span className="sm:hidden">Categories</span>

//           <ChevronDown
//             className={`size-4 transition-transform ${
//               open ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {/* Scrollable links on smaller screens */}
//         <nav
//           aria-label="Shop navigation"
//           className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 lg:gap-8"
//         >
//           {navigation.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               onMouseEnter={() => {
//                 if (window.matchMedia("(min-width: 768px)").matches) {
//                   setOpen(false);
//                 }
//               }}
//               className="shrink-0 py-4 text-xs transition-colors hover:text-teal-500 sm:text-sm"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Mega menu */}
//       {open && (
//         <>
//           {/* Mobile backdrop */}
//           <button
//             type="button"
//             aria-label="Close categories menu"
//             onClick={closeMenu}
//             className="fixed inset-0 top-0 z-40 bg-black/30 md:hidden"
//           />

//           <div
//             id="second-header-mega-menu"
//             className="absolute left-0 top-full z-50 w-full border-t bg-white shadow-2xl"
//             onMouseEnter={() => {
//               if (window.matchMedia("(min-width: 768px)").matches) {
//                 setOpen(true);
//               }
//             }}
//           >
//             <div className="mx-auto max-w-screen-2xl">
//               {/* Mobile menu heading */}
//               <div className="flex items-center justify-between border-b px-4 py-3 md:hidden">
//                 <h2 className="font-semibold">Shop by category</h2>

//                 <button
//                   type="button"
//                   onClick={closeMenu}
//                   aria-label="Close menu"
//                   className="rounded-md p-2 hover:bg-gray-100"
//                 >
//                   <X className="size-5" />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
//                 {/* Category sidebar */}
//                 <aside className="max-h-[35vh] overflow-y-auto border-b p-2 md:max-h-[520px] md:border-b-0 md:border-r md:p-3">
//                   <h3 className="hidden px-3 pb-3 pt-2 font-semibold md:block">
//                     All Categories
//                   </h3>

//                   {categories.map((category) => (
//                     <Link
//                       key={category.id}
//                       href={`/categories/${category.slug}`}
//                       onMouseEnter={() => {
//                         setActiveSlug(category.slug);
//                       }}
//                       onFocus={() => {
//                         setActiveSlug(category.slug);
//                       }}
//                       onClick={closeMenu}
//                       className={`flex items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm transition-colors sm:py-3 ${
//                         activeSlug === category.slug
//                           ? "bg-gray-100 font-semibold text-teal-600"
//                           : "hover:bg-gray-50 hover:text-teal-500"
//                       }`}
//                     >
//                       <span className="flex min-w-0 items-center gap-3">
//                         <span className="shrink-0 text-lg">
//                           {category.icon ?? "🛍️"}
//                         </span>

//                         <span className="truncate">
//                           {category.name}
//                         </span>
//                       </span>

//                       <ChevronRight className="size-4 shrink-0" />
//                     </Link>
//                   ))}
//                 </aside>

//                 {/* Dynamic category content */}
//                 <section className="max-h-[55vh] overflow-y-auto p-4 sm:p-5 md:max-h-[520px] md:p-6">
//                   {activeCategory && (
//                     <>
//                       <div className="mb-5 flex items-center justify-between gap-3">
//                         <h2 className="text-base font-bold sm:text-lg">
//                           {activeCategory.name}
//                         </h2>

//                         <Link
//                           href={`/categories/${activeCategory.slug}`}
//                           onClick={closeMenu}
//                           className="shrink-0 text-xs text-blue-600 hover:underline sm:text-sm"
//                         >
//                           View all
//                         </Link>
//                       </div>

//                       <h3 className="mb-3 text-sm font-semibold">
//                         Recommended
//                       </h3>

//                       <div className="mb-7 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//                         {(activeCategory.children ?? []).map((child) => (
//                           <Link
//                             key={child.id}
//                             href={`/categories/${child.slug}`}
//                             onClick={closeMenu}
//                             className="group min-w-0 rounded-lg p-2 text-center transition-colors hover:bg-gray-50 sm:p-3"
//                           >
//                             <span className="mx-auto mb-2 flex size-12 items-center justify-center rounded-lg bg-gray-100 text-2xl transition-transform group-hover:scale-105 sm:size-16 sm:text-3xl">
//                               {child.icon ?? "🛍️"}
//                             </span>

//                             <span className="block break-words text-xs group-hover:text-teal-500 sm:text-sm">
//                               {child.name}
//                             </span>
//                           </Link>
//                         ))}
//                       </div>

//                       <h3 className="mb-3 text-sm font-semibold">
//                         Shop By Brand
//                       </h3>

//                       <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
//                         {brands.map((brand) => (
//                           <Link
//                             key={brand.id}
//                             href={`/brands/${brand.slug}`}
//                             onClick={closeMenu}
//                             className="flex min-h-14 min-w-0 items-center justify-center rounded-lg border p-3 transition-colors hover:border-gray-400 hover:bg-gray-50 sm:min-h-20"
//                           >
//                             <span className="break-words text-center text-xs font-extrabold tracking-wide sm:text-sm">
//                               {brand.logo}
//                             </span>
//                           </Link>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                 </section>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
