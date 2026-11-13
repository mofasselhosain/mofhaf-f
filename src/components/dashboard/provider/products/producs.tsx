
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Package,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  ShoppingBag,
  CheckCircle2,
  FileEdit,
  AlertTriangle,
  TrendingUp,
  Download,
  X,
  ImagePlus,
  Tag,
  Boxes,
  DollarSign,
  CalendarDays,
  Barcode,
  RefreshCw,
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

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ------------------------------------------------
// TYPES
// ------------------------------------------------

type ProductStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

interface IProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice: number;
  stock: number;
  status: ProductStatus;
  image: string;
  rating: number;
  reviews: number;
  createdAt: string;
}

// ------------------------------------------------
// DEMO DATA
// ------------------------------------------------

const initialProducts: IProduct[] = [
  {
    id: "1",
    name: "4K Mini Action Camera",
    slug: "4k-mini-action-camera",
    sku: "CAM-001",
    category: "Electronics",
    description:
      "Capture amazing moments with this compact 4K action camera. Perfect for travel, sports and outdoor adventures.",
    price: 2490,
    compareAtPrice: 3990,
    stock: 45,
    status: "PUBLISHED",
    image: "📷",
    rating: 4.8,
    reviews: 1240,
    createdAt: "2026-11-01",
  },
  {
    id: "2",
    name: "Foldable Mini Drone",
    slug: "foldable-mini-drone",
    sku: "DRN-002",
    category: "Electronics",
    description:
      "Portable foldable drone with HD camera and intelligent flight control.",
    price: 5490,
    compareAtPrice: 7490,
    stock: 18,
    status: "PUBLISHED",
    image: "🚁",
    rating: 4.6,
    reviews: 856,
    createdAt: "2026-11-02",
  },
  {
    id: "3",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    sku: "AUD-003",
    category: "Electronics",
    description:
      "Premium wireless headphones with clear audio and comfortable ear cushions.",
    price: 1890,
    compareAtPrice: 2490,
    stock: 32,
    status: "PUBLISHED",
    image: "🎧",
    rating: 4.7,
    reviews: 520,
    createdAt: "2026-11-03",
  },
  {
    id: "4",
    name: "Premium Smart Watch",
    slug: "premium-smart-watch",
    sku: "WAT-004",
    category: "Electronics",
    description:
      "Smart watch with fitness tracking, notifications and a modern design.",
    price: 3990,
    compareAtPrice: 4990,
    stock: 0,
    status: "PUBLISHED",
    image: "⌚",
    rating: 4.5,
    reviews: 320,
    createdAt: "2026-11-04",
  },
  {
    id: "5",
    name: "Gaming Keyboard",
    slug: "gaming-keyboard",
    sku: "KEY-005",
    category: "Electronics",
    description:
      "Mechanical-style gaming keyboard with RGB lighting.",
    price: 1850,
    compareAtPrice: 2200,
    stock: 12,
    status: "DRAFT",
    image: "⌨️",
    rating: 4.4,
    reviews: 90,
    createdAt: "2026-11-05",
  },
  {
    id: "6",
    name: "Classic Men's T-Shirt",
    slug: "classic-mens-tshirt",
    sku: "FAS-006",
    category: "Fashion",
    description:
      "Comfortable everyday cotton T-shirt with a classic fit.",
    price: 650,
    compareAtPrice: 850,
    stock: 75,
    status: "ARCHIVED",
    image: "👕",
    rating: 4.3,
    reviews: 112,
    createdAt: "2026-11-06",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Groceries",
  "Sports",
  "Accessories",
  "Books",
  "Toys",
  "Other",
];

const emptyForm = {
  name: "",
  sku: "",
  category: "Electronics",
  description: "",
  price: "",
  compareAtPrice: "",
  stock: "",
  status: "DRAFT" as ProductStatus,
};

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

const currency = (amount: number) =>
  `৳${amount.toLocaleString("en-BD")}`;

const statusStyle: Record<ProductStatus, string> = {
  PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return {
      label: "Out of Stock",
      style: "text-red-600 bg-red-50",
    };
  }

  if (stock <= 10) {
    return {
      label: "Low Stock",
      style: "text-amber-700 bg-amber-50",
    };
  }

  return {
    label: "In Stock",
    style: "text-emerald-700 bg-emerald-50",
  };
};

// ------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------

export default function ProviderProductsPage() {
  const [products, setProducts] =
    useState<IProduct[]>(initialProducts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [selectedProduct, setSelectedProduct] =
    useState<IProduct | null>(null);

  const [editingProduct, setEditingProduct] =
    useState<IProduct | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState(emptyForm);

  // ----------------------------------------------
  // STATISTICS
  // ----------------------------------------------

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Published",
      value: products.filter(
        (p) => p.status === "PUBLISHED"
      ).length,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Draft Products",
      value: products.filter(
        (p) => p.status === "DRAFT"
      ).length,
      icon: FileEdit,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Out of Stock",
      value: products.filter((p) => p.stock === 0).length,
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
    },
  ];

  // ----------------------------------------------
  // SEARCH & FILTER
  // ----------------------------------------------

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()) ||
        product.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        product.status === statusFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        product.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [products, search, statusFilter, categoryFilter]);

  // ----------------------------------------------
  // ADD PRODUCT
  // ----------------------------------------------

  const openAddForm = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  // ----------------------------------------------
  // EDIT PRODUCT
  // ----------------------------------------------

  const openEditForm = (product: IProduct) => {
    setEditingProduct(product);

    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.description,
      price: String(product.price),
      compareAtPrice: String(product.compareAtPrice),
      stock: String(product.stock),
      status: product.status,
    });

    setFormOpen(true);
  };

  // ----------------------------------------------
  // SAVE PRODUCT
  // ----------------------------------------------

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const price = Number(form.price);
    const compareAtPrice = Number(form.compareAtPrice);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.sku.trim() ||
      !form.category ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isFinite(compareAtPrice) ||
      compareAtPrice < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return;
    }

    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...form,
                slug,
                price,
                compareAtPrice,
                stock,
              }
            : product
        )
      );
    } else {
      const newProduct: IProduct = {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        slug,
        sku: form.sku.trim(),
        category: form.category,
        description: form.description,
        price,
        compareAtPrice,
        stock,
        status: form.status,
        image: "📦",
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setFormOpen(false);
    setEditingProduct(null);
    setForm(emptyForm);
  };

  // ----------------------------------------------
  // DELETE PRODUCT
  // ----------------------------------------------

  const handleDelete = () => {
    if (!deleteId) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== deleteId)
    );

    if (selectedProduct?.id === deleteId) {
      setSelectedProduct(null);
      setDetailsOpen(false);
    }

    setDeleteId(null);
  };

  // ----------------------------------------------
  // RESET FILTERS
  // ----------------------------------------------

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
  };

  // ----------------------------------------------
  // RENDER
  // ----------------------------------------------

  return (
    <div className="min-h-screen space-y-6 bg-slate-50/50 p-4 md:p-6 lg:p-8">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            Provider Dashboard / Products
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your products, pricing, inventory and listings.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <Button
            variant="outline"
            onClick={resetFilters}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>

          <Button
            onClick={() => window.print()}
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export / Print
          </Button>

          <Button
            onClick={openAddForm}
            className="gap-2 bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>

        </div>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="border-slate-200 shadow-sm">
              <CardContent className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {stat.value}
                    </h3>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Your product inventory
                </p>

              </CardContent>
            </Card>
          );
        })}

      </div>

      {/* PRODUCT TABLE */}

      <Card className="overflow-hidden border-slate-200 shadow-sm">

        <CardHeader className="space-y-4">

          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

            <div>
              <CardTitle className="text-lg">
                All Products
              </CardTitle>

              <CardDescription className="mt-1">
                View and manage your product catalog.
              </CardDescription>
            </div>

            <Badge variant="secondary">
              {filteredProducts.length} Products
            </Badge>

          </div>

          <Separator />

          {/* SEARCH AND FILTER */}

          <div className="flex flex-col gap-3 lg:flex-row">

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search product name, SKU or slug..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <Select
                value={categoryFilter}
                onValueChange={(value)=>setCategoryFilter(value ?? "ALL")}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>

                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(value)=>setStatusFilter(value ?? "ALL")}
              >
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>

            </div>

          </div>

        </CardHeader>

        <CardContent className="p-0">

          <div className="overflow-x-auto">

            <Table>

              <TableHeader className="bg-slate-50">

                <TableRow>

                  <TableHead className="min-w-[280px] pl-6">
                    Product
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    SKU
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    Category
                  </TableHead>

                  <TableHead className="min-w-[130px]">
                    Price
                  </TableHead>

                  <TableHead className="min-w-[120px]">
                    Stock
                  </TableHead>

                  <TableHead className="min-w-[125px]">
                    Status
                  </TableHead>

                  <TableHead className="min-w-[110px]">
                    Rating
                  </TableHead>

                  <TableHead className="pr-6 text-right">
                    Actions
                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => {

                    const stock = getStockStatus(product.stock);

                    return (

                      <TableRow
                        key={product.id}
                        className="hover:bg-slate-50/70"
                      >

                        {/* PRODUCT */}

                        <TableCell className="pl-6">

                          <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-slate-100 text-2xl">
                              {product.image}
                            </div>

                            <div className="min-w-0">

                              <p className="max-w-[190px] truncate font-semibold text-slate-800">
                                {product.name}
                              </p>

                              <p className="mt-1 max-w-[190px] truncate text-xs text-muted-foreground">
                                {product.slug}
                              </p>

                            </div>

                          </div>

                        </TableCell>

                        {/* SKU */}

                        <TableCell>
                          <span className="font-mono text-xs">
                            {product.sku}
                          </span>
                        </TableCell>

                        {/* CATEGORY */}

                        <TableCell className="text-sm">
                          {product.category}
                        </TableCell>

                        {/* PRICE */}

                        <TableCell>

                          <p className="font-semibold">
                            {currency(product.price)}
                          </p>

                          {product.compareAtPrice > product.price && (
                            <p className="text-xs text-muted-foreground line-through">
                              {currency(product.compareAtPrice)}
                            </p>
                          )}

                        </TableCell>

                        {/* STOCK */}

                        <TableCell>

                          <Badge
                            variant="outline"
                            className={`${stock.style} border-transparent`}
                          >
                            {stock.label}
                          </Badge>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {product.stock} units
                          </p>

                        </TableCell>

                        {/* STATUS */}

                        <TableCell>

                          <Badge
                            variant="outline"
                            className={statusStyle[product.status]}
                          >
                            {product.status}
                          </Badge>

                        </TableCell>

                        {/* RATING */}

                        <TableCell>

                          <p className="font-medium">
                            ⭐ {product.rating.toFixed(1)}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {product.reviews} reviews
                          </p>

                        </TableCell>

                        {/* ACTIONS */}

                        <TableCell className="pr-6 text-right">

                          <div className="flex items-center justify-end gap-1">

                            <Button
                              variant="ghost"
                              size="icon"
                              title="View product"
                              onClick={() => {
                                setSelectedProduct(product);
                                setDetailsOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              title="Edit product"
                              onClick={() => openEditForm(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <DropdownMenu>

                              <DropdownMenuTrigger >
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">

                                <DropdownMenuLabel>
                                  Product Actions
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setDetailsOpen(true);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => openEditForm(product)}
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit Product
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => setDeleteId(product.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Product
                                </DropdownMenuItem>

                              </DropdownMenuContent>

                            </DropdownMenu>

                          </div>

                        </TableCell>

                      </TableRow>

                    );
                  })

                ) : (

                  <TableRow>
                    <TableCell colSpan={8} className="h-40 text-center">

                      <div className="flex flex-col items-center gap-2">

                        <Package className="h-10 w-10 text-muted-foreground/50" />

                        <p className="font-semibold">
                          No products found
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Try another search or add a new product.
                        </p>

                        <Button
                          size="sm"
                          onClick={openAddForm}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Product
                        </Button>

                      </div>

                    </TableCell>
                  </TableRow>

                )}

              </TableBody>

            </Table>

          </div>

          <div className="flex flex-col justify-between gap-2 border-t p-4 sm:flex-row sm:items-center">

            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            <p className="text-xs text-muted-foreground">
              Product inventory management
            </p>

          </div>

        </CardContent>

      </Card>

      {/* ADD / EDIT PRODUCT DIALOG */}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">

          <DialogHeader>

            <DialogTitle className="text-xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>

            <DialogDescription>
              {editingProduct
                ? "Update your product information and inventory."
                : "Enter product details to add a new product to your store."}
            </DialogDescription>

          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* PRODUCT BASIC INFORMATION */}

            <div className="space-y-4">

              <h3 className="flex items-center gap-2 font-semibold">
                <Package className="h-4 w-4" />
                Basic Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="product-name">
                  Product Name *
                </Label>

                <Input
                  id="product-name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="product-sku">
                    SKU *
                  </Label>

                  <Input
                    id="product-sku"
                    placeholder="CAM-001"
                    value={form.sku}
                    onChange={(e) =>
                      setForm({ ...form, sku: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>

                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      setForm({ ...form, category: value  ?? ""})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Product Description
                </Label>

                <Textarea
                  id="description"
                  placeholder="Write product description..."
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

            </div>

            <Separator />

            {/* PRICING */}

            <div className="space-y-4">

              <h3 className="flex items-center gap-2 font-semibold">
                <DollarSign className="h-4 w-4" />
                Pricing Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="price">
                    Selling Price (৳) *
                  </Label>

                  <Input
                    id="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="2490"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compare-price">
                    Original Price (৳)
                  </Label>

                  <Input
                    id="compare-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="3990"
                    value={form.compareAtPrice}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        compareAtPrice: e.target.value,
                      })
                    }
                  />
                </div>

              </div>

            </div>

            <Separator />

            {/* INVENTORY */}

            <div className="space-y-4">

              <h3 className="flex items-center gap-2 font-semibold">
                <Boxes className="h-4 w-4" />
                Inventory & Availability
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="stock">
                    Available Stock *
                  </Label>

                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="45"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Product Status</Label>

                  <Select
                    value={form.status}
                    onValueChange={(value) =>
                      setForm({
                        ...form,
                        status: value as ProductStatus,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

            </div>

            <Separator />

            {/* ACTION BUTTONS */}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800"
              >
                {editingProduct ? "Save Changes" : "Create Product"}
              </Button>

            </div>

          </form>

        </DialogContent>

      </Dialog>

      {/* PRODUCT DETAILS DIALOG */}

      <Dialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      >

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">

          {selectedProduct && (

            <>

              <DialogHeader>
                <DialogTitle className="text-xl">
                  Product Details
                </DialogTitle>

                <DialogDescription>
                  Complete product information and inventory.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">

                {/* PRODUCT HEADER */}

                <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row">

                  <div className="flex h-32 w-full items-center justify-center rounded-xl border bg-white text-6xl sm:w-36">
                    {selectedProduct.image}
                  </div>

                  <div className="flex-1 space-y-2">

                    <Badge variant="outline" className={statusStyle[selectedProduct.status]}>
                      {selectedProduct.status}
                    </Badge>

                    <h3 className="text-lg font-bold">
                      {selectedProduct.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      SKU: {selectedProduct.sku}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Category: {selectedProduct.category}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">
                        {currency(selectedProduct.price)}
                      </span>

                      {selectedProduct.compareAtPrice > selectedProduct.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {currency(selectedProduct.compareAtPrice)}
                        </span>
                      )}
                    </div>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    Description
                  </h3>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {selectedProduct.description || "No description available."}
                  </p>
                </div>

                <Separator />

                {/* INVENTORY */}

                <div className="grid grid-cols-2 gap-3">

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">
                        Available Stock
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">
                        {selectedProduct.stock}
                      </h3>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">
                        Customer Rating
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">
                        ⭐ {selectedProduct.rating.toFixed(1)}
                      </h3>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">
                        Total Reviews
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">
                        {selectedProduct.reviews}
                      </h3>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">
                        Category
                      </p>
                      <h3 className="mt-2 truncate text-lg font-bold">
                        {selectedProduct.category}
                      </h3>
                    </CardContent>
                  </Card>

                </div>

                {/* ADDITIONAL INFORMATION */}

                <div className="space-y-3 rounded-xl border p-4">

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">
                      Product Slug
                    </span>
                    <span className="max-w-[60%] break-all text-right font-medium">
                      {selectedProduct.slug}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">
                      Product SKU
                    </span>
                    <span className="font-medium">
                      {selectedProduct.sku}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">
                      Created At
                    </span>
                    <span className="font-medium">
                      {selectedProduct.createdAt}
                    </span>
                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex flex-wrap justify-end gap-2">

                  <Button
                    variant="outline"
                    onClick={() => setDetailsOpen(false)}
                  >
                    Close
                  </Button>

                  <Button
                    onClick={() => {
                      setDetailsOpen(false);
                      openEditForm(selectedProduct);
                    }}
                    className="gap-2 bg-slate-900 hover:bg-slate-800"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Product
                  </Button>

                </div>

              </div>

            </>

          )}

        </DialogContent>

      </Dialog>

      {/* DELETE CONFIRMATION */}

      <Dialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >

        <DialogContent className="sm:max-w-md">

          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>

            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">

            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Product
            </Button>

          </div>

        </DialogContent>

      </Dialog>

    </div>
  );
}
