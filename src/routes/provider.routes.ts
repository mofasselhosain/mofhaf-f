const prefix = "/provider";

export const providerRoutes = [
  {
    title: "Bookings",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Appointments",
        url: `${prefix}/my-appointments`,
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
    ],
  },
];