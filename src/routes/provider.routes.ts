const prefix = "/provider";

export const providerRoutes = [
  {
    title: "Sales Dashboard",
    items: [
      {
        title: "Orders",
        url: `${prefix}/orders`,
      },
      {
        title: "Products",
        url: `${prefix}/products`,
      },
      {
        title: "Inventory",
        url: `${prefix}/inventory`,
      },
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
      {
        title: "Coupons & Discounts",
        url: `${prefix}/coupons-discounts`,
      },
      {
        title: "Products",
        url: `${prefix}/reviews-ratings`,
      },
    ],
  },
  {
    title: "BUSINESS MANAGEMENT",
    items: [
        {
        title: "Shipping & Delivery",
        url: `${prefix}/shipping-delivery`,
      },
        {
        title: "Reports & Exports",
        url: `${prefix}/reports-exports`,
      },
        {
        title: "Notification",
        url: `${prefix}/notifications`,
      },
        {
        title: "Store Settings",
        url: `${prefix}/store-settings`,
      },
    ],
  },
];