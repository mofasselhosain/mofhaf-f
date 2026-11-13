
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  MoreHorizontal,
  Download,
  MapPin,
  CalendarDays,
  CreditCard,
  User,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  RefreshCw,
  Receipt,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

// ------------------------------------------
// TYPES
// ------------------------------------------

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "REFUNDED";

type PaymentStatus =
  | "PAID"
  | "PENDING"
  | "FAILED"
  | "REFUNDED";

interface IOrder {
  id: string;
  orderNumber: string;

  customer: {
    name: string;
    email: string;
    phone: string;
  };

  items: {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];

  subtotal: number;
  shippingFee: number;
  total: number;

  paymentMethod: string;
  paymentStatus: PaymentStatus;

  status: OrderStatus;
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: string;
}

// ------------------------------------------
// DEMO DATA
// ------------------------------------------

const initialOrders: IOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2026-1001",
    customer: {
      name: "Rahim Ahmed",
      email: "rahim@gmail.com",
      phone: "+880 1712-345678",
    },
    items: [
      {
        id: "p1",
        name: "Wireless Bluetooth Headphones",
        image: "🎧",
        quantity: 2,
        price: 2490,
      },
      {
        id: "p2",
        name: "Smart Watch",
        image: "⌚",
        quantity: 1,
        price: 3990,
      },
    ],
    subtotal: 8970,
    shippingFee: 100,
    total: 9070,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "PENDING",
    status: "PENDING",
    shippingAddress: "House 12, Road 5, Mirpur, Dhaka, Bangladesh",
    createdAt: "2026-11-08T10:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-2026-1002",
    customer: {
      name: "Sadia Islam",
      email: "sadia@gmail.com",
      phone: "+880 1812-345678",
    },
    items: [
      {
        id: "p3",
        name: "Premium Smart Watch",
        image: "⌚",
        quantity: 1,
        price: 3990,
      },
    ],
    subtotal: 3990,
    shippingFee: 100,
    total: 4090,
    paymentMethod: "bKash",
    paymentStatus: "PAID",
    status: "PROCESSING",
    shippingAddress: "Dhanmondi 27, Dhaka, Bangladesh",
    createdAt: "2026-11-07T15:20:00",
  },
  {
    id: "3",
    orderNumber: "ORD-2026-1003",
    customer: {
      name: "Karim Hasan",
      email: "karim@gmail.com",
      phone: "+880 1912-345678",
    },
    items: [
      {
        id: "p4",
        name: "Foldable Mini Drone",
        image: "🚁",
        quantity: 1,
        price: 5490,
      },
    ],
    subtotal: 5490,
    shippingFee: 120,
    total: 5610,
    paymentMethod: "Nagad",
    paymentStatus: "PAID",
    status: "SHIPPED",
    shippingAddress: "Agrabad, Chattogram, Bangladesh",
    trackingNumber: "MHF-TRK-1003",
    createdAt: "2026-11-06T11:45:00",
  },
  {
    id: "4",
    orderNumber: "ORD-2026-1004",
    customer: {
      name: "Nusrat Jahan",
      email: "nusrat@gmail.com",
      phone: "+880 1612-345678",
    },
    items: [
      {
        id: "p5",
        name: "4K Mini Action Camera",
        image: "📷",
        quantity: 1,
        price: 2490,
      },
    ],
    subtotal: 2490,
    shippingFee: 100,
    total: 2590,
    paymentMethod: "Card Payment",
    paymentStatus: "PAID",
    status: "DELIVERED",
    shippingAddress: "Uttara Sector 7, Dhaka, Bangladesh",
    trackingNumber: "MHF-TRK-1004",
    createdAt: "2026-11-05T09:10:00",
  },
  {
    id: "5",
    orderNumber: "ORD-2026-1005",
    customer: {
      name: "Sakib Hossain",
      email: "sakib@gmail.com",
      phone: "+880 1715-123456",
    },
    items: [
      {
        id: "p6",
        name: "Gaming Keyboard",
        image: "⌨️",
        quantity: 1,
        price: 1850,
      },
    ],
    subtotal: 1850,
    shippingFee: 100,
    total: 1950,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "PENDING",
    status: "CONFIRMED",
    shippingAddress: "Rajshahi City, Bangladesh",
    createdAt: "2026-11-04T14:00:00",
  },
  {
    id: "6",
    orderNumber: "ORD-2026-1006",
    customer: {
      name: "Mim Akter",
      email: "mim@gmail.com",
      phone: "+880 1815-123456",
    },
    items: [
      {
        id: "p7",
        name: "Wireless Mouse",
        image: "🖱️",
        quantity: 2,
        price: 850,
      },
    ],
    subtotal: 1700,
    shippingFee: 100,
    total: 1800,
    paymentMethod: "Rocket",
    paymentStatus: "FAILED",
    status: "CANCELLED",
    shippingAddress: "Cumilla, Bangladesh",
    createdAt: "2026-11-03T12:00:00",
  },
];

// ------------------------------------------
// HELPERS
// ------------------------------------------

const currency = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  SHIPPED: "bg-violet-50 text-violet-700 border-violet-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  RETURNED: "bg-orange-50 text-orange-700 border-orange-200",
  REFUNDED: "bg-gray-100 text-gray-700 border-gray-200",
};

const paymentStyles: Record<PaymentStatus, string> = {
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  FAILED: "bg-red-50 text-red-700 border-red-200",
  REFUNDED: "bg-gray-100 text-gray-700 border-gray-200",
};

// ------------------------------------------
// MAIN PAGE
// ------------------------------------------

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>(initialOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ----------------------------------------
  // FILTER ORDERS
  // ----------------------------------------

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "ALL" || order.status === statusFilter;

      const paymentMatch =
        paymentFilter === "ALL" ||
        order.paymentStatus === paymentFilter;

      return searchMatch && statusMatch && paymentMatch;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / pageSize)
  );

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // ----------------------------------------
  // STATISTICS
  // ----------------------------------------

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      description: "All customer orders",
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Orders",
      value: orders.filter((o) => o.status === "PENDING").length,
      icon: Clock,
      description: "Waiting for confirmation",
      iconClass: "bg-amber-50 text-amber-600",
    },
    {
      title: "Processing",
      value: orders.filter((o) => o.status === "PROCESSING").length,
      icon: Package,
      description: "Being prepared",
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Shipped",
      value: orders.filter((o) => o.status === "SHIPPED").length,
      icon: Truck,
      description: "On the way",
      iconClass: "bg-violet-50 text-violet-600",
    },
    {
      title: "Delivered",
      value: orders.filter((o) => o.status === "DELIVERED").length,
      icon: CheckCircle2,
      description: "Successfully delivered",
      iconClass: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Cancelled",
      value: orders.filter((o) => o.status === "CANCELLED").length,
      icon: XCircle,
      description: "Cancelled orders",
      iconClass: "bg-red-50 text-red-600",
    },
  ];

  // ----------------------------------------
  // UPDATE ORDER STATUS
  // ----------------------------------------

  const updateStatus = (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    setSelectedOrder((prev) =>
      prev?.id === orderId
        ? { ...prev, status: newStatus }
        : prev
    );
  };

  // ----------------------------------------
  // RESET FILTERS
  // ----------------------------------------

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setPaymentFilter("ALL");
    setPage(1);
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50/50 p-4 md:p-6 lg:p-8">

      {/* PAGE HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Provider Dashboard</span>
            <span>/</span>
            <span className="text-foreground">Orders</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Orders Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage customer orders, payments and deliveries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          <Button
            variant="outline"
            onClick={resetFilters}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>

          <Button
            className="gap-2 bg-slate-900 hover:bg-slate-800"
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4" />
            Export / Print
          </Button>

        </div>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="border-slate-200 shadow-sm">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </h3>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  {stat.description}
                </p>

              </CardContent>
            </Card>
          );
        })}

      </div>

      {/* ORDER TABLE CARD */}

      <Card className="overflow-hidden border-slate-200 shadow-sm">

        <CardHeader className="space-y-4 pb-4">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <CardTitle className="text-lg">
                Customer Orders
              </CardTitle>

              <CardDescription className="mt-1">
                View and manage all orders placed by customers.
              </CardDescription>
            </div>

            <Badge variant="secondary" className="w-fit">
              {filteredOrders.length} Orders Found
            </Badge>

          </div>

          <Separator />

          {/* FILTERS */}

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search order ID, customer name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value ?? "ALL");
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[175px]">
                  <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="RETURNED">Returned</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={paymentFilter}
                onValueChange={(value) => {
                  setPaymentFilter(value ?? "ALL");
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Payments</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>

            </div>

          </div>

        </CardHeader>

        {/* TABLE */}

        <CardContent className="p-0">

          <div className="w-full overflow-x-auto">

            <Table>

              <TableHeader className="bg-slate-50">

                <TableRow>

                  <TableHead className="min-w-[165px] pl-6">
                    Order ID
                  </TableHead>

                  <TableHead className="min-w-[180px]">
                    Customer
                  </TableHead>

                  <TableHead className="min-w-[150px]">
                    Products
                  </TableHead>

                  <TableHead className="min-w-[110px]">
                    Total Amount
                  </TableHead>

                  <TableHead className="min-w-[125px]">
                    Payment
                  </TableHead>

                  <TableHead className="min-w-[125px]">
                    Order Status
                  </TableHead>

                  <TableHead className="min-w-[110px]">
                    Date
                  </TableHead>

                  <TableHead className="pr-6 text-right">
                    Action
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {paginatedOrders.length > 0 ? (

                  paginatedOrders.map((order) => (

                    <TableRow key={order.id} className="hover:bg-slate-50/70">

                      {/* ORDER ID */}

                      <TableCell className="pl-6">

                        <p className="font-semibold text-slate-800">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {order.items.length} Product(s)
                        </p>

                      </TableCell>

                      {/* CUSTOMER */}

                      <TableCell>

                        <div className="flex items-center gap-2.5">

                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-indigo-100 text-xs font-semibold text-indigo-700">
                              {order.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-medium text-slate-800">
                              {order.customer.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {order.customer.email}
                            </p>
                          </div>

                        </div>

                      </TableCell>

                      {/* PRODUCTS */}

                      <TableCell>

                        <div className="flex items-center gap-2">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg">
                            {order.items[0]?.image}
                          </div>

                          <div>
                            <p className="max-w-[140px] truncate text-sm font-medium">
                              {order.items[0]?.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {order.items.length > 1
                                ? `+${order.items.length - 1} more`
                                : `Qty: ${order.items[0]?.quantity}`}
                            </p>
                          </div>

                        </div>

                      </TableCell>

                      {/* AMOUNT */}

                      <TableCell>
                        <span className="font-semibold text-slate-900">
                          {currency(order.total)}
                        </span>
                      </TableCell>

                      {/* PAYMENT */}

                      <TableCell>

                        <Badge
                          variant="outline"
                          className={paymentStyles[order.paymentStatus]}
                        >
                          {order.paymentStatus}
                        </Badge>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {order.paymentMethod}
                        </p>

                      </TableCell>

                      {/* STATUS */}

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusStyles[order.status]}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>

                      {/* DATE */}

                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </TableCell>

                      {/* ACTIONS */}

                      <TableCell className="pr-6 text-right">

                        <div className="flex items-center justify-end gap-1">

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                            title="View order"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <DropdownMenu>

                            <DropdownMenuTrigger >
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">

                              <DropdownMenuLabel>
                                Update Order
                              </DropdownMenuLabel>

                              <DropdownMenuSeparator />

                              {(
                                [
                                  "CONFIRMED",
                                  "PROCESSING",
                                  "SHIPPED",
                                  "DELIVERED",
                                  "CANCELLED",
                                ] as OrderStatus[]
                              ).map((status) => (

                                <DropdownMenuItem
                                  key={status}
                                  onClick={() =>
                                    updateStatus(order.id, status)
                                  }
                                  disabled={order.status === status}
                                >
                                  {status}
                                </DropdownMenuItem>

                              ))}

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>

                            </DropdownMenuContent>

                          </DropdownMenu>

                        </div>

                      </TableCell>

                    </TableRow>

                  ))

                ) : (

                  <TableRow>
                    <TableCell colSpan={8} className="h-40 text-center">

                      <div className="flex flex-col items-center justify-center gap-2">

                        <ShoppingBag className="h-9 w-9 text-muted-foreground/50" />

                        <p className="font-medium text-slate-700">
                          No orders found
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Try changing your search or filters.
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetFilters}
                        >
                          Clear Filters
                        </Button>

                      </div>

                    </TableCell>
                  </TableRow>

                )}

              </TableBody>

            </Table>

          </div>

          {/* PAGINATION */}

          <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-muted-foreground">
              Showing{" "}
              {filteredOrders.length === 0
                ? 0
                : (page - 1) * pageSize + 1}
              {" "}to{" "}
              {Math.min(page * pageSize, filteredOrders.length)}
              {" "}of {filteredOrders.length} orders
            </p>

            <div className="flex items-center gap-2">

              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              <span className="text-sm font-medium">
                {page} / {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

            </div>

          </div>

        </CardContent>

      </Card>

      {/* ORDER DETAILS DIALOG */}

      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      >

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">

          {selectedOrder && (

            <>

              <DialogHeader>

                <div className="flex flex-wrap items-center justify-between gap-2 pr-5">

                  <div>
                    <DialogTitle className="text-xl">
                      Order Details
                    </DialogTitle>

                    <DialogDescription className="mt-1">
                      {selectedOrder.orderNumber}
                    </DialogDescription>
                  </div>

                  <Badge
                    variant="outline"
                    className={statusStyles[selectedOrder.status]}
                  >
                    {selectedOrder.status}
                  </Badge>

                </div>

              </DialogHeader>

              <div className="space-y-5">

                {/* ORDER INFO */}

                <div className="grid grid-cols-1 gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Order Date
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Order Number
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {selectedOrder.orderNumber}
                    </p>
                  </div>

                </div>

                {/* CUSTOMER INFORMATION */}

                <div className="space-y-3">

                  <h3 className="flex items-center gap-2 font-semibold">
                    <User className="h-4 w-4" />
                    Customer Information
                  </h3>

                  <div className="space-y-3 rounded-xl border p-4">

                    <div className="flex items-center gap-3">

                      <Avatar className="h-11 w-11">
                        <AvatarFallback className="bg-indigo-100 font-semibold text-indigo-700">
                          {selectedOrder.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-semibold">
                          {selectedOrder.customer.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Customer
                        </p>
                      </div>

                    </div>

                    <Separator />

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {selectedOrder.customer.email}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {selectedOrder.customer.phone}
                    </div>

                  </div>

                </div>

                {/* PRODUCT INFORMATION */}

                <div className="space-y-3">

                  <h3 className="flex items-center gap-2 font-semibold">
                    <Package className="h-4 w-4" />
                    Ordered Products
                  </h3>

                  <div className="space-y-3 rounded-xl border p-4">

                    {selectedOrder.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3"
                      >

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-2xl">
                            {item.image}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {item.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>

                        </div>

                        <p className="shrink-0 text-sm font-semibold">
                          {currency(item.price * item.quantity)}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

                {/* SHIPPING INFORMATION */}

                <div className="space-y-3">

                  <h3 className="flex items-center gap-2 font-semibold">
                    <MapPin className="h-4 w-4" />
                    Shipping Address
                  </h3>

                  <div className="rounded-xl border p-4">

                    <p className="text-sm leading-6 text-muted-foreground">
                      {selectedOrder.shippingAddress}
                    </p>

                    {selectedOrder.trackingNumber && (
                      <div className="mt-3 border-t pt-3">
                        <p className="text-xs text-muted-foreground">
                          Tracking Number
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {selectedOrder.trackingNumber}
                        </p>
                      </div>
                    )}

                  </div>

                </div>

                {/* PAYMENT INFORMATION */}

                <div className="space-y-3">

                  <h3 className="flex items-center gap-2 font-semibold">
                    <CreditCard className="h-4 w-4" />
                    Payment Summary
                  </h3>

                  <div className="space-y-3 rounded-xl border p-4">

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal
                      </span>
                      <span>{currency(selectedOrder.subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Shipping Fee
                      </span>
                      <span>{currency(selectedOrder.shippingFee)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <span className="font-semibold">
                        Total Amount
                      </span>
                      <span className="text-lg font-bold">
                        {currency(selectedOrder.total)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">

                      <span className="text-sm text-muted-foreground">
                        Payment Method
                      </span>

                      <span className="text-sm font-medium">
                        {selectedOrder.paymentMethod}
                      </span>

                    </div>

                    <div className="flex items-center justify-between">

                      <span className="text-sm text-muted-foreground">
                        Payment Status
                      </span>

                      <Badge
                        variant="outline"
                        className={paymentStyles[selectedOrder.paymentStatus]}
                      >
                        {selectedOrder.paymentStatus}
                      </Badge>

                    </div>

                  </div>

                </div>

                {/* UPDATE STATUS */}

                <div className="space-y-3">

                  <h3 className="font-semibold">
                    Update Order Status
                  </h3>

                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) =>
                      updateStatus(
                        selectedOrder.id,
                        value as OrderStatus
                      )
                    }
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                      <SelectItem value="PROCESSING">Processing</SelectItem>
                      <SelectItem value="SHIPPED">Shipped</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      <SelectItem value="RETURNED">Returned</SelectItem>
                      <SelectItem value="REFUNDED">Refunded</SelectItem>
                    </SelectContent>

                  </Select>

                  <p className="text-xs text-muted-foreground">
                    Demo only: status changes are currently stored in local React state.
                  </p>

                </div>

                {/* FOOTER */}

                <Separator />

                <div className="flex flex-wrap justify-end gap-2">

                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </Button>

                  <Button
                    onClick={() => window.print()}
                    className="gap-2 bg-slate-900 hover:bg-slate-800"
                  >
                    <Receipt className="h-4 w-4" />
                    Print Invoice
                  </Button>

                </div>

              </div>

            </>

          )}

        </DialogContent>

      </Dialog>

    </div>
  );
}
