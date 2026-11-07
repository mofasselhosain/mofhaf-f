import CustomerOrdersPage from "@/components/dashboard/customer/my-order/my-order";
export const instant = false;
export default function MyOrders() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   <CustomerOrdersPage></CustomerOrdersPage>
    </div>
  );
}