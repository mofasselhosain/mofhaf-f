
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  UserRound,
  Globe,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  Package,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Living", slug: "home-living" },
  { name: "Beauty", slug: "beauty" },
  { name: "Groceries", slug: "groceries" },
  { name: "Footwear", slug: "footwear" },
  { name: "Sports", slug: "sports" },
  { name: "Toys & Games", slug: "toys-games" },
  { name: "Accessories", slug: "accessories" },
  { name: "Books", slug: "books" },
];

const languages = [
  { label: "English", code: "en", country: "United States" },
  { label: "বাংলা", code: "bn", country: "Bangladesh" },
  { label: "हिन्दी", code: "hi", country: "India" },
  { label: "العربية", code: "ar", country: "Saudi Arabia" },
];

const sampleProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    category: "electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    slug: "smart-watch",
    category: "electronics",
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    slug: "cotton-t-shirt",
    category: "fashion",
  },
  {
    id: "4",
    name: "Running Shoes",
    slug: "running-shoes",
    category: "footwear",
  },
  {
    id: "5",
    name: "Desk Lamp",
    slug: "desk-lamp",
    category: "home-living",
  },
];

type CartItem = {
  productId: string;
  quantity: number;
};

export default function MofhafHeader() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [locale, setLocale] = useState("en");
  const [country, setCountry] = useState("Bangladesh");
  const [cart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const suggestions = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) return [];

    return sampleProducts
      .filter((product) =>
        product.name.toLowerCase().includes(keyword)
      )
      .slice(0, 5);
  }, [query]);

  function submitSearch() {
    const keyword = query.trim();

    if (!keyword) return;

    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  }

  function changeLanguage(code: string, selectedCountry: string) {
    setLocale(code);
    setCountry(selectedCountry);

    // Requires matching locale routes or an i18n configuration.
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const supportedLocales = languages.map((item) => item.code);

    if (segments[0] && supportedLocales.includes(segments[0])) {
      segments.shift();
    }

    const destination = `/${code}/${segments.join("/")}`;

    router.push(destination.replace(/\/$/, "") || `/${code}`);
  }

  const linkButtonClass = buttonVariants({
    variant: "outline",
    className: "relative shrink-0 gap-2 px-3",
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* Main header */}
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-3 lg:gap-6 lg:px-8">
        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] overflow-y-auto"
            >
              <Link
                href="/"
                className="text-2xl font-black tracking-tight"
              >
                MOFHAF
              </Link>

              <Separator className="my-4" />

              <p className="mb-3 text-sm font-semibold">
                Categories
              </p>

              <nav className="flex flex-col gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>

              <Separator className="my-4" />

              <Link className="block py-2" href="/orders">
                My orders
              </Link>
              <Link className="block py-2" href="/wishlist">
                Wishlist
              </Link>
              <Link className="block py-2" href="/help">
                Help center
              </Link>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand */}
        <Link href="/" className="shrink-0">
          <span className="text-2xl font-black tracking-tighter sm:text-3xl">
            MOF<span className="text-primary">HAF</span>
          </span>

          <span className="hidden text-[10px] font-medium tracking-[0.22em] text-muted-foreground sm:block">
            SHOP SMART. LIVE BETTER.
          </span>
        </Link>

        {/* Desktop categories */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="hidden shrink-0 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent xl:flex"
          >
            <LayoutGrid className="h-4 w-4" />
            Categories
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56">
            {categories.map((category) => (
              <DropdownMenuItem key={category.slug} >
                <Link href={`/categories/${category.slug}`}>
                  {category.name}
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuItem >
              <Link href="/categories">
                View all categories
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Keyword search */}
        <div className="relative min-w-0 flex-1">
          <form
            className="flex h-10 items-center rounded-lg border bg-muted/30 pl-3 focus-within:ring-2 focus-within:ring-ring"
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch();
            }}
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
              placeholder="Search products, brands..."
              aria-label="Search products"
              className="h-full border-0 bg-transparent shadow-none focus-visible:ring-0"
            />

            {query && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0"
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                }}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <Button
              type="submit"
              className="h-full rounded-l-none px-3 sm:px-5"
            >
              Search
            </Button>
          </form>

          {searchOpen && query.trim() && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl">
              {suggestions.length > 0 ? (
                <>
                  <p className="px-4 py-2 text-xs text-muted-foreground">
                    Matching products
                  </p>

                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSearchOpen(false);
                        router.push(`/products/${product.slug}`);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-accent"
                    >
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {product.name}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={submitSearch}
                    className="w-full border-t px-4 py-3 text-left text-sm font-medium hover:bg-accent"
                  >
                    See all results for &quot;{query}&quot;
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={submitSearch}
                  className="w-full px-4 py-4 text-left text-sm hover:bg-accent"
                >
                  Search for &quot;{query}&quot;
                </button>
              )}
            </div>
          )}
        </div>

        {/* Language and country */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger
            className="hidden shrink-0 items-center gap-2 rounded-md px-3 py-2 hover:bg-accent md:flex"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm uppercase">{locale}</span>
            <ChevronDown className="h-3 w-3" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <div className="px-2 py-2">
              <p className="text-sm font-semibold">
                Language &amp; region
              </p>
              <p className="text-xs text-muted-foreground">
                Current region: {country}
              </p>
            </div>

            <Separator />

            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onSelect={() =>
                  changeLanguage(language.code, language.country)
                }
              >
                <span className="flex-1">{language.label}</span>

                {locale === language.code && (
                  <Badge variant="secondary">Selected</Badge>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Sign in: link styled as a button */}
        <Link
          href="/sign-in"
          className="hidden shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent sm:flex"
        >
          <UserRound className="h-5 w-5" />
          <span className="hidden lg:inline">Sign in</span>
        </Link>

        {/* Cart: link styled with shadcn button variants */}
        <Link
          href="/cart"
          aria-label={`Shopping cart, ${cartCount} items`}
          className={linkButtonClass}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden lg:inline">Cart</span>

          {cartCount > 0 && (
            <Badge className="absolute -right-2 -top-2 min-w-5 justify-center px-1">
              {cartCount}
            </Badge>
          )}
        </Link>
      </div>

      {/* Desktop category shortcuts */}
      <div className="hidden border-t lg:block">
        <nav className="mx-auto flex max-w-screen-2xl items-center gap-6 overflow-x-auto px-8 py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}

          <Link
            href="/deals"
            className="shrink-0 text-sm font-semibold text-primary"
          >
            Deals
          </Link>
        </nav>
      </div>
    </header>
  );
}
