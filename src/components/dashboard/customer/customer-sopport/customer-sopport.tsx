
"use client";

import { useMemo, useState } from "react";
import {
  Headphones,
  MessageCircle,
  Package,
  RefreshCcw,
  CreditCard,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  ArrowUpRight,
  ChevronRight,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  Send,
  LifeBuoy,
} from "lucide-react";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    title: "Order & Delivery",
    description: "Track orders and delivery problems.",
    icon: Package,
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    title: "Returns & Refunds",
    description: "Request returns and track refunds.",
    icon: RefreshCcw,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    title: "Payment Issues",
    description: "Payment failures and transaction issues.",
    icon: CreditCard,
    color: "text-orange-600 bg-orange-500/10",
  },
  {
    title: "Product Support",
    description: "Damaged products and warranty support.",
    icon: ShoppingBag,
    color: "text-purple-600 bg-purple-500/10",
  },
];

type Ticket = {
  id: string;
  subject: string;
  category: string;
  date: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
};

const initialTickets: Ticket[] = [
  {
    id: "TKT-1024",
    subject: "My order has not arrived",
    category: "Order & Delivery",
    date: "Nov 07, 2026",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "TKT-1023",
    subject: "Request for product replacement",
    category: "Product Support",
    date: "Nov 06, 2026",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "TKT-1022",
    subject: "Refund status inquiry",
    category: "Returns & Refunds",
    date: "Nov 04, 2026",
    status: "Resolved",
    priority: "Low",
  },
];

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Go to My Orders, select your order and click Track Order to see the latest delivery status.",
  },
  {
    question: "How long does a refund take?",
    answer:
      "Refund processing time depends on the payment method and your bank. You can check the status from your Returns & Refunds page.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "You can request cancellation from My Orders while the order is still eligible for cancellation.",
  },
  {
    question: "What should I do if my product is damaged?",
    answer:
      "Create a Product Support ticket and provide your order ID, product details and photos of the damaged item.",
  },
];

export default function CustomerSupportPage() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    category: "",
    orderId: "",
    priority: "Medium",
    message: "",
  });

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || ticket.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tickets, search, filter]);

  const stats = [
    {
      title: "Total Tickets",
      value: tickets.length,
      icon: FileText,
      color: "text-blue-600 bg-blue-500/10",
    },
    {
      title: "Open Tickets",
      value: tickets.filter((t) => t.status === "Open").length,
      icon: Clock,
      color: "text-orange-600 bg-orange-500/10",
    },
    {
      title: "In Progress",
      value: tickets.filter((t) => t.status === "In Progress").length,
      icon: AlertCircle,
      color: "text-purple-600 bg-purple-500/10",
    },
    {
      title: "Resolved",
      value: tickets.filter((t) => t.status === "Resolved").length,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-500/10",
    },
  ];

  const createTicket = () => {
    if (!form.subject || !form.category || !form.message) {
      toast.error("Please complete all required fields.");
      return;
    }

    const newTicket: Ticket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: form.subject,
      category: form.category,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      status: "Open",
      priority: form.priority as Ticket["priority"],
    };

    setTickets((prev) => [newTicket, ...prev]);
    setForm({
      subject: "",
      category: "",
      orderId: "",
      priority: "Medium",
      message: "",
    });

    setOpen(false);
    toast.success("Support ticket created successfully!");
  };

  const statusStyle = (status: Ticket["status"]) => {
    switch (status) {
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "In Progress":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      default:
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    }
  };

  return (
    <div className="min-h-screen space-y-7 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <ChevronRight className="size-3" />
            <span className="text-primary">Customer Support</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Customer Support
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We are here to help you with orders, payments and products.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Support Ticket
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>Create a Support Ticket</DialogTitle>
              <DialogDescription>
                Tell us about your problem. Our support team will help you.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject *</label>
                <Input
                  placeholder="Enter your issue title"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value ?? ""})
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select support category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.title}
                        value={category.title}
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Order ID</label>
                <Input
                  placeholder="e.g. ORD-1024"
                  value={form.orderId}
                  onChange={(e) =>
                    setForm({ ...form, orderId: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={form.priority}
                  onValueChange={(value) =>
                    setForm({ ...form, priority: value ??"" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Describe your problem in detail..."
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>

              <Button className="w-full gap-2" onClick={createTicket}>
                <Send className="size-4" />
                Submit Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Welcome Banner */}
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-violet-700 via-indigo-600 to-blue-600 text-white">
        <CardContent className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-3">
            <Badge className="border-white/20 bg-white/15 text-white">
              MOFHAF CUSTOMER CARE
            </Badge>
            <h2 className="text-2xl font-bold sm:text-3xl">
              How can we help you today?
            </h2>
            <p className="max-w-lg text-sm text-white/80">
              Get quick answers, track your support requests and enjoy a
              smooth shopping experience.
            </p>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={() => setOpen(true)}
            >
              <MessageCircle className="size-4" />
              Get Help Now
            </Button>
          </div>

          <Headphones className="hidden size-28 text-white/20 sm:block" />
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4 sm:p-5">
              <div className={`rounded-xl p-3 ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Categories */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">How can we assist you?</h2>
          <p className="text-sm text-muted-foreground">
            Choose a topic to find the right support.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
              onClick={() => {
                setForm((prev) => ({
                  ...prev,
                  category: category.title,
                }));
                setOpen(true);
              }}
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${category.color}`}>
                    <category.icon className="size-6" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>

                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tickets */}
      <Card>
        <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>My Support Tickets</CardTitle>
            <CardDescription>
              Manage and track your recent support requests.
            </CardDescription>
          </div>

          <Badge variant="secondary">
            {tickets.length} Total Tickets
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search ticket ID or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={filter} onValueChange={(value)=>setFilter(value?? "All")}>
              <SelectTrigger className="w-full sm:w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Tickets</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredTickets.length === 0 ? (
              <div className="py-12 text-center">
                <LifeBuoy className="mx-auto mb-3 size-10 text-muted-foreground" />
                <p className="font-medium">No tickets found</p>
                <p className="text-sm text-muted-foreground">
                  Try another search or create a support ticket.
                </p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-primary">
                        {ticket.id}
                      </span>
                      <Badge
                        variant="outline"
                        className={statusStyle(ticket.status)}
                      >
                        {ticket.status}
                      </Badge>
                    </div>

                    <h3 className="font-semibold">{ticket.subject}</h3>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>{ticket.date}</span>
                      <span>•</span>
                      <span>Priority: {ticket.priority}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="gap-2">
                    View Details
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">Need more assistance?</h2>
          <p className="text-sm text-muted-foreground">
            Our customer care team is ready to help.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs text-muted-foreground">
                  Chat with our support team
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
                <Mail className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-xs text-muted-foreground">
                  support@mofhaf.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600">
                <Phone className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-xs text-muted-foreground">
                  Contact customer care
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find quick answers to common shopping questions.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group border-b pb-4 last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium">
                {faq.question}
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </CardContent>
      </Card>

      {/* Footer Security */}
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-muted/30 p-5 text-center sm:flex-row">
        <ShieldCheck className="size-5 text-emerald-600" />
        <p className="text-xs text-muted-foreground">
          Your privacy and security matter to us. MOFHAF customer support
          is committed to providing a safe shopping experience.
        </p>
      </div>
    </div>
  );
}
