
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Package,
  RotateCcw,
  Wallet,
  Clock,
  CheckCircle2,
  Truck,
  Search,
  Plus,
  Eye,
  X,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type ReturnStatus =
  | "REQUESTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "PICKUP_SCHEDULED"
  | "RECEIVED"
  | "REFUND_PROCESSING"
  | "REFUNDED"
  | "REJECTED";

type ReturnRequest = {
  id: string;
  orderId: string;
  product: string;
  image: string;
  amount: number;
  reason: string;
  type: "REFUND" | "EXCHANGE" | "REPLACEMENT";
  status: ReturnStatus;
  date: string;
  refundMethod: string;
};

const initialRequests: ReturnRequest[] = [
  {
    id: "RET-10024",
    orderId: "MFH-1024",
    product: "Wireless Bluetooth Headphones",
    image: "/products/headphone.jpg",
    amount: 2490,
    reason: "Defective product",
    type: "REFUND",
    status: "UNDER_REVIEW",
    date: "Nov 05, 2026",
    refundMethod: "Original Payment",
  },
  {
    id: "RET-10021",
    orderId: "MFH-1021",
    product: "Smart Watch Pro",
    image: "/products/watch.jpg",
    amount: 3200,
    reason: "Wrong product received",
    type: "EXCHANGE",
    status: "APPROVED",
    date: "Nov 02, 2026",
    refundMethod: "Bank Transfer",
  },
  {
    id: "RET-10018",
    orderId: "MFH-1018",
    product: "Premium Running Sneakers",
    image: "/products/shoes.jpg",
    amount: 1850,
    reason: "Product damaged",
    type: "REFUND",
    status: "REFUNDED",
    date: "Oct 28, 2026",
    refundMethod: "bKash",
  },
  {
    id: "RET-10015",
    orderId: "MFH-1015",
    product: "4K Mini Action Camera",
    image: "/products/camera.jpg",
    amount: 4910,
    reason: "Changed my mind",
    type: "REFUND",
    status: "REFUND_PROCESSING",
    date: "Oct 25, 2026",
    refundMethod: "Original Payment",
  },
];

const formatPrice = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

const statusConfig: Record<
  ReturnStatus,
  { label: string; className: string }
> = {
  REQUESTED: {
    label: "Requested",
    className: "bg-blue-100 text-blue-700",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    className: "bg-amber-100 text-amber-700",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
  },
  PICKUP_SCHEDULED: {
    label: "Pickup Scheduled",
    className: "bg-blue-100 text-blue-700",
  },
  RECEIVED: {
    label: "Product Received",
    className: "bg-purple-100 text-purple-700",
  },
  REFUND_PROCESSING: {
    label: "Refund Processing",
    className: "bg-amber-100 text-amber-700",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-green-100 text-green-700",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
  },
};

const initialEligibleOrders = [
  {
    id: "p1",
    orderId: "MFH-1032",
    product: "Foldable Mini Drone",
    image: "/products/drone.jpg",
    amount: 5490,
  },
  {
    id: "p2",
    orderId: "MFH-1034",
    product: "Wireless Gaming Mouse",
    image: "/products/mouse.jpg",
    amount: 1250,
  },
];

export default function ReturnsRefundsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [eligibleOrders, setEligibleOrders] =
    useState(initialEligibleOrders);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [reason, setReason] = useState("");
  const [requestType, setRequestType] = useState("REFUND");
  const [refundMethod, setRefundMethod] = useState("Original Payment");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [detailsRequest, setDetailsRequest] =
    useState<ReturnRequest | null>(null);

  const totalRefunded = requests
    .filter((r) => r.status === "REFUNDED")
    .reduce((sum, r) => sum + r.amount, 0);

  const processingCount = requests.filter((r) =>
    ["REQUESTED", "UNDER_REVIEW", "APPROVED",
      "PICKUP_SCHEDULED", "RECEIVED", "REFUND_PROCESSING"].includes(r.status)
  ).length;

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.product.toLowerCase().includes(search.toLowerCase()) ||
        request.orderId.toLowerCase().includes(search.toLowerCase()) ||
        request.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filter === "ALL" || request.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, filter]);

  const resetForm = () => {
    setSelectedOrder("");
    setReason("");
    setRequestType("REFUND");
    setRefundMethod("Original Payment");
    setDescription("");
  };

  const submitRequest = () => {
    if (!selectedOrder || !reason || !description.trim()) {
      toast.error("Please complete all required fields");
      return;
    }

    const product = eligibleOrders.find(
      (order) => order.id === selectedOrder
    );

    if (!product) return;

    const newRequest: ReturnRequest = {
      id: `RET-${Date.now().toString().slice(-6)}`,
      orderId: product.orderId,
      product: product.product,
      image: product.image,
      amount: product.amount,
      reason,
      type: requestType as ReturnRequest["type"],
      status: "REQUESTED",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      refundMethod,
    };

    setRequests((previous) => [newRequest, ...previous]);
    setEligibleOrders((previous) =>
      previous.filter((order) => order.id !== selectedOrder)
    );

    setOpen(false);
    resetForm();
    toast.success("Return request submitted successfully!");
  };

  const cancelRequest = (id: string) => {
    const request = requests.find((item) => item.id === id);

    if (!request || !["REQUESTED", "UNDER_REVIEW"].includes(request.status)) {
      toast.error("This request can no longer be cancelled.");
      return;
    }

    if (!window.confirm("Do you want to cancel this return request?")) {
      return;
    }

    setRequests((previous) =>
      previous.filter((item) => item.id !== id)
    );

    toast.success("Return request cancelled");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-3 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">
              Returns & Refunds
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Returns & Refunds
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your return requests and track your refunds.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger >
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Request Return
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-[540px]">
            <DialogHeader>
              <DialogTitle>Request a Return or Refund</DialogTitle>
              <DialogDescription>
                Select an eligible order and provide the return details.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3">

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Select Product *
                </label>

                <Select
                  value={selectedOrder}
                  onValueChange={(value)=> setSelectedOrder(value ?? "")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a delivered product" />
                  </SelectTrigger>
                  <SelectContent>
                    {eligibleOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>
                        {order.product} ({order.orderId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Request Type *
                </label>

                <Select
                  value={requestType}
                  onValueChange={(value)=>setRequestType(value ?? "REFUND")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REFUND">Refund</SelectItem>
                    <SelectItem value="EXCHANGE">Exchange</SelectItem>
                    <SelectItem value="REPLACEMENT">Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reason for Return *
                </label>

                <Select value={reason} onValueChange={(value)=>setReason(value ?? "Select a reason")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Defective product">
                      Defective product
                    </SelectItem>
                    <SelectItem value="Product damaged">
                      Product damaged
                    </SelectItem>
                    <SelectItem value="Wrong product received">
                      Wrong product received
                    </SelectItem>
                    <SelectItem value="Missing accessories">
                      Missing accessories
                    </SelectItem>
                    <SelectItem value="Not as described">
                      Not as described
                    </SelectItem>
                    <SelectItem value="Changed my mind">
                      Changed my mind
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {requestType === "REFUND" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Preferred Refund Method
                  </label>

                  <Select
                    value={refundMethod}
                    onValueChange={(value)=>setRefundMethod(value ?? "Original Payment")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Original Payment">
                        Original Payment Method
                      </SelectItem>
                      <SelectItem value="bKash">bKash</SelectItem>
                      <SelectItem value="Nagad">Nagad</SelectItem>
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Additional Details *
                </label>

                <Textarea
                  placeholder="Explain why you want to return this product..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={1000}
                />

                <p className="text-right text-xs text-muted-foreground">
                  {description.length}/1000
                </p>
              </div>

              <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                Please ensure the product meets MOFHAF's return policy.
                Our team will review your request.
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={submitRequest}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={requests.length}
          icon={<Package />}
          description="All return requests"
        />

        <StatCard
          title="Processing"
          value={processingCount}
          icon={<Clock />}
          description="Currently in progress"
        />

        <StatCard
          title="Refunded"
          value={requests.filter((r) => r.status === "REFUNDED").length}
          icon={<CheckCircle2 />}
          description="Successfully completed"
        />

        <StatCard
          title="Total Refunded"
          value={formatPrice(totalRefunded)}
          icon={<Wallet />}
          description="Completed refund amount"
        />
      </div>

      {/* Return Policy */}
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">MOFHAF Return Policy</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Check eligibility, return deadlines, and refund conditions.
              </p>
            </div>
          </div>

          <Button variant="outline" >
            <Link href="/return-policy">
              View Policy <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Eligible Orders */}
      {eligibleOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              Eligible Products
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              These demo orders are available for return requests.
            </p>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            {eligibleOrders.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={product.image}
                    alt={product.product}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold">
                    {product.product}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {product.orderId}
                  </p>
                  <p className="mt-1 font-semibold">
                    {formatPrice(product.amount)}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedOrder(product.id);
                    setOpen(true);
                  }}
                >
                  Return
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Request History */}
      <Card>
        <CardHeader className="space-y-4">
          <div>
            <CardTitle>Return Request History</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Track and manage all your return and refund requests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search product, order or return ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={filter} onValueChange={(value)=> setFilter(value ?? "ALL  ")}>
              <SelectTrigger className="w-full sm:w-[190px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Requests</SelectItem>
                {Object.entries(statusConfig).map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="py-12 text-center">
              <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold">No requests found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={request.image}
                    alt={request.product}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{request.product}</h3>
                    <Badge
                      className={
                        statusConfig[request.status].className
                      }
                    >
                      {statusConfig[request.status].label}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {request.id} · Order #{request.orderId}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {request.reason} · {request.type}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Requested: {request.date}
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className="font-bold">
                    {formatPrice(request.amount)}
                  </span>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDetailsRequest(request)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Details
                    </Button>

                    {["REQUESTED", "UNDER_REVIEW"].includes(
                      request.status
                    ) && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => cancelRequest(request.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog
        open={!!detailsRequest}
        onOpenChange={(value) => {
          if (!value) setDetailsRequest(null);
        }}
      >
        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
          {detailsRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Return Request Details</DialogTitle>
                <DialogDescription>
                  Track your return and refund information.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={detailsRequest.image}
                      alt={detailsRequest.product}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {detailsRequest.product}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {detailsRequest.id}
                    </p>
                    <Badge
                      className={statusConfig[detailsRequest.status].className}
                    >
                      {statusConfig[detailsRequest.status].label}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <DetailRow label="Order ID" value={detailsRequest.orderId} />
                <DetailRow label="Return reason" value={detailsRequest.reason} />
                <DetailRow label="Request type" value={detailsRequest.type} />
                <DetailRow
                  label="Refund amount"
                  value={formatPrice(detailsRequest.amount)}
                />
                <DetailRow
                  label="Refund method"
                  value={detailsRequest.refundMethod}
                />
                <DetailRow label="Request date" value={detailsRequest.date} />

                <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <MessageCircle className="mb-2 h-5 w-5 text-primary" />
                  For help with this request, contact MOFHAF customer support.
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDetailsRequest(null)}
                >
                  Close
                </Button>
                <Button >
                  <Link href="/dashboard/support">
                    Contact Support
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer Information */}
      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard
          icon={<ShieldCheck />}
          title="Secure Returns"
          description="Your return requests are handled securely."
        />
        <InfoCard
          icon={<Truck />}
          title="Easy Pickup"
          description="Convenient return pickup for eligible products."
        />
        <InfoCard
          icon={<Wallet />}
          title="Refund Tracking"
          description="Keep track of your refund progress."
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex items-center justify-between gap-3 p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex gap-3 p-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
