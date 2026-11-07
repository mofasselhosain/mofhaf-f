
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  Package,
  Eye,
  Download,
  RotateCcw,
  ChevronRight,
  CalendarDays,
  SlidersHorizontal,
  ArrowUpRight,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type Order = {
  id: string;
  date: string;
  products: {
    name: string;
    image: string;
    quantity: number;
  }[];
  total: number;
  status: OrderStatus;
  payment: "PAID" | "UNPAID" | "REFUNDED";
  paymentMethod: string;
};

const orders: Order[] = [
  {
    id: "MOF-2026-001",
    date: "2026-11-05",
    products: [
      {
        name: "4K Mini Action Camera",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100",
        quantity: 1,
      },
      {
        name: "Wireless Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
        quantity: 1,
      },
    ],
    total: 8490,
    status: "PROCESSING",
    payment: "PAID",
    paymentMethod: "bKash",
  },
  {
    id: "MOF-2026-002",
    date: "2026-11-03",
    products: [
      {
        name: "Smart Watch Series 9",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
        quantity: 1,
      },
    ],
    total: 5490,
    status: "SHIPPED",
    payment: "PAID",
    paymentMethod: "Card",
  },
  {
    id: "MOF-2026-003",
    date: "2026-10-29",
    products: [
      {
        name: "Premium Sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
        quantity: 2,
      },
    ],
    total: 4200,
    status: "DELIVERED",
    payment: "PAID",
    paymentMethod: "COD",
  },
  {
    id: "MOF-2026-004",
    date: "2026-10-25",
    products: [
      {
        name: "Portable Bluetooth Speaker",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100",
        quantity: 1,
      },
    ],
    total: 2490,
    status: "CANCELLED",
    payment: "REFUNDED",
    paymentMethod: "bKash",
  },
  {
    id: "MOF-2026-005",
    date: "2026-10-20",
    products: [
      {
        name: "Mini Foldable Drone",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=100",
        quantity: 1,
      },
    ],
    total: 7490,
    status: "DELIVERED",
    payment: "PAID",
    paymentMethod: "Card",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
  SHIPPED: "bg-violet-100 text-violet-700 border-violet-200",
  DELIVERED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

const paymentStyles = {
  PAID: "text-emerald-600",
  UNPAID: "text-amber-600",
  REFUNDED: "text-blue-600",
};

const stats = [
  {
    title: "Total Orders",
    value: "24",
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Processing",
    value: "03",
    icon: Clock3,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Shipped",
    value: "02",
    icon: Truck,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Delivered",
    value: "19",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function CustomerOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sort, setSort] = useState("newest");

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(search.toLowerCase()) ||
          order.products.some((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );

        const matchesStatus =
          status === "ALL" || order.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) =>
        sort === "newest"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [search, status, sort]);

  return (
    <div className="min-h-screen space-y-6 p-3 sm:p-5 lg:p-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/customer" className="hover:text-primary">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">My Orders</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Orders
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track, manage and review all your purchases.
          </p>
        </div>

        <Button  className="w-full gap-2 sm:w-auto">
          <Link href="/products">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title} className="transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex items-center gap-3 p-4 sm:p-5">
                <div className={`rounded-xl p-3 ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {item.title}
                  </p>
                  <h2 className="text-xl font-bold sm:text-2xl">
                    {item.value}
                  </h2>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Orders */}
      <Card className="overflow-hidden border shadow-sm">
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Order History</h2>
            <p className="text-sm text-muted-foreground">
              {filteredOrders.length} orders found
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search order or product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={status} onValueChange={(value)=>setStatus(value ??"ALL")}>
              <SelectTrigger className="w-full sm:w-40">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Orders</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(value)=>setSort(value ?? "newest")}>
              <SelectTrigger className="w-full sm:w-36">
                <CalendarDays className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-semibold text-primary">
                      #{order.id}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex min-w-48 items-center gap-2">
                      <div className="flex -space-x-3">
                        {order.products.slice(0, 2).map((product) => (
                          <img
                            key={product.name}
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg border-2 border-background object-cover"
                          />
                        ))}
                      </div>
                      <div>
                        <p className="max-w-36 truncate text-sm font-medium">
                          {order.products[0].name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.products.length} product(s)
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm">
                    {order.date}
                  </TableCell>

                  <TableCell className="font-semibold whitespace-nowrap">
                    ৳{order.total.toLocaleString("en-BD")}
                  </TableCell>

                  <TableCell>
                    <div>
                      <p className={`text-xs font-semibold ${paymentStyles[order.payment]}`}>
                        {order.payment}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusStyles[order.status]}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" >
                        <Link href={`/customer/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>

                      {order.status === "DELIVERED" && (
                        <Button size="icon" variant="ghost" title="Buy again">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}

                      <Button size="icon" variant="ghost" title="Download invoice">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <Package className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="font-medium">No orders found</p>
                    <p className="text-sm text-muted-foreground">
                      Try another search or filter.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 p-3 md:hidden">
          {filteredOrders.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No orders found.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="space-y-3 rounded-xl border p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-primary">
                    #{order.id}
                  </span>
                  <Badge
                    variant="outline"
                    className={statusStyles[order.status]}
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={order.products[0].image}
                    alt={order.products[0].name}
                    className="h-14 w-14 rounded-lg border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {order.products[0].name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.products.length} product(s) · {order.date}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="font-bold">
                      ৳{order.total.toLocaleString("en-BD")}
                    </p>
                  </div>

                  <Button size="sm" variant="outline" >
                    <Link href={`/customer/orders/${order.id}`}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <Separator />

        {/* Footer */}
        <div className="flex flex-col justify-between gap-3 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <span>
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
          <Button variant="outline" size="sm" >
            <Link href="/products">
              Explore Products
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
