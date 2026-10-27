"use client"

import MofhafCategorySection from "@/components/category/home-category";
import MofhafGlobalSection from "@/components/home/global-section/mofhaf-global-section";

import HeroBanner from "@/components/home/topBanner/top-banner";

import ProductGrid from "@/components/products/products-grid";
import Footer from "@/components/share/footer/footer";
import MofhafHeader from "@/components/share/top-header/top-header";





export default function Home() {

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MofhafHeader/>
   
      <HeroBanner/>
      <MofhafCategorySection/>
      <ProductGrid/>
      <MofhafGlobalSection/>
      
      {/* <MofProductGrid></MofProductGrid> */}
      <Footer></Footer>
      
    </div>
  );
}
