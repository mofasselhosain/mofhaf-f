
"use client";

import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Download,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const revenueData = [
  { month: "Jan", revenue: 28000, orders: 340 },
  { month: "Feb", revenue: 35000, orders: 420 },
  { month: "Mar", revenue: 31000, orders: 390 },
  { month: "Apr", revenue: 43000, orders: 510 },
  { month: "May", revenue: 38000, orders: 470 },
  { month: "Jun", revenue: 52000, orders: 620 },
  { month: "Jul", revenue: 46000, orders: 560 },
  { month: "Aug", revenue: 61000, orders: 710 },
  { month: "Sep", revenue: 55000, orders: 680 },
  { month: "Oct", revenue: 68000, orders: 820 },
  { month: "Nov", revenue: 59000, orders: 750 },
  { month: "Dec", revenue: 76000, orders: 940 },
];

const quarterlyData = [
  { quarter: "Q1", sales: 32 },
  { quarter: "Q2", sales: 48 },
  { quarter: "Q3", sales: 76 },
  { quarter: "Q4", sales: 59 },
  { quarter: "Q5", sales: 68 },
];

const categoryData = [
  { name: "Electronics", value: 42, color: "#3b82f6" },
  { name: "Fashion", value: 26, color: "#8b5cf6" },
  { name: "Home & Living", value: 18, color: "#10b981" },
  { name: "Beauty", value: 14, color: "#f59e0b" },
];

const products = [
  {
    name: "SmartWatch Pro",
    category: "Electronics",
    sales: 1240,
    revenue: "$24,800",
    growth: "+18.4%",
  },
  {
    name: "Wireless Headphones",
    category: "Electronics",
    sales: 986,
    revenue: "$19,720",
    growth: "+12.6%",
  },
  {
    name: "Premium Sneakers",
    category: "Fashion",
    sales: 754,
    revenue: "$15,080",
    growth: "+8.2%",
  },
  {
    name: "Mini Action Camera",
    category: "Electronics",
    sales: 642,
    revenue: "$12,840",
    growth: "-2.4%",
  },
];

const orders = [
  {
    id: "#ORD-1024",
    customer: "Rahim Ahmed",
    product: "SmartWatch Pro",
    date: "Oct 29, 2026",
    amount: "$249.00",
    status: "Completed",
  },
  {
    id: "#ORD-1023",
    customer: "Nusrat Jahan",
    product: "Wireless Headphones",
    date: "Oct 29, 2026",
    amount: "$129.00",
    status: "Processing",
  },
  {
    id: "#ORD-1022",
    customer: "Tanvir Hasan",
    product: "Premium Sneakers",
    date: "Oct 28, 2026",
    amount: "$89.00",
    status: "Pending",
  },
  {
    id: "#ORD-1021",
    customer: "Ayesha Khan",
    product: "Mini Action Camera",
    date: "Oct 28, 2026",
    amount: "$199.00",
    status: "Completed",
  },
];

// const navItems = [
//   { label: "Overview", icon: LayoutDashboard, href: "/admin" },
//   { label: "Products", icon: Package, href: "/admin/products" },
//   { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
//   { label: "Customers", icon: Users, href: "/admin/customers" },
//   { label: "Sales Analytics", icon: Activity, href: "/admin/sales" },
//   { label: "Payments", icon: CreditCard, href: "/admin/payments" },
//   { label: "Settings", icon: Settings, href: "/admin/settings" },
// ];

function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  positive = true,
}: {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ElementType;
  positive?: boolean;
}) {
  return (
    <Card className="min-w-0 border-border/70 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <h3 className="mt-3 break-words text-2xl font-bold tracking-tight sm:text-3xl">
              {value}
            </h3>
          </div>
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Icon className="size-5" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={
              positive
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                : "border-red-500/20 bg-red-500/10 text-red-600"
            }
          >
            {positive ? (
              <ArrowUpRight className="mr-1 size-3" />
            ) : (
              <ArrowDownRight className="mr-1 size-3" />
            )}
            {change}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SalesDashboardPage() {
  const [period, setPeriod] = useState("12 months");
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer} ${order.product}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const displayedRevenue =
    period === "6 months"
      ? revenueData.slice(-6)
      : period === "3 months"
        ? revenueData.slice(-3)
        : revenueData;

  const exportOrders = () => {
    const header = [
      "Order ID",
      "Customer",
      "Product",
      "Date",
      "Amount",
      "Status",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.customer,
      order.product,
      order.date,
      order.amount,
      order.status,
    ]);

    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((value) => `"${value.replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mofhaf-sales-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <div className="flex min-h-screen">
     
        {/* Mobile navigation drawer */}
       

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6 xl:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">
                  Sales Analytics
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Monitor your store performance
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden gap-2 sm:flex"
              >
                <CalendarDays className="size-4" />
                Oct 2026
                <ChevronDown className="size-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative"
              >
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
              </Button>
              <Separator orientation="vertical" className="mx-1 h-8" />
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                A
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 xl:p-8">
            {/* Page heading */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Badge variant="secondary" className="mb-2">
                  <Activity className="mr-1 size-3" />
                  Store performance
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Sales overview
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Here&apos;s what&apos;s happening with your store.
                </p>
              </div>
              <Button onClick={exportOrders} className="gap-2 self-start">
                <Download className="size-4" />
                Export report
              </Button>
            </section>

            {/* KPI cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              <MetricCard
                title="Total Revenue"
                value="$52,840"
                change="+8.3%"
                description="vs last month"
                icon={CircleDollarSign}
              />
              <MetricCard
                title="Total Orders"
                value="8,944"
                change="+12.5%"
                description="vs last month"
                icon={ShoppingCart}
              />
              <MetricCard
                title="Net Profit"
                value="$18,600"
                change="+6.8%"
                description="vs last month"
                icon={Activity}
              />
              <MetricCard
                title="Total Customers"
                value="2,840"
                change="-2.1%"
                description="vs last month"
                icon={Users}
                positive={false}
              />
            </section>

            {/* Revenue and quarterly sales */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <Card className="min-w-0 xl:col-span-2">
                <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0">
                  <div>
                    <CardTitle className="text-base">
                      Revenue analytics
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Track revenue growth over time
                    </p>
                    <p className="mt-3 text-2xl font-bold">$52,840</p>
                    <p className="mt-1 text-xs text-emerald-600">
                      <ArrowUpRight className="mr-1 inline size-3" />
                      8.3% increase from the previous period
                    </p>
                  </div>

                  <select
                    aria-label="Revenue period"
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>12 months</option>
                    <option>6 months</option>
                    <option>3 months</option>
                  </select>
                </CardHeader>
                <CardContent className="min-w-0 pl-1 pr-4">
                  <div className="h-[260px] w-full sm:h-[310px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={displayedRevenue}
                        margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="revenueGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#3b82f6"
                              stopOpacity={0.24}
                            />
                            <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          className="stroke-border"
                        />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          tickMargin={10}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 11 }}
                          width={54}
                          tickFormatter={(value: number) =>
                            `$${value / 1000}k`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [
                            `$${Number(value).toLocaleString()}`,
                            "Revenue",
                          ]}
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid var(--border)",
                            background: "var(--background)",
                            fontSize: 12,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b82f6"
                          strokeWidth={2.5}
                          fill="url(#revenueGradient)"
                          activeDot={{ r: 5 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader>
                  <CardTitle className="text-base">
                    Quarterly sales
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Sales growth by period
                  </p>
                  <div className="pt-2 text-2xl font-bold">
                    18,944
                    <span className="ml-2 text-xs font-medium text-emerald-600">
                      +12.1%
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="min-w-0 px-2">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={quarterlyData}
                        margin={{ top: 16, right: 4, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          className="stroke-border"
                        />
                        <XAxis
                          dataKey="quarter"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11 }}
                        />
                        <YAxis hide />
                        <Tooltip
                          formatter={(value) => [`${value}k`, "Sales"]}
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid var(--border)",
                            background: "var(--background)",
                            fontSize: 12,
                          }}
                        />
                        <Bar
                          dataKey="sales"
                          radius={[7, 7, 0, 0]}
                          maxBarSize={42}
                        >
                          {quarterlyData.map((entry, index) => (
                            <Cell
                              key={entry.quarter}
                              fill={index === 2 ? "#3b82f6" : "#c7d2fe"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                    <span>Best period</span>
                    <span className="font-semibold text-foreground">
                      Q3 · 76k
                    </span>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Products and category distribution */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <Card className="min-w-0 xl:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      Top-performing products
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your best sellers by revenue
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" >
                    <a href="/admin/products">
                      View all <ArrowRight className="ml-1 size-4" />
                    </a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-sm">
                      <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                          <th className="pb-3 font-medium">Product</th>
                          <th className="pb-3 font-medium">Category</th>
                          <th className="pb-3 text-right font-medium">
                            Sold
                          </th>
                          <th className="pb-3 text-right font-medium">
                            Revenue
                          </th>
                          <th className="pb-3 text-right font-medium">
                            Growth
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr
                            key={product.name}
                            className="border-b last:border-0"
                          >
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                  <Package className="size-4" />
                                </div>
                                <span className="font-medium">
                                  {product.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 text-muted-foreground">
                              {product.category}
                            </td>
                            <td className="py-4 text-right">
                              {product.sales.toLocaleString()}
                            </td>
                            <td className="py-4 text-right font-medium">
                              {product.revenue}
                            </td>
                            <td className="py-4 text-right">
                              <span
                                className={
                                  product.growth.startsWith("+")
                                    ? "text-emerald-600"
                                    : "text-red-500"
                                }
                              >
                                {product.growth}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="min-w-0">
                <CardHeader>
                  <CardTitle className="text-base">
                    Sales by category
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Revenue distribution
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[205px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={58}
                          outerRadius={83}
                          paddingAngle={4}
                          strokeWidth={0}
                        >
                          {categoryData.map((entry) => (
                            <Cell
                              key={entry.name}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Share"]}
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid var(--border)",
                            background: "var(--background)",
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">100%</span>
                      <span className="text-xs text-muted-foreground">
                        Categories
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 space-y-3">
                    {categoryData.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="truncate text-muted-foreground">
                            {category.name}
                          </span>
                        </div>
                        <span className="font-semibold">
                          {category.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recent orders */}
            <section>
              <Card>
                <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-base">
                      Recent orders
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Review your latest customer transactions
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search orders..."
                        aria-label="Search orders"
                        className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:w-56"
                      />
                    </div>
                    <Button variant="outline" size="sm" >
                      <a href="/admin/orders">
                        View all orders
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-sm">
                      <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                          <th className="pb-3 font-medium">Order ID</th>
                          <th className="pb-3 font-medium">Customer</th>
                          <th className="pb-3 font-medium">Product</th>
                          <th className="pb-3 font-medium">Date</th>
                          <th className="pb-3 text-right font-medium">
                            Amount
                          </th>
                          <th className="pb-3 text-right font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b last:border-0 transition-colors hover:bg-muted/40"
                          >
                            <td className="py-4 font-medium text-primary">
                              {order.id}
                            </td>
                            <td className="py-4">{order.customer}</td>
                            <td className="py-4 text-muted-foreground">
                              {order.product}
                            </td>
                            <td className="py-4 text-muted-foreground">
                              {order.date}
                            </td>
                            <td className="py-4 text-right font-semibold">
                              {order.amount}
                            </td>
                            <td className="py-4 text-right">
                              <Badge
                                variant="outline"
                                className={
                                  order.status === "Completed"
                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                                    : order.status === "Processing"
                                      ? "border-blue-500/20 bg-blue-500/10 text-blue-600"
                                      : "border-amber-500/20 bg-amber-500/10 text-amber-600"
                                }
                              >
                                {order.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                          <tr>
                            <td
                              colSpan={6}
                              className="py-10 text-center text-muted-foreground"
                            >
                              No matching orders found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      Showing {filteredOrders.length} of {orders.length} demo
                      orders
                    </span>
                    <span>Demo data · Replace with your API response</span>
                  </div>
                </CardContent>
              </Card>
            </section>

            <footer className="pb-2 text-center text-xs text-muted-foreground">
              © 2026 MOFHAF. Sales analytics dashboard.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
