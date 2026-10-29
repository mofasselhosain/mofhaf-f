
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// --------------------------------------------------
// Types
// --------------------------------------------------

type OrderStatus =
  | "Delivered"
  | "Processing"
  | "Shipped"
  | "Cancelled";

type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  image: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

type DashboardData = {
  name: string;
  rewardPoints: number;
  activeOrders: number;
  totalOrders: number;
  favorites: number;
  totalSpent: number;
  orders: Order[];
  products: Product[];
};

// --------------------------------------------------
// Demo data
// Replace with your Express API data
// --------------------------------------------------

const demoDashboard: DashboardData = {
  name: "Alex Morgan",
  rewardPoints: 1240,
  activeOrders: 1,
  totalOrders: 58,
  favorites: 7,
  totalSpent: 2840.5,

  orders: [
    {
      id: "MFH-2841",
      name: "Wireless Headphones Pro",
      date: "Oct 28, 2026",
      items: 2,
      total: 149.99,
      status: "Shipped",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=240&h=240&fit=crop",
    },
    {
      id: "MFH-2837",
      name: "Smart Watch Series X",
      date: "Oct 24, 2026",
      items: 1,
      total: 89.99,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=240&h=240&fit=crop",
    },
    {
      id: "MFH-2822",
      name: "Everyday Backpack",
      date: "Oct 18, 2026",
      items: 1,
      total: 54.5,
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=240&h=240&fit=crop",
    },
    {
      id: "MFH-2810",
      name: "Minimal Sneakers",
      date: "Oct 12, 2026",
      items: 1,
      total: 74,
      status: "Cancelled",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240&h=240&fit=crop",
    },
  ],

  products: [
    {
      id: "P-101",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    },
    {
      id: "P-102",
      name: "Classic Smart Watch",
      category: "Accessories",
      price: 89.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    },
    {
      id: "P-103",
      name: "Urban Backpack",
      category: "Lifestyle",
      price: 54.5,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    },
    {
      id: "P-104",
      name: "Sport Sneakers",
      category: "Fashion",
      price: 74,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
  ],
};

// --------------------------------------------------
// API
// --------------------------------------------------

async function fetchDashboard(): Promise<DashboardData> {
  // Replace this with your actual Express API request.
  return demoDashboard;
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const currency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const styles: Record<OrderStatus, string> = {
    Delivered:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    Processing:
      "border-amber-200 bg-amber-50 text-amber-700",
    Shipped:
      "border-blue-200 bg-blue-50 text-blue-700",
    Cancelled:
      "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </Badge>
  );
}

function SectionHeading({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {href && (
        <Button
         
          variant="ghost"
          size="sm"
          className="shrink-0 text-xs sm:text-sm"
        >
          <Link href={href}>
            View all
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

// --------------------------------------------------
// Dashboard
// --------------------------------------------------

export default function CustomerDashboardPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["customer-dashboard"],
    queryFn: fetchDashboard,
  });

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-[1600px] animate-pulse space-y-6">
          <div className="h-16 rounded-2xl bg-white" />

          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-2xl bg-white"
              />
            ))}
          </div>

          <div className="h-64 rounded-2xl bg-white" />

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="h-80 rounded-2xl bg-white" />
            <div className="h-80 rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-2xl">
          <CardContent className="space-y-4 p-6 text-center sm:p-8">
            <Activity className="mx-auto size-10 text-red-500" />

            <h1 className="text-lg font-semibold">
              Unable to load your dashboard
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              Please check your connection and try again.
            </p>

            <Button onClick={() => refetch()} className="w-full sm:w-auto">
              Try again
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  // Featured order
  const featuredOrder = data.orders.find(
    (order) =>
      order.status === "Shipped" ||
      order.status === "Processing",
  ) ?? data.orders[0];

  // Statistics
  const metrics = [
    {
      label: "Reward points",
      value: data.rewardPoints.toLocaleString(),
      note: "Available to redeem",
      icon: Star,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Active orders",
      value: String(data.activeOrders),
      note: "Currently in progress",
      icon: Truck,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total orders",
      value: String(data.totalOrders),
      note: "All-time purchases",
      icon: ShoppingBag,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      label: "Wishlist",
      value: String(data.favorites),
      note: "Saved products",
      icon: Heart,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  // Tracking steps
  const trackingSteps = [
    { label: "Confirmed", icon: Check },
    { label: "Processing", icon: Package },
    { label: "On the way", icon: Truck },
    { label: "Delivered", icon: ShieldCheck },
  ];

  const currentStep =
    featuredOrder?.status === "Shipped"
      ? 2
      : featuredOrder?.status === "Processing"
        ? 1
        : featuredOrder?.status === "Delivered"
          ? 3
          : 0;

  const completedOrders = data.orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f8fa] text-slate-900">

      {/* =========================================
          RESPONSIVE HEADER
          No sidebar or mobile menu
      ========================================= */}

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 xl:px-10">

          <Link
            href="/customer/dashboard"
            className="shrink-0 text-xl font-black tracking-tight sm:text-2xl"
          >
            MOF<span className="text-orange-600">HAF</span>
          </Link>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="size-9 shrink-0 sm:size-10"
            >
              <Bell className="size-5" />
            </Button>

            <Button
             
              variant="outline"
              size="sm"
              className="shrink-0 bg-white"
            >
              <Link href="/products">
                <Search className="size-4 sm:mr-2" />

                <span className="hidden sm:inline">
                  Explore products
                </span>

                <span className="sm:hidden">
                  Shop
                </span>
              </Link>
            </Button>

            <Button
             
              size="sm"
              className="shrink-0 bg-orange-600 hover:bg-orange-700"
            >
              <Link href="/customer/orders">
                <ShoppingBag className="size-4 sm:mr-2" />

                <span className="hidden sm:inline">
                  My orders
                </span>

                <span className="sm:hidden">
                  Orders
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN CONTENT
          Full-width responsive layout
      ========================================= */}

      <main className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-9 xl:px-12 2xl:px-14">

        {/* Welcome section */}

        <section className="mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between lg:mb-9">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600 sm:text-xs">
              Customer portal
            </p>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Welcome back, {data.name.split(" ")[0]}!
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Here&apos;s what&apos;s happening with your account.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
             
              variant="outline"
              className="min-w-0 bg-white"
            >
              <Link href="/products">
                <Search className="mr-2 size-4" />
                Explore products
              </Link>
            </Button>

            <Button
              
              className="bg-orange-600 shadow-sm shadow-orange-600/20 hover:bg-orange-700"
            >
              <Link href="/customer/orders">
                <ShoppingBag className="mr-2 size-4" />
                My orders
              </Link>
            </Button>
          </div>
        </section>

        {/* =========================================
            ACCOUNT STATISTICS
        ========================================= */}

        <section
          aria-label="Account statistics"
          className="mb-6 grid grid-cols-2 gap-3 sm:mb-7 sm:gap-4 xl:grid-cols-4"
        >
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card
                key={metric.label}
                className="min-w-0 overflow-hidden rounded-2xl border-slate-200/80 shadow-sm shadow-slate-200/30 transition-shadow hover:shadow-md"
              >
                <CardContent className="p-3.5 sm:p-5 lg:p-6">
                  <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-11 ${metric.iconBg} ${metric.iconColor}`}
                    >
                      <Icon className="size-4 sm:size-5" />
                    </div>

                    <span className="hidden rounded-full bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500 2xl:inline">
                      My account
                    </span>
                  </div>

                  <p className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                    {metric.value}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm">
                    {metric.label}
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                    {metric.note}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* =========================================
            FEATURED ORDER TRACKING
        ========================================= */}

        {featuredOrder && (
          <Card className="mb-6 overflow-hidden rounded-2xl border-slate-200/80 shadow-sm shadow-slate-200/30 sm:mb-7">
            <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 shrink-0 rounded-full ${
                      featuredOrder.status === "Cancelled"
                        ? "bg-red-500"
                        : featuredOrder.status === "Delivered"
                          ? "bg-emerald-500"
                          : "bg-orange-500"
                    }`}
                  />

                  <CardTitle className="text-base sm:text-lg">
                    Track your order
                  </CardTitle>
                </div>

                <p className="mt-2 break-words text-sm text-slate-500">
                  Order #{featuredOrder.id}
                </p>
              </div>

              <div className="self-start sm:self-center">
                <StatusBadge status={featuredOrder.status} />
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
              <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:gap-5 sm:p-4">
                <img
                  src={featuredOrder.image}
                  alt={featuredOrder.name}
                  className="size-20 shrink-0 rounded-xl border border-slate-200 bg-white object-cover sm:size-24"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm font-semibold sm:text-base">
                    {featuredOrder.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    {featuredOrder.items} item(s) ·{" "}
                    {featuredOrder.date}
                  </p>

                  <p className="mt-2 font-bold">
                    {currency(featuredOrder.total)}
                  </p>
                </div>

                <Button
                  
                  variant="outline"
                  className="w-full shrink-0 bg-white sm:w-auto"
                >
                  <Link href={`/customer/orders/${featuredOrder.id}`}>
                    Order details
                    <ChevronRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>

              {featuredOrder.status !== "Cancelled" ? (
                <>
                  {/* Responsive tracking progress */}

                  <div className="relative mt-8 grid grid-cols-4 gap-1 sm:mt-10">
                    <div className="absolute left-[12.5%] right-[12.5%] top-4 h-0.5 bg-slate-200" />

                    <div
                      className="absolute left-[12.5%] top-4 h-0.5 bg-emerald-600 transition-all duration-500"
                      style={{
                        width: `${(currentStep / 3) * 75}%`,
                      }}
                    />

                    {trackingSteps.map((step, index) => {
                      const Icon = step.icon;
                      const complete = index <= currentStep;

                      return (
                        <div
                          key={step.label}
                          className="relative z-10 flex min-w-0 flex-col items-center text-center"
                        >
                          <div
                            className={`flex size-8 items-center justify-center rounded-full border-2 sm:size-9 ${
                              complete
                                ? "border-emerald-700 bg-emerald-700 text-white"
                                : "border-slate-200 bg-white text-slate-400"
                            }`}
                          >
                            <Icon className="size-3.5 sm:size-4" />
                          </div>

                          <span
                            className={`mt-2 px-0.5 text-[9px] leading-4 sm:mt-3 sm:text-xs ${
                              complete
                                ? "font-semibold text-slate-900"
                                : "text-slate-400"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500 sm:mt-6 sm:text-sm">
                    <Clock3 className="mt-0.5 size-4 shrink-0" />

                    {featuredOrder.status === "Shipped"
                      ? "Your order is on its way."
                      : featuredOrder.status === "Delivered"
                        ? "Your order has been delivered."
                        : "Your order is being prepared."}
                  </p>
                </>
              ) : (
                <p className="mt-5 text-sm leading-6 text-red-600">
                  This order was cancelled. View its details for more
                  information.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* =========================================
            RECENT ORDERS + SPENDING
        ========================================= */}

        <section className="mb-6 grid min-w-0 gap-5 sm:mb-7 sm:gap-6 xl:grid-cols-[1.45fr_1fr] 2xl:grid-cols-[1.55fr_1fr]">

          {/* Recent orders */}

          <Card className="min-w-0 overflow-hidden rounded-2xl border-slate-200/80 shadow-sm shadow-slate-200/30">
            <CardHeader className="p-4 sm:p-6">
              <SectionHeading
                title="Recent orders"
                subtitle="Keep track of your latest purchases"
                href="/customer/orders"
              />
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
              <div className="space-y-0">
                {data.orders.slice(0, 4).map((order, index) => (
                  <div key={order.id}>
                    <div className="flex min-w-0 flex-wrap items-center gap-3 py-4 first:pt-0 sm:flex-nowrap sm:gap-4">
                      <img
                        src={order.image}
                        alt={order.name}
                        loading="lazy"
                        className="size-12 shrink-0 rounded-xl border bg-slate-50 object-cover sm:size-14"
                      />

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/customer/orders/${order.id}`}
                          className="block break-words text-sm font-semibold hover:text-orange-600"
                        >
                          {order.name}
                        </Link>

                        <p className="mt-1 break-words text-[10px] leading-4 text-slate-500 sm:text-xs">
                          #{order.id} · {order.date}
                        </p>

                        <div className="mt-2">
                          <StatusBadge status={order.status} />
                        </div>
                      </div>

                      <div className="ml-auto flex shrink-0 items-center gap-1">
                        <span className="text-xs font-bold sm:text-sm">
                          {currency(order.total)}
                        </span>

                        <Button
                          
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          aria-label={`View order ${order.id}`}
                        >
                          <Link href={`/customer/orders/${order.id}`}>
                            <ChevronRight className="size-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {index < data.orders.slice(0, 4).length - 1 && (
                      <Separator />
                    )}
                  </div>
                ))}
              </div>

              {data.orders.length === 0 && (
                <div className="py-8 text-center">
                  <Package className="mx-auto size-8 text-slate-400" />

                  <p className="mt-3 text-sm font-medium">
                    No orders yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Your purchases will appear here.
                  </p>
                </div>
              )}

              <Button
                
                variant="outline"
                className="mt-3 w-full"
              >
                <Link href="/customer/orders">
                  View order history
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Spending overview */}

          <Card className="min-w-0 rounded-2xl border-slate-200/80 shadow-sm shadow-slate-200/30">
            <CardHeader className="p-4 sm:p-6">
              <SectionHeading
                title="Spending overview"
                subtitle="Your account at a glance"
              />
            </CardHeader>

            <CardContent className="px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
              <div className="rounded-2xl bg-[#fff4eb] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                  <Wallet className="size-4 shrink-0 text-orange-600" />
                  Lifetime purchases
                </div>

                <p className="mt-3 break-words text-2xl font-bold tracking-tight sm:text-3xl">
                  {currency(data.totalSpent)}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Total spending recorded on your account.
                </p>
              </div>

              <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">

                {/* Completed orders */}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Package className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        Completed orders
                      </p>

                      <p className="mt-1 text-xs leading-4 text-slate-500">
                        Successfully delivered
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-lg font-bold">
                    {completedOrders}
                  </p>
                </div>

                <Separator />

                {/* Active orders */}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Truck className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        In progress
                      </p>

                      <p className="mt-1 text-xs leading-4 text-slate-500">
                        Orders not yet delivered
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-lg font-bold">
                    {data.activeOrders}
                  </p>
                </div>

                <Separator />

                {/* Rewards progress */}

                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium">
                      Rewards progress
                    </span>

                    <span className="text-xs font-semibold text-orange-600">
                      {data.rewardPoints.toLocaleString()} / 1,500 pts
                    </span>
                  </div>

                  <Progress
                    value={Math.min(
                      (data.rewardPoints / 1500) * 100,
                      100,
                    )}
                    className="h-2.5"
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {Math.max(1500 - data.rewardPoints, 0)} more
                    points to reach the next reward.
                  </p>

                  <Button
                    
                    variant="link"
                    className="mt-2 h-auto p-0 text-orange-600"
                  >
                    <Link href="/customer/rewards">
                      Explore rewards
                      <ArrowRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* =========================================
            FAVORITE PRODUCTS
        ========================================= */}

        <section className="mb-7 sm:mb-9">
          <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-tight sm:text-lg">
                Your favorites
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Products you have saved for later
              </p>
            </div>

            <Button
              
              variant="ghost"
              size="sm"
              className="shrink-0"
            >
              <Link href="/customer/wishlist">
                Wishlist
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">

            {data.products.map((product) => (
              <Card
                key={product.id}
                className="group min-w-0 overflow-hidden rounded-2xl border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="block"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/95 text-rose-600 shadow-sm sm:right-3 sm:top-3">
                      <Heart className="size-4 fill-current" />
                    </span>
                  </div>
                </Link>

                <CardContent className="p-3 sm:p-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    {product.category}
                  </p>

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-1 block break-words text-xs font-semibold leading-5 hover:text-orange-600 sm:text-sm"
                  >
                    {product.name}
                  </Link>

                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                    <Star className="size-3.5 fill-current" />

                    <span className="font-medium">
                      {product.rating}
                    </span>

                    <span className="text-slate-400">
                      / 5
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold sm:text-sm">
                      {currency(product.price)}
                    </span>

                    <Button
                      
                      size="icon"
                      variant="outline"
                      className="size-8 shrink-0"
                      aria-label={`View ${product.name}`}
                    >
                      <Link href={`/products/${product.id}`}>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {data.products.length === 0 && (
            <Card className="rounded-2xl border-dashed shadow-none">
              <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
                <Heart className="size-10 text-slate-300" />

                <p className="mt-3 font-semibold">
                  Your wishlist is empty
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Save products you love to find them here.
                </p>

                <Button
                  
                  className="mt-4 bg-orange-600 hover:bg-orange-700"
                >
                  <Link href="/products">
                    Browse products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* =========================================
            REWARDS BANNER
        ========================================= */}

        <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-orange-700 via-orange-600 to-[#e95c2a] p-5 text-white shadow-sm sm:p-7 lg:p-9">
          <div className="pointer-events-none absolute -right-12 -top-20 -z-10 size-56 rounded-full border-[35px] border-white/10" />

          <div className="pointer-events-none absolute -bottom-24 right-20 -z-10 size-48 rounded-full bg-white/5 sm:right-40" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
                <Star className="size-3.5 fill-current" />
                MOFHAF Rewards
              </div>

              <h2 className="text-xl font-bold leading-tight sm:text-2xl lg:text-3xl">
                Great shopping deserves great rewards.
              </h2>

              <p className="mt-3 text-sm leading-6 text-orange-50 sm:text-base">
                You have{" "}
                {data.rewardPoints.toLocaleString()} points ready
                to use. Explore your next favorite product and
                make every purchase count.
              </p>
            </div>

            <Button
             
              className="w-full shrink-0 bg-slate-950 text-white hover:bg-slate-800 sm:w-auto"
            >
              <Link href="/products">
                Explore collection
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* =========================================
            FOOTER
        ========================================= */}

        <footer className="flex flex-col gap-4 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:py-8">
          <p>
            © {new Date().getFullYear()} MOFHAF. All rights reserved.
          </p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-3"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-slate-700"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-slate-700"
            >
              Terms
            </Link>

            <Link
              href="/support"
              className="transition-colors hover:text-slate-700"
            >
              Help & support
            </Link>
          </nav>
        </footer>

        {/* Background refetch indicator */}

        {isFetching && (
          <p
            role="status"
            className="pb-4 text-center text-xs text-slate-400"
          >
            Updating dashboard…
          </p>
        )}
      </main>
    </div>
  );
}
