
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  LockKeyhole,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type CartProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  color: string;
  stock: number;
};

const initialCart: CartProduct[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    image: "/products/headphone.jpg",
    price: 2490,
    originalPrice: 3490,
    quantity: 1,
    color: "Black",
    stock: 10,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    image: "/products/watch.jpg",
    price: 3200,
    originalPrice: 4500,
    quantity: 1,
    color: "Black",
    stock: 5,
  },
  {
    id: "3",
    name: "Premium Running Sneakers",
    image: "/products/shoes.jpg",
    price: 1850,
    originalPrice: 2500,
    quantity: 1,
    color: "White",
    stock: 8,
  },
];

const formatPrice = (price: number) =>
  `৳${price.toLocaleString("en-BD")}`;

export default function ShoppingCartPage() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  const shipping = cart.length > 0 ? (subtotal >= 5000 ? 0 : 80) : 0;
  const total = Math.max(0, subtotal + shipping - discount);
  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const updateQuantity = (id: string, change: number) => {
    setCart((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;

        const quantity = Math.min(
          item.stock,
          Math.max(1, item.quantity + change)
        );

        return { ...item, quantity };
      })
    );
  };

  const removeItem = (id: string) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
    toast.success("Product removed from cart");
  };

  const saveForLater = (id: string) => {
    setSavedItems((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
    removeItem(id);
    toast.success("Product saved for later");
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "MOFHAF10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("10% discount applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 rounded-full bg-primary/10 p-7">
          <ShoppingCart className="h-12 w-12 text-primary" />
        </div>

        <h2 className="text-2xl font-bold">Your cart is empty!</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
          Explore our products and find something you love.
        </p>

        <Button  className="mt-6 gap-2">
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        {savedItems.length > 0 && (
          <p className="mt-5 text-sm text-muted-foreground">
            {savedItems.length} product(s) saved for later.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-3 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your items and complete your purchase.
          </p>
        </div>

        <Badge variant="secondary" className="gap-2 px-3 py-2">
          <ShoppingBag className="h-4 w-4" />
          {itemCount} Items
        </Badge>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

        {/* Products */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                Cart Items ({cart.length})
              </CardTitle>

              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  setCart([]);
                  toast.success("Cart cleared");
                }}
              >
                Clear Cart
              </Button>
            </CardHeader>

            <CardContent className="space-y-5">
              {cart.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-col gap-4 sm:flex-row">

                    {/* Product Image */}
                    <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Color: {item.color}
                          </p>
                        </div>

                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          In Stock
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        {/* Quantity */}
                        <div className="flex items-center rounded-lg border">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="min-w-9 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Increase quantity"
                            disabled={item.quantity >= item.stock}
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveForLater(item.id)}
                          >
                            <Heart className="mr-1 h-4 w-4" />
                            Save
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            aria-label="Remove product"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="mt-5" />
                </div>
              ))}

              <Button variant="outline"  className="gap-2">
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-full bg-primary/10 p-3">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Delivery Available</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy free shipping on orders over ৳5,000.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4 lg:sticky lg:top-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Shipping
                  </span>
                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Discount
                  </span>
                  <span className="font-medium text-green-600">
                    -{formatPrice(discount)}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Coupon */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Tag className="h-4 w-4 text-primary" />
                  Apply Coupon
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />

                  <Button variant="secondary" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Try MOFHAF10 for 10% off.
                </p>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={() => {
                  toast.info("Connect your checkout API to continue.");
                }}
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <LockKeyhole className="h-4 w-4" />
                Secure and encrypted checkout
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <span>Secure payment protection</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Fast and reliable delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                  <span>Easy return policy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
