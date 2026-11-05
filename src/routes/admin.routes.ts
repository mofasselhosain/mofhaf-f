const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Admin Management",
    items: [
      {
        title: "Analytics",
        url: `${prefix}analytics`,
      },
      {
        title: "All Orders",
        url: `${prefix}/orders`,
      },
      {
        title: "Products",
        url: `${prefix}/products`,
      },
      {
        title: "Category",
        url: `${prefix}/categories`,
      },
      {
        title: "Brands",
        url: `${prefix}/brands`,
      },
      {
        title: "Inventory",
        url: `${prefix}/inventory`,
      },
      {
        title: "Customer",
        url: `${prefix}/customer`,
      },
      {
        title: "Payments",
        url: `${prefix}/payments`,
      },
      {
        title: "Coupons",
        url: `${prefix}/coupons-discount`,
      },
      {
        title: "Promotions",
        url: `${prefix}/promotions`,
      },
      {
        title: "Reviews",
        url: `${prefix}/reviews`,
      },
      {
        title: "Support",
        url: `${prefix}/support`,
      },
      {
        title: "Staff Management",
        url: `${prefix}/staff-management`,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
      },
    ],
  },
];