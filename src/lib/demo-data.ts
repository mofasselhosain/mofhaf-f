
export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  children?: MenuItem[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

export const navigation = [
  { name: "SuperDeals", href: "/deals" },
  { name: "AliExpress Business", href: "/business" },
  { name: "Automotive", href: "/categories/automotive" },
  { name: "Appliances", href: "/categories/appliances" },
  { name: "Women's Clothing", href: "/categories/womens-clothing" },
  { name: "Men's Clothing", href: "/categories/mens-clothing" },
  { name: "More", href: "/categories" },
];

export const categories: MenuItem[] = [
  {
    id: "1",
    name: "Bags & Luggage",
    slug: "bags-luggage",
    icon: "👜",
    children: [
      { id: "11", name: "Wallets", slug: "wallets", icon: "👛" },
      { id: "12", name: "Travel & Passport Bags", slug: "travel-bags", icon: "🧳" },
      { id: "13", name: "Shoulder Bags", slug: "shoulder-bags", icon: "👜" },
      { id: "14", name: "Tote Bags", slug: "tote-bags", icon: "🛍️" },
      { id: "15", name: "Fashion Backpacks", slug: "backpacks", icon: "🎒" },
      { id: "16", name: "Briefcases", slug: "briefcases", icon: "💼" },
    ],
  },
  {
    id: "2",
    name: "Novelty & Special Use",
    slug: "novelty-special-use",
    icon: "🎁",
    children: [
      { id: "21", name: "Gifts", slug: "gifts", icon: "🎁" },
      { id: "22", name: "Collectibles", slug: "collectibles", icon: "🏆" },
      { id: "23", name: "Party Supplies", slug: "party-supplies", icon: "🎉" },
    ],
  },
  {
    id: "3",
    name: "Hair Extensions & Wigs",
    slug: "hair-extensions-wigs",
    icon: "💇",
    children: [
      { id: "31", name: "Wigs", slug: "wigs", icon: "💇" },
      { id: "32", name: "Hair Extensions", slug: "hair-extensions", icon: "✨" },
      { id: "33", name: "Hair Accessories", slug: "hair-accessories", icon: "🎀" },
    ],
  },
  {
    id: "4",
    name: "Arts, Crafts & Sewing",
    slug: "arts-crafts-sewing",
    icon: "🎨",
    children: [
      { id: "41", name: "Craft Supplies", slug: "craft-supplies", icon: "🧵" },
      { id: "42", name: "Sewing Tools", slug: "sewing-tools", icon: "🪡" },
      { id: "43", name: "Painting", slug: "painting", icon: "🖌️" },
    ],
  },
  {
    id: "5",
    name: "Food & Grocery",
    slug: "food-grocery",
    icon: "🛒",
    children: [
      { id: "51", name: "Snacks", slug: "snacks", icon: "🍪" },
      { id: "52", name: "Coffee & Tea", slug: "coffee-tea", icon: "☕" },
      { id: "53", name: "Kitchen Essentials", slug: "kitchen-essentials", icon: "🍽️" },
    ],
  },
  {
    id: "6",
    name: "Baby & Maternity",
    slug: "baby-maternity",
    icon: "🍼",
    children: [
      { id: "61", name: "Baby Clothing", slug: "baby-clothing", icon: "👶" },
      { id: "62", name: "Baby Toys", slug: "baby-toys", icon: "🧸" },
      { id: "63", name: "Maternity Wear", slug: "maternity-wear", icon: "🤰" },
    ],
  },
  {
    id: "7",
    name: "Office & School Supplies",
    slug: "office-school-supplies",
    icon: "📚",
    children: [
      { id: "71", name: "Notebooks", slug: "notebooks", icon: "📓" },
      { id: "72", name: "Pens & Pencils", slug: "pens-pencils", icon: "✏️" },
      { id: "73", name: "Office Bags", slug: "office-bags", icon: "💼" },
    ],
  },
  {
    id: "8",
    name: "Automotive",
    slug: "automotive",
    icon: "🚗",
    children: [
      { id: "81", name: "Car Accessories", slug: "car-accessories", icon: "🚘" },
      { id: "82", name: "Motorcycle Accessories", slug: "motorcycle-accessories", icon: "🏍️" },
      { id: "83", name: "Car Electronics", slug: "car-electronics", icon: "🔌" },
    ],
  },
  {
    id: "9",
    name: "Appliances",
    slug: "appliances",
    icon: "🏠",
    children: [
      { id: "91", name: "Kitchen Appliances", slug: "kitchen-appliances", icon: "🍳" },
      { id: "92", name: "Home Appliances", slug: "home-appliances", icon: "🧺" },
      { id: "93", name: "Small Appliances", slug: "small-appliances", icon: "☕" },
    ],
  },
  {
    id: "10",
    name: "Women's Clothing",
    slug: "womens-clothing",
    icon: "👗",
    children: [
      { id: "101", name: "Dresses", slug: "dresses", icon: "👗" },
      { id: "102", name: "Tops", slug: "tops", icon: "👚" },
      { id: "103", name: "Shoes", slug: "womens-shoes", icon: "👠" },
    ],
  },
  {
    id: "11",
    name: "Men's Clothing",
    slug: "mens-clothing",
    icon: "👕",
    children: [
      { id: "111", name: "T-Shirts", slug: "t-shirts", icon: "👕" },
      { id: "112", name: "Jeans", slug: "jeans", icon: "👖" },
      { id: "113", name: "Men's Shoes", slug: "mens-shoes", icon: "👟" },
    ],
  },
];

export const brands: Brand[] = [
  { id: "1", name: "Xiaomi", slug: "xiaomi", logo: "mi" },
  { id: "2", name: "Nike", slug: "nike", logo: "NIKE" },
  { id: "3", name: "Bange", slug: "bange", logo: "BANGE" },
  { id: "4", name: "BAGSMART", slug: "bagsmart", logo: "BAGSMART" },
  { id: "5", name: "Puma", slug: "puma", logo: "PUMA" },
  { id: "6", name: "Huohuo", slug: "huohuo", logo: "HUOHUO" },
  { id: "7", name: "Scione", slug: "scione", logo: "SCIONE" },
  { id: "8", name: "Kabaqoo", slug: "kabaqoo", logo: "KABAQOO" },
];

export const demoProducts = Array.from({ length: 24 }, (_, index) => {
  const category = categories[index % categories.length];
  const child = category.children?.[index % (category.children?.length || 1)];

  return {
    id: String(index + 1),
    name: `${child?.name ?? category.name} ${index + 1}`,
    slug: `${child?.slug ?? category.slug}-product-${index + 1}`,
    categorySlug: category.slug,
    price: 350 + index * 175,
    rating: 4 + (index % 10) / 10,
    sold: 100 + index * 37,
    icon: child?.icon ?? category.icon ?? "🛍️",
  };
});
