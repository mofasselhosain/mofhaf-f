
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  isHydrated: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "mofhaf-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart data from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart data to localStorage
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  // Add product
  const addToCart = (product: Product, quantity = 1) => {
    const stock = product.stock ?? 0;

    if (!Number.isInteger(quantity) || quantity < 1 || stock < 1) {
      return;
    }

    setItems((previous) => {
      const existing = previous.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                product,
                quantity: Math.min(item.quantity + quantity, stock),
              }
            : item
        );
      }

      return [...previous, { product, quantity: Math.min(quantity, stock) }];
    });
  };

  // Remove product
  const removeFromCart = (productId: string) => {
    setItems((previous) =>
      previous.filter((item) => item.product.id !== productId)
    );
  };

  // Update quantity
  const updateQuantity = (productId: string, quantity: number) => {
    setItems((previous) =>
      previous
        .map((item) => {
          if (item.product.id !== productId) return item;

          const stock = item.product.stock ?? 0;

          return {
            ...item,
            quantity: Math.min(
              Math.max(1, Math.floor(quantity)),
              stock
            ),
          };
        })
        .filter((item) => (item.product.stock ?? 0) > 0)
    );
  };

  // Clear cart
  const clearCart = () => setItems([]);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        isHydrated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
