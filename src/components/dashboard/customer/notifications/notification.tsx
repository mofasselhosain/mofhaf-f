
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  PackageCheck,
 
  CreditCard,
  Truck,
  TicketPercent,
  Wallet,
  ShieldCheck,
  Heart,
  Star,
  MessageCircle,
  CheckCheck,
  Trash2,
  Search,
  MoreHorizontal,
  ExternalLink,
  Settings,
  Check,
  MailOpen,
  X,
  BellRing,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotificationCategory =
  | "ORDER"
  | "PAYMENT"
  | "DELIVERY"
  | "PROMOTION"
  | "REFUND"
  | "ACCOUNT"
  | "REVIEW"
  | "WISHLIST"
  | "SUPPORT";

type Notification = {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  date: string;
  read: boolean;
  href: string;
  reference?: string;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Order Delivered Successfully",
    description:
      "Your order #MFH-1024 has been delivered successfully. Thank you for shopping with MOFHAF! We hope you enjoy your purchase.",
    category: "ORDER",
    date: "5 minutes ago",
    read: false,
    href: "/dashboard/orders",
    reference: "MFH-1024",
  },
  {
    id: "2",
    title: "Payment Successful",
    description:
      "Your payment of ৳2,490 has been successfully received. Your transaction is confirmed.",
    category: "PAYMENT",
    date: "1 hour ago",
    read: false,
    href: "/dashboard/payments",
    reference: "PAY-1024",
  },
  {
    id: "3",
    title: "Special Shopping Offer",
    description:
      "Enjoy 15% off selected electronics products this week. Shop now and save more with MOFHAF.",
    category: "PROMOTION",
    date: "3 hours ago",
    read: false,
    href: "/products",
    reference: "MOFHAF15",
  },
  {
    id: "4",
    title: "Refund Processing",
    description:
      "Your refund request #RET-10024 is currently being processed. We will notify you when it is completed.",
    category: "REFUND",
    date: "Yesterday",
    read: false,
    href: "/dashboard/returns",
    reference: "RET-10024",
  },
  {
    id: "5",
    title: "Your Package Is On The Way",
    description:
      "Your order #MFH-1028 has been shipped and is on its way to your delivery address.",
    category: "DELIVERY",
    date: "Yesterday",
    read: true,
    href: "/dashboard/orders",
    reference: "MFH-1028",
  },
  {
    id: "6",
    title: "Wishlist Price Drop",
    description:
      "Good news! One of your favorite wishlist products is now available at a lower price.",
    category: "WISHLIST",
    date: "2 days ago",
    read: true,
    href: "/dashboard/wishlist",
  },
  {
    id: "7",
    title: "Review Published",
    description:
      "Your review for Wireless Bluetooth Headphones has been successfully published.",
    category: "REVIEW",
    date: "3 days ago",
    read: true,
    href: "/dashboard/reviews",
  },
  {
    id: "8",
    title: "Password Changed Successfully",
    description:
      "Your account password was successfully updated. If this wasn't you, contact our support team immediately.",
    category: "ACCOUNT",
    date: "4 days ago",
    read: true,
    href: "/dashboard/settings",
  },
  {
    id: "9",
    title: "Support Ticket Updated",
    description:
      "Our support team has replied to your ticket. Please check your support dashboard.",
    category: "SUPPORT",
    date: "5 days ago",
    read: true,
    href: "/dashboard/support",
    reference: "TICKET-1001",
  },
];

const categoryConfig: Record<
  NotificationCategory,
  {
    label: string;
    icon: typeof Bell;
    color: string;
    background: string;
  }
> = {
  ORDER: {
    label: "Orders",
    icon: PackageCheck,
    color: "text-green-600",
    background: "bg-green-500/10",
  },
  PAYMENT: {
    label: "Payments",
    icon: CreditCard,
    color: "text-blue-600",
    background: "bg-blue-500/10",
  },
  DELIVERY: {
    label: "Delivery",
    icon: Truck,
    color: "text-indigo-600",
    background: "bg-indigo-500/10",
  },
  PROMOTION: {
    label: "Promotions",
    icon: TicketPercent,
    color: "text-amber-600",
    background: "bg-amber-500/10",
  },
  REFUND: {
    label: "Refunds",
    icon: Wallet,
    color: "text-purple-600",
    background: "bg-purple-500/10",
  },
  ACCOUNT: {
    label: "Account",
    icon: ShieldCheck,
    color: "text-slate-600",
    background: "bg-slate-500/10",
  },
  REVIEW: {
    label: "Reviews",
    icon: Star,
    color: "text-orange-600",
    background: "bg-orange-500/10",
  },
  WISHLIST: {
    label: "Wishlist",
    icon: Heart,
    color: "text-pink-600",
    background: "bg-pink-500/10",
  },
  SUPPORT: {
    label: "Support",
    icon: MessageCircle,
    color: "text-cyan-600",
    background: "bg-cyan-500/10",
  },
};

const filters = [
  { label: "All", value: "ALL" },
  { label: "Unread", value: "UNREAD" },
  { label: "Read", value: "READ" },
];

const categories = [
  "ALL",
  "ORDER",
  "PAYMENT",
  "DELIVERY",
  "PROMOTION",
  "REFUND",
  "ACCOUNT",
  "REVIEW",
  "WISHLIST",
  "SUPPORT",
];

export default function CustomerNotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [filter, setFilter] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const totalUnread = notifications.filter((n) => !n.read).length;
  const totalRead = notifications.filter((n) => n.read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "UNREAD" && !notification.read) ||
        (filter === "READ" && notification.read);

      const matchesCategory =
        category === "ALL" || notification.category === category;

      const matchesSearch =
        notification.title.toLowerCase().includes(search.toLowerCase()) ||
        notification.description.toLowerCase().includes(search.toLowerCase()) ||
        (notification.reference ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesCategory && matchesSearch;
    });
  }, [notifications, filter, category, search]);

  const markAsRead = (id: string) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );

    setSelectedNotification((previous) =>
      previous?.id === id ? null : previous
    );

    toast.success("Notification deleted");
  };

  const deleteAllRead = () => {
    if (totalRead === 0) {
      toast.info("There are no read notifications");
      return;
    }

    if (!window.confirm("Delete all read notifications?")) return;

    setNotifications((previous) =>
      previous.filter((notification) => !notification.read)
    );

    toast.success("Read notifications deleted");
  };

  const openNotification = (notification: Notification) => {
    if (!notification.read) {
      setNotifications((previous) =>
        previous.map((item) =>
          item.id === notification.id
            ? { ...item, read: true }
            : item
        )
      );
    }

    setSelectedNotification(notification);
  };

  const navigateToNotification = () => {
    if (!selectedNotification) return;

    const href = selectedNotification.href;
    setSelectedNotification(null);
    router.push(href);
  };

  const clearFilters = () => {
    setFilter("ALL");
    setCategory("ALL");
    setSearch("");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-3 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-foreground">Notifications</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <BellRing className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Stay updated with your MOFHAF activities.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.push("/dashboard/settings")}
        >
          <Settings className="h-4 w-4" />
          Notification Settings
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Notifications"
          value={notifications.length}
          icon={<Bell />}
          description="All your notifications"
        />

        <StatCard
          title="Unread Notifications"
          value={totalUnread}
          icon={<MailOpen />}
          description="Waiting for your attention"
        />

        <StatCard
          title="Read Notifications"
          value={totalRead}
          icon={<CheckCheck />}
          description="Previously viewed"
        />
      </div>

      {/* Notification List */}
      <Card>
        <CardHeader className="space-y-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                All Notifications
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your latest updates and activities.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={totalUnread === 0}
                onClick={markAllAsRead}
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark all read
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger >
                  <Button
                    size="sm"
                    variant="outline"
                    aria-label="More notification actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={deleteAllRead}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete all read
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={clearFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Clear filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search notifications, order ID or reference..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Read Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={
                  filter === item.value ? "default" : "outline"
                }
                onClick={() => setFilter(item.value)}
              >
                {item.label}

                {item.value === "UNREAD" && totalUnread > 0 && (
                  <span className="ml-2 rounded-full bg-background/20 px-1.5 text-xs">
                    {totalUnread}
                  </span>
                )}
              </Button>
            ))}
          </div>

          <Separator />

          {/* Category Filters */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter by category
            </p>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant={
                    category === item ? "secondary" : "ghost"
                  }
                  className="shrink-0"
                  onClick={() => setCategory(item)}
                >
                  {item === "ALL"
                    ? "All Categories"
                    : categoryConfig[item as NotificationCategory].label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-1">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-muted p-5">
                <Bell className="h-9 w-9 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No notifications found</h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                There are no notifications matching your selected filters.
              </p>

              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const config = categoryConfig[notification.category];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  className={`group flex flex-col gap-3 rounded-xl border p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-start ${
                    !notification.read
                      ? "bg-primary/[0.035]"
                      : "bg-background"
                  }`}
                >
                  {/* Category Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.background} ${config.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <button
                    type="button"
                    onClick={() => openNotification(notification)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className={`text-sm ${
                          !notification.read
                            ? "font-bold"
                            : "font-semibold"
                        }`}
                      >
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary" />
                      )}

                      <Badge variant="secondary" className="text-[10px]">
                        {config.label}
                      </Badge>
                    </div>

                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {notification.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {notification.date}

                      {notification.reference && (
                        <>
                          <span>·</span>
                          <span>{notification.reference}</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center justify-end gap-1 sm:self-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="View notification"
                      onClick={() => openNotification(notification)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Notification options"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {!notification.read && (
                          <DropdownMenuItem
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as read
                          </DropdownMenuItem>
                        )}

                        {notification.read && (
                          <DropdownMenuItem
                            onClick={() =>
                              setNotifications((previous) =>
                                previous.map((item) =>
                                  item.id === notification.id
                                    ? { ...item, read: false }
                                    : item
                                )
                              )
                            }
                          >
                            <MailOpen className="mr-2 h-4 w-4" />
                            Mark as unread
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() =>
                            deleteNotification(notification.id)
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete notification
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })
          )}

          {/* Footer */}
          {filteredNotifications.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 pt-5 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                Showing {filteredNotifications.length} of{" "}
                {notifications.length} notifications
              </p>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                View all notifications
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Details Dialog */}
      <Dialog
        open={!!selectedNotification}
        onOpenChange={(value) => {
          if (!value) setSelectedNotification(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedNotification && (() => {
            const config =
              categoryConfig[selectedNotification.category];
            const Icon = config.icon;

            return (
              <>
                <DialogHeader>
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`rounded-xl p-3 ${config.background} ${config.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <Badge variant="secondary">
                      {config.label}
                    </Badge>
                  </div>

                  <DialogTitle>
                    {selectedNotification.title}
                  </DialogTitle>

                  <DialogDescription>
                    {selectedNotification.date}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selectedNotification.description}
                  </p>

                  {selectedNotification.reference && (
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">
                        Reference ID
                      </p>
                      <p className="mt-1 font-semibold">
                        {selectedNotification.reference}
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      className="flex-1 gap-2"
                      onClick={navigateToNotification}
                    >
                      View Details
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() =>
                        deleteNotification(selectedNotification.id)
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
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
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
