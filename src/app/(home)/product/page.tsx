import ProductPage from "@/components/products/products/products-page";
import Footer from "@/components/share/footer/footer";
import MofhafHeader from "@/components/share/top-header/top-header";



export default function ProductPages() {
  return (
    <div>
 <MofhafHeader/>
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   <ProductPage></ProductPage>
    </div>
     <Footer></Footer>
    </div>
  );
}