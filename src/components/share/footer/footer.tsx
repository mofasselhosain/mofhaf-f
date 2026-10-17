
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Best Sellers", href: "/products?sort=popular" },
  { label: "Featured Products", href: "/products?featured=true" },
  { label: "Special Offers", href: "/offers" },
];

const companyLinks = [
  { label: "About MOFHAF", href: "/about" },
  { label: "Our Story", href: "/about#story" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Become a Seller", href: "/become-a-seller" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Track Your Order", href: "/track-order" },
  { label: "Shipping Information", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    Icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    Icon: BsInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    Icon: LiaLinkedin,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    Icon: BsYoutube,
  },
];

const benefits = [
  {
    title: "Reliable Delivery",
    description: "Delivery options at checkout",
    Icon: Truck,
  },
  {
    title: "Secure Shopping",
    description: "Your privacy matters to us",
    Icon: ShieldCheck,
  },
  {
    title: "Easy Returns",
    description: "Subject to our return policy",
    Icon: RotateCcw,
  },
  {
    title: "Flexible Payments",
    description: "Available payment options",
    Icon: CreditCard,
  },
];

type FooterLinkItem = {
  label: string;
  href: string;
};

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: FooterLinkItem[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
        {title}
      </h3>

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-neutral-400 transition-colors duration-200 hover:text-teal-400"
            >
              {link.label}

              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Avoid evaluating the current year during prerendering.
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  async function handleSubscribe(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      // Replace this placeholder with your newsletter API request.
      await Promise.resolve();

      setMessage(
        "Form ready! Connect your newsletter API to save your subscription."
      );
      setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="relative isolate overflow-hidden border-t border-neutral-200 bg-[rgb(24,24,27)] font-bold text-white">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-amber-400/[0.07] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-orange-500/[0.04] blur-3xl"
      />

      {/* Brand and newsletter */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="MOFHAF home"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-400 text-base font-black tracking-tight text-black transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                MH
              </span>

              <span className="text-2xl font-black tracking-[0.17em] sm:text-3xl">
                MOFHAF<span className="text-teal-400">.</span>
              </span>
            </Link>

            <p className="mt-6 max-w-lg text-sm font-bold leading-7 text-neutral-400 sm:text-base">
              Discover products you love with MOFHAF. Enjoy a simple,
              convenient shopping experience and find something special
              for every day.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit MOFHAF on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-teal-400 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Icon className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>

            <p className="mt-5 text-xs font-bold text-neutral-500">
              Follow us for product updates and new arrivals.
            </p>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-400">
              <Mail className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
              Stay in the loop.
            </h2>

            <p className="mt-3 max-w-md text-sm font-bold leading-6 text-neutral-400">
              Subscribe to receive updates about new products, upcoming
              collections, and exclusive offers.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="h-12 min-w-0 border-white/10 bg-black/30 font-bold text-white placeholder:font-bold placeholder:text-neutral-500 focus-visible:ring-amber-400"
              />

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 shrink-0 gap-2 bg-teal-400 px-5 font-bold text-black transition-all duration-300 hover:bg-teal-300"
              >
                {submitting ? "Please wait..." : "Subscribe"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="mt-3 text-xs font-bold leading-5 text-teal-300"
              >
                {message}
              </p>
            )}

            <p className="mt-3 text-xs font-bold leading-5 text-neutral-500">
              By subscribing, you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="text-teal-400 underline hover:text-teal-300"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Shopping benefits */}
      <div className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-8">
          {benefits.map(({ title, description, Icon }) => (
            <div key={title} className="group flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-teal-400 transition-all duration-300 group-hover:border-amber-400/40 group-hover:bg-amber-400/10">
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">
                  {title}
                </h3>

                <p className="mt-1 text-xs font-bold leading-5 text-neutral-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer navigation */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 sm:py-14 md:grid-cols-4 lg:py-16">
        <FooterLinks title="Shop" links={shopLinks} />
        <FooterLinks title="Company" links={companyLinks} />
        <FooterLinks title="Customer Care" links={supportLinks} />

        {/* Contact details */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Get in Touch
          </h3>

          <div className="mt-6 space-y-5">
            <a
              href="mailto:support@mofhaf.com"
              className="flex items-start gap-3 text-sm font-bold text-neutral-400 transition-colors hover:text-teal-400"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
              <span className="break-all">support@mofhaf.com</span>
            </a>

            <a
              href="tel:+8801000000000"
              className="flex items-start gap-3 text-sm font-bold text-neutral-400 transition-colors hover:text-teal-400"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
              <span>+880 1XXX-XXXXXX</span>
            </a>

            <div className="flex items-start gap-3 text-sm font-bold text-neutral-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
              <span>Bangladesh</span>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-400 transition-colors hover:text-teal-300"
          >
            Contact our team
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Copyright and legal links */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs font-bold leading-6 text-neutral-500 md:text-left">
            © {year ?? "2026"} MOFHAF. All rights reserved.
          </p>

          <nav
            aria-label="Legal navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs font-bold text-neutral-500"
          >
            <Link
              href="/privacy-policy"
              className="font-bold transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="font-bold transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/cookies"
              className="font-bold transition-colors hover:text-white"
            >
              Cookie Policy
            </Link>
          </nav>

          <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-neutral-500 md:justify-end">
            Made with
            <Heart className="h-3.5 w-3.5 fill-teal-400 text-teal-400" />
            in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
