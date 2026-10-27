
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Menu,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  color: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Studio Wireless Headphones",
    category: "Electronics",
    price: 89,
    oldPrice: 129,
    rating: 4.9,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",
    color: "bg-orange-50",
  },
  {
    id: 2,
    name: "Minimal Everyday Watch",
    category: "Accessories",
    price: 119,
    oldPrice: 149,
    rating: 4.8,
    badge: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",
    color: "bg-stone-100",
  },
  {
    id: 3,
    name: "Essential Everyday Sneakers",
    category: "Fashion",
    price: 75,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    color: "bg-red-50",
  },
  {
    id: 4,
    name: "Premium Travel Backpack",
    category: "Accessories",
    price: 95,
    oldPrice: 115,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
    color: "bg-emerald-50",
  },
];

const categories = ["All", "Electronics", "Fashion", "Accessories"];

const suggestions = [
  "Find headphones under $100",
  "Recommend a gift for a friend",
  "Show me popular accessories",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AICommerceSection() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI shopping assistant. Tell me what you're looking for, and I'll help you discover the right products.",
    },
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesQuery = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  async function sendMessage(text?: string) {
    const userMessage = (text ?? message).trim();

    if (!userMessage || loading) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: userMessage },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          products,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to contact the AI assistant.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't reach the AI service. Please check your API configuration and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#171717]">
      {/* Navigation */}
   

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-20 size-96 rounded-full bg-emerald-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-orange-200/25 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 },
              },
            }}
            className="relative z-10"
          >
            <motion.div variants={reveal}>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800">
                <Sparkles size={14} />
                SMARTER SHOPPING STARTS HERE
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              </span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Find what you
              <br />
              love. <span className="font-serif italic text-emerald-700">Faster.</span>
            </motion.h1>

            <motion.p
              variants={reveal}
              className="mt-6 max-w-lg text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8"
            >
              Discover thoughtfully selected products with a smarter shopping
              experience, personalized recommendations, and a little help from AI.
            </motion.p>

            <motion.div
              variants={reveal}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="h-12 rounded-full bg-black px-7 text-white hover:bg-neutral-800"
              >
                Explore collection <ArrowRight className="ml-2" size={17} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                // onClick={() => setChatOpen(true)}
                className="h-12 rounded-full border-neutral-300 bg-white px-7"
              >
               <Sparkles className="mr-2 text-emerald-700" size={17} />
                Shop with AI coming soon..
              </Button>
               
            </motion.div>

            <motion.div
              variants={reveal}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-neutral-600"
            >
              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-700" />
                Carefully selected
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-700" />
                Easy shopping
              </span>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="relative aspect-[4/4.25] overflow-hidden rounded-[2rem] bg-[#e8e4dc] sm:rounded-[2.5rem]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90"
                alt="Modern retail store with curated products"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />

              <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/90 px-3 py-2 text-xs font-semibold backdrop-blur-md sm:left-7 sm:top-7">
                <Sparkles size={13} className="mr-1.5 inline text-emerald-700" />
                Your smarter shopping space
              </div>

              <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                <p className="text-sm font-medium text-white/80">
                  A better way to discover
                </p>
                <p className="mt-2 max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl">
                  Good finds.
                  <br />
                  Great feeling.
                </p>
                <button
                  onClick={() => setChatOpen(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-100"
                >
                  Let AI help you <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-2 rounded-2xl border border-neutral-100 bg-white p-4 shadow-xl sm:-left-8 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Sparkles size={22} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Smart recommendations</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Made around your needs
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="absolute -right-1 top-1/3 hidden rounded-2xl border border-neutral-100 bg-white p-3 shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Star size={17} fill="currentColor" />
                </span>
                <div>
                  <p className="text-sm font-bold">Quality first</p>
                  <p className="text-xs text-neutral-500">Curated picks</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-y border-neutral-200/80 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: Truck,
              title: "Convenient shopping",
              description: "Find what you need with less effort.",
            },
            {
              icon: ShieldCheck,
              title: "Shop with confidence",
              description: "Clear prices and product details.",
            },
            {
              icon: Zap,
              title: "AI-powered discovery",
              description: "Get help finding the right products.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 py-6 sm:px-5 lg:px-8 ${
                index !== 2 ? "sm:border-r sm:border-neutral-200" : ""
              }`}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f3f3ef]">
                <item.icon size={21} />
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              The edit
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Picks worth discovering.
            </h2>
            <p className="mt-3 max-w-lg text-neutral-500">
              Thoughtful essentials for everyday life. Find your next favorite.
            </p>
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="h-12 rounded-full border-neutral-200 bg-white pl-11"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "bg-black text-white"
                  : "border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {item}
            </button>
          ))}

          <button
            // onClick={() => setChatOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            <Sparkles size={15} />  Ask AI comin soon
          </button>
           
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card className="group overflow-hidden rounded-[1.5rem] border-neutral-200/80 bg-white py-0 shadow-none transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.05]">
                <div className={`relative aspect-[4/4.3] overflow-hidden ${product.color}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold tracking-wider">
                      {product.badge}
                    </span>
                  )}

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={
                      favorites.includes(product.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 transition hover:scale-110"
                  >
                    <Heart
                      size={17}
                      className={
                        favorites.includes(product.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-neutral-700"
                      }
                    />
                  </button>

                  <button
                    onClick={() => {
                      setCart((current) => [...current, product.id]);
                    }}
                    className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-semibold text-white opacity-0 transition duration-300 hover:bg-emerald-700 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
                  >
                    <ShoppingBag size={15} />
                    Add to cart
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-neutral-500">
                      {product.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold">
                      <Star
                        size={13}
                        fill="currentColor"
                        className="text-amber-500"
                      />
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="mt-2 line-clamp-2 min-h-12 font-semibold leading-6">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <Search className="mx-auto text-neutral-400" size={32} />
            <p className="mt-4 font-semibold">No products found</p>
            <p className="mt-2 text-sm text-neutral-500">
              Try another search or select a different category.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="h-12 rounded-full border-neutral-300 bg-white px-7"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
          >
            Explore all products <ArrowDownRight size={16} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* AI call to action */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#17271f] px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-10 -top-20 size-80 rounded-full bg-emerald-400/15 blur-[80px]" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-emerald-200">
                <Sparkles size={14} /> YOUR PERSONAL SHOPPING ASSISTANT
              </span>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Not sure what to choose?
                <span className="mt-1 block font-serif italic text-emerald-300">
                  Let's find your match.
                </span>
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-white/65">
                Tell our AI what you need, what you love, and your budget. Get
                helpful shopping suggestions in seconds.
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => setChatOpen(true)}
              className="h-13 rounded-full bg-white px-7 text-black hover:bg-emerald-100"
            >
              <Sparkles size={17} className="mr-2" />
              Start a conversation <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-semibold text-neutral-900">
            nova<span className="text-emerald-600">.</span>
          </p>
          <p>Discover better. Shop smarter.</p>
         <p>© 2026 Nova Store. All rights reserved.</p>
        </div>
      </footer> */}

      {/* AI chat panel */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 sm:p-5">
          <button
            aria-label="Close AI assistant overlay"
            className="absolute inset-0 cursor-default"
            onClick={() => setChatOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative flex h-[min(680px,90dvh)] w-full flex-col overflow-hidden rounded-t-[1.5rem] border border-neutral-200 bg-white shadow-2xl sm:max-w-[430px] sm:rounded-[1.5rem]"
          >
            <div className="flex items-center justify-between bg-[#17271f] p-5 text-white">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-black">
                  <Sparkles size={22} />
                </span>
                <div>
                  <p className="font-semibold">MOFHAF AI</p>
                  <p className="mt-1 text-xs text-emerald-200">
                    Your shopping companion
                  </p>
                </div>
              </div>
              <button
                aria-label="Close assistant"
                onClick={() => setChatOpen(false)}
                className="flex size-9 items-center justify-center rounded-full hover:bg-white/10"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
              {messages.map((item, index) => (
                <div
                  key={`${index}-${item.role}`}
                  className={`flex ${
                    item.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.role === "user"
                        ? "rounded-br-md bg-[#17271f] text-white"
                        : "rounded-bl-md bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    {item.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span className="flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-emerald-600" />
                    <span className="size-1.5 animate-bounce rounded-full bg-emerald-600 [animation-delay:150ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-emerald-600 [animation-delay:300ms]" />
                  </span>
                  Finding helpful suggestions...
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3 sm:px-5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    disabled={loading}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-neutral-200 px-3 py-2 text-left text-xs text-neutral-600 transition hover:border-emerald-500 hover:bg-emerald-50 disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage();
              }}
              className="flex items-center gap-2 border-t border-neutral-200 p-4 sm:p-5"
            >
              <Input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="What are you looking for?"
                disabled={loading}
                maxLength={1000}
                className="h-12 rounded-full border-neutral-200 bg-neutral-50 px-4"
              />
              <Button
                type="submit"
                disabled={loading || !message.trim()}
                size="icon"
                aria-label="Send message"
                className="size-12 shrink-0 rounded-full bg-[#17271f] text-white hover:bg-emerald-800"
              >
                <Send size={17} />
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </main>
  );
}
