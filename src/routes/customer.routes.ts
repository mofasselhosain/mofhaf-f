const prefix = "/dashboard";

export const customerRoutes = [
  {
    title: "Dashboard Overview",
    items: [
      {
        title: "My Profile",
        url: `${prefix}/my-profile`,
      },
      {
        title: "My Orders",
        url: `${prefix}/my-orders`,
      },
      {
        title: "Payments & Transactions",
        url: `${prefix}/payments-transactions`,
      },
      {
        title: "My Addresses",
        url: `${prefix}/my-addresses`,
      },
      {
        title: "My Wishlist",
        url: `${prefix}/my-wishlist`,
      },
      {
        title: "Shopping Cart",
        url: `${prefix}/shopping-cart`,
      },
      {
        title: "My Reviews",
        url: `${prefix}/my-reviews`,
      },
      {
        title: "Returns & Refunds",
        url: `${prefix}/returns-refunds`,
      },
    ],
  },
  {
    title: "ACCOUNT & SUPPORT",
    items: [
      {
        title: "Notifications",
        url: `${prefix}/notifications`,
      },
      {
        title: "Customer Support",
       url: `${prefix}/customer-support`,
        isActive: true,
      },
      {
        title: "Settings",
        url: `${prefix}/settings`,
        isActive: true,
      },
      
    ],
  },
];