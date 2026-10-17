import MofhafCategorySection from "@/components/category/home-category";
import HeroBanner from "@/components/home/topBanner/top-banner";
import ProductGrid from "@/components/products/products-grid";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   
      <HeroBanner/>
      <MofhafCategorySection/>
      <ProductGrid/>
    </div>
  );
}
