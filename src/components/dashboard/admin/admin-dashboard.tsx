
"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Ellipsis,
  Filter,
  Search,
  ShoppingBag,
  Users,
  Wallet,
  Package,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const revenueData = [
  { month: "Jan", current: 12, previous: 8 },
  { month: "Feb", current: 8, previous: 15 },
  { month: "Mar", current: 9, previous: 16 },
  { month: "Apr", current: 15, previous: 10 },
  { month: "May", current: 19, previous: 12 },
  { month: "Jun", current: 20, previous: 23 },
];

const channels = [
  { name: "Direct", value: 38, color: "#4338ca", amount: "$300.56" },
  { name: "Affiliate", value: 26, color: "#0891b2", amount: "$135.18" },
  { name: "Sponsored", value: 22, color: "#7c3aed", amount: "$154.02" },
  { name: "E-mail", value: 14, color: "#059669", amount: "$48.96" },
];

const locations = [
  { name: "New York", sales: 72, label: "72K" },
  { name: "San Francisco", sales: 39, label: "39K" },
  { name: "Sydney", sales: 25, label: "25K" },
  { name: "Singapore", sales: 61, label: "61K" },
];

const products = [
  { id: "1", name: "Shirt", category: "Man Cloths", price: 76.89, quantity: 128, image: "👔" },
  { id: "2", name: "T-Shirt", category: "Women Cloths", price: 79.8, quantity: 89, image: "👕" },
  { id: "3", name: "Pant", category: "Kid Cloths", price: 86.65, quantity: 74, image: "👖" },
  { id: "4", name: "Sweater", category: "Man Cloths", price: 56.07, quantity: 69, image: "🧥" },
  { id: "5", name: "Light Jacket", category: "Women Cloths", price: 36, quantity: 65, image: "🥼" },
  { id: "6", name: "Half Shirt", category: "Man Cloths", price: 46.78, quantity: 58, image: "👕" },
];

const stats = [
  {
    title: "Total Sales",
    value: "$34,456.00",
    change: "14%",
    positive: true,
    icon: Wallet,
  },
  {
    title: "Total Orders",
    value: "3,456",
    change: "17%",
    positive: false,
    icon: ShoppingBag,
  },
  {
    title: "Total Revenue",
    value: "$14,456.00",
    change: "14%",
    positive: true,
    icon: Package,
  },
  {
    title: "Total Customers",
    value: "42,456",
    change: "11%",
    positive: false,
    icon: Users,
  },
];

function SectionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          aria-label="Section options"
        >
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>Export report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}: (typeof stats)[number]) {
  return (
    <Card className="min-w-0 rounded-lg border bg-background shadow-none transition-shadow hover:shadow-sm">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {title}
          </p>
          <div className="flex items-center gap-1">
            <Icon className="hidden h-4 w-4 text-muted-foreground sm:block" />
            <SectionMenu />
          </div>
        </div>

        <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          {value}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge
            variant="outline"
            className={
              positive
                ? "gap-0.5 border-emerald-200 bg-emerald-50 px-1.5 text-emerald-700 dark:bg-emerald-950"
                : "gap-0.5 border-red-200 bg-red-50 px-1.5 text-red-700 dark:bg-red-950"
            }
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {change}
          </Badge>
          <span className="text-[11px] text-muted-foreground">
            in the last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TargetGauge() {
  const radius = 64;
  const circumference = Math.PI * radius;
  const progress = 75.34;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 160 100" className="w-full max-w-[240px]">
        <path
          d="M 16 84 A 64 64 0 0 1 144 84"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.10"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 16 84 A 64 64 0 0 1 144 84"
          fill="none"
          stroke="#6d43cb"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
        />
        <text
          x="80"
          y="65"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill="currentColor"
        >
          {progress}%
        </text>
      </svg>

      <Badge variant="secondary" className="-mt-1 text-xs">
        +12%
      </Badge>

      <p className="mt-3 max-w-[270px] text-center text-xs leading-5 text-muted-foreground">
        You earned $3,267 today, keeping your monthly sales target on track.
      </p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      {/* Top header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-3 backdrop-blur sm:px-6">
        <div>
          <h1 className="text-base font-semibold sm:text-lg">
            Report Analysis
          </h1>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Welcome back to your store overview
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/admin-avatar.png" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button variant="ghost" size="icon" aria-label="Account menu">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-4 p-3 sm:space-y-5 sm:p-5 lg:p-6">
        {/* KPI cards */}
        <section
          aria-label="Store statistics"
          className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        {/* Revenue and sales analytics */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <Card className="min-w-0 rounded-lg shadow-none xl:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 p-4 pb-2">
              <div>
                <CardTitle className="text-sm">Revenue</CardTitle>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    Current Week
                    <strong className="text-foreground">$58,211</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Previous Week
                    <strong className="text-foreground">$68,768</strong>
                  </span>
                </div>
              </div>
              <SectionMenu />
            </CardHeader>

            <CardContent className="h-[230px] p-2 pt-4 sm:h-[270px] sm:p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="previousFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.08} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.6 }} />
                  <YAxis tickFormatter={(v) => `${v}M`} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="current" name="Current week" stroke="#059669" strokeWidth={2} fill="url(#currentFill)" />
                  <Area type="monotone" dataKey="previous" name="Previous week" stroke="#7c3aed" strokeWidth={2} fill="url(#previousFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-lg shadow-none xl:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
              <CardTitle className="text-sm">Sales by Location</CardTitle>
              <SectionMenu />
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-5">
              <div className="flex h-14 items-center justify-center rounded-md bg-muted/40 text-xs text-muted-foreground">
                <span>Global sales overview</span>
              </div>
              {locations.map((location) => (
                <div key={location.name} className="space-y-1.5">
                  <div className="flex justify-between gap-2 text-[11px]">
                    <span className="truncate">{location.name}</span>
                    <span className="font-medium">{location.label}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-violet-600"
                      style={{ width: `${location.sales}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="min-w-0 rounded-lg shadow-none xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-0">
              <CardTitle className="text-sm">Total Sales</CardTitle>
              <SectionMenu />
            </CardHeader>
            <CardContent className="p-3">
              <div className="h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channels}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="58%"
                      outerRadius="85%"
                      paddingAngle={4}
                      stroke="none"
                    >
                      {channels.map((channel) => (
                        <Cell key={channel.name} fill={channel.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {channels.map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: channel.color }} />
                      {channel.name}
                    </span>
                    <span className="whitespace-nowrap text-muted-foreground">{channel.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Products and target */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <Card className="min-w-0 rounded-lg shadow-none xl:col-span-8">
            <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-sm">Top Selling Products</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-0 flex-1 sm:w-48 sm:flex-none">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products..."
                    className="h-8 pl-8 text-xs"
                    aria-label="Search products"
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1.5 text-xs"
                  onClick={() => setFilterOpen((value) => !value)}
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  See All
                </Button>
              </div>
            </CardHeader>

            {filterOpen && (
              <div className="mx-4 mb-3 rounded-md border bg-muted/20 p-3 text-xs text-muted-foreground">
                Showing {filteredProducts.length} matching products. Use the
                search field to filter by product name or category.
              </div>
            )}

            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="min-w-[150px] text-xs">Product Name</TableHead>
                    <TableHead className="text-xs">Price</TableHead>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs">Quantity</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-right text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="text-xs">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-lg">
                            {product.image}
                          </span>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.category}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell className="whitespace-nowrap font-medium">
                        ${(product.price * product.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger >
                            <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={`Actions for ${product.name}`}>
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View product</DropdownMenuItem>
                            <DropdownMenuItem>Edit product</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Remove product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="min-w-0 rounded-lg shadow-none xl:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
              <div>
                <CardTitle className="text-sm">Monthly Target</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your target for this month
                </p>
              </div>
              <SectionMenu />
            </CardHeader>
            <CardContent className="px-4 pb-5">
              <TargetGauge />
              <div className="mt-6 grid grid-cols-3 gap-2 border-t pt-4">
                <div>
                  <p className="text-[11px] text-muted-foreground">Target</p>
                  <p className="mt-1 text-sm font-semibold">
                    $25K <ArrowDownRight className="inline h-3.5 w-3.5 text-red-500" />
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Revenue</p>
                  <p className="mt-1 text-sm font-semibold">
                    $18K <ArrowUpRight className="inline h-3.5 w-3.5 text-emerald-600" />
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Today</p>
                  <p className="mt-1 text-sm font-semibold">
                    $1.8K <CheckCircle2 className="inline h-3.5 w-3.5 text-emerald-600" />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="pb-2 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MOFHAF Admin. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
