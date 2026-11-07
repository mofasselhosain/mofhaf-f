import CustomerProfilePage from "@/components/dashboard/customer/profile-page/profile-page";


export const instant = false;
export default function DashboardProfile() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
   <CustomerProfilePage></CustomerProfilePage>
    </div>
  );
}
