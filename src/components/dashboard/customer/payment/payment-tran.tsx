
"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";

type Transaction = {
  id: string;
  orderId: string;
  product: string;
  date: string;
  method: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
};

const transactions: Transaction[] = [
  {
    id: "TXN-20261001",
    orderId: "#ORD-10245",
    product: "Wireless Headphones",
    date: "Nov 06, 2026",
    method: "Visa •••• 4242",
    amount: 2490,
    status: "Completed",
  },
  {
    id: "TXN-20261002",
    orderId: "#ORD-10246",
    product: "Smart Watch Pro",
    date: "Nov 05, 2026",
    method: "bKash •••• 5678",
    amount: 5490,
    status: "Pending",
  },
  {
    id: "TXN-20261003",
    orderId: "#ORD-10247",
    product: "Running Sneakers",
    date: "Nov 04, 2026",
    method: "Mastercard •••• 8831",
    amount: 3200,
    status: "Failed",
  },
  {
    id: "TXN-20261004",
    orderId: "#ORD-10248",
    product: "Bluetooth Speaker",
    date: "Nov 02, 2026",
    method: "Nagad •••• 1234",
    amount: 1850,
    status: "Refunded",
  },
  {
    id: "TXN-20261005",
    orderId: "#ORD-10249",
    product: "Mini Action Camera",
    date: "Oct 30, 2026",
    method: "Visa •••• 4242",
    amount: 2490,
    status: "Completed",
  },
];

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }: { status: Transaction["status"] }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-red-50 text-red-700 border-red-200",
    Refunded: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <Badge variant="outline" className={styles[status]}>
      {status === "Completed" && <CheckCircle2 className="mr-1 h-3 w-3" />}
      {status === "Pending" && <Clock3 className="mr-1 h-3 w-3" />}
      {status === "Failed" && <XCircle className="mr-1 h-3 w-3" />}
      {status === "Refunded" && <RefreshCcw className="mr-1 h-3 w-3" />}
      {status}
    </Badge>
  );
}

export default function CustomerPaymentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [selected, setSelected] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.id.toLowerCase().includes(search.toLowerCase()) ||
        transaction.orderId.toLowerCase().includes(search.toLowerCase()) ||
        transaction.product.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" || transaction.status === status;

      const matchesTab =
        activeTab === "all" ||
        transaction.status.toLowerCase() === activeTab;

      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [search, status, activeTab]);

  return (
    <div className="min-h-screen space-y-6 bg-muted/20 p-4 md:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            Customer Dashboard <span>/</span> Payments
          </div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Payments & Transactions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your payments, payment methods and transaction history.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button  variant="outline">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h2 className="mt-2 text-2xl font-bold">৳24,500</h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                12.5% this month
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Wallet className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Transactions</p>
              <h2 className="mt-2 text-2xl font-bold">48</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                All-time transactions
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CreditCard className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Refunded</p>
              <h2 className="mt-2 text-2xl font-bold">৳1,200</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                3 refunded orders
              </p>
            </div>
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <RefreshCcw className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <h2 className="mt-2 text-2xl font-bold">৳850</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Saved Payment Methods</CardTitle>
            <CardDescription className="mt-1">
              Manage your preferred payment options.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold italic text-blue-700">VISA</span>
                <Badge>Default</Badge>
              </div>
              <p className="mt-5 text-sm font-medium">•••• •••• •••• 4242</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Expires 12/28</span>
                <span>John Doe</span>
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-600">Mastercard</span>
                <Badge variant="outline">Card</Badge>
              </div>
              <p className="mt-5 text-sm font-medium">•••• •••• •••• 8831</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Expires 09/27</span>
                <span>John Doe</span>
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-600">bKash</span>
                <Badge variant="outline">Mobile Banking</Badge>
              </div>
              <p className="mt-5 text-sm font-medium">01XXX-XXX-5678</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Mobile wallet</span>
                <span>Verified</span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription className="mt-1">
                Track and manage all your payment activities.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              Date Range
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
            </TabsList>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transaction, order or product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={status} onValueChange={(value)=>setStatus(value ?? "all")}>
                <SelectTrigger className="w-full sm:w-[170px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Order / Product</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.id}
                        </TableCell>

                        <TableCell>
                          <p className="font-medium">{transaction.orderId}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.product}
                          </p>
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {transaction.date}
                        </TableCell>

                        <TableCell>{transaction.method}</TableCell>

                        <TableCell className="font-semibold">
                          {formatPrice(transaction.amount)}
                        </TableCell>

                        <TableCell>
                          <StatusBadge status={transaction.status} />
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger render={Button}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setSelected(transaction)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Invoice
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}

                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center">
                          <p className="font-medium">No transactions found</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Try changing your search or filters.
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="flex flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p>Showing {filteredTransactions.length} of {transactions.length} transactions</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-emerald-200 bg-emerald-50/40">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Your payments are secure</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your sensitive payment information should be protected by
              your payment provider. MOFHAF does not display full card details.
            </p>
          </div>
          <Badge className="w-fit bg-emerald-600">Secure Payments</Badge>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Review your payment information.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Payment Amount</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {formatPrice(selected.amount)}
                </h2>
                <div className="mt-2">
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              {[
                ["Transaction ID", selected.id],
                ["Order ID", selected.orderId],
                ["Product", selected.product],
                ["Payment Method", selected.method],
                ["Date", selected.date],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-right font-medium">{value}</span>
                </div>
              ))}

              <Separator />

              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
