"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
// import Logo from "@/assets/svg/Logo";
import { UserRole } from "@/types";
import { adminRoutes, superAdminRoutes,customerRoutes, providerRoutes } from "@/routes";
import { SidebarItems } from "@/types/sidebar.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: superAdminRoutes,
  ADMIN: adminRoutes,
  PROVIDER: providerRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];

  console.log(pathname);
  return (
    <Sidebar>ক
      <SidebarHeader>
        <Link href="/">
       <div className="flex items-center gap-3">
            {/* <Logo /> */}
            <span className="font-bold lg:text-xl">MOF<span className="text-teal-400">HAF</span> Mana<span className="text-teal-400">gement</span></span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup  key={item.title}>
            <SidebarGroupLabel className="font-bold ">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem  key={item.title}>
                    <SidebarMenuButton
                      render={<Link className="hover:bg-teal-400 hover:text-white hover:font-bold" href={item.url} />}
                      isActive={pathname === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}