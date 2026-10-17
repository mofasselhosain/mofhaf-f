
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type BannerSlide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
};

const banners: BannerSlide[] = [
  {
    id: 1,
    title: "Don't Miss Out on Insider Perks",
    subtitle: "Exclusive Benefits",
    description:
      "Whatever you're waiting for, make the most of every account benefit.",
    image: "/banners/banner-1.jpg",
    buttonText: "Sign In",
    buttonLink: "/login",
  },
  {
    id: 2,
    title: "Discover Your Next Favorite",
    subtitle: "New Arrivals",
    description:
      "Explore trending products and find something made for you.",
    image: "/banners/banner-2.jpg",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    id: 3,
    title: "Great Deals, Better Choices",
    subtitle: "Special Offers",
    description:
      "Find amazing products at prices you'll love.",
    image: "/banners/banner-3.jpg",
    buttonText: "Explore Deals",
    buttonLink: "/deals",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeBanner = banners[activeIndex];

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % banners.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + banners.length) % banners.length
    );
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      aria-label="Featured promotions"
      className="w-full px-0 sm:px-3 lg:px-5"
    >
      {/* Responsive banner container */}
      <div className="relative isolate h-[240px] w-full overflow-hidden bg-white sm:h-[360px] sm:rounded-xl md:h-[400px] lg:h-[450px] xl:h-[460px]">
        {/* Banner images */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex
                ? "z-0 opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority={index === 0}
              sizes="100vw"
              quality={95}
              className="object-cover object-fill"
            />
          </div>
        ))}

        {/* Text content */}
        {/* <div
          key={activeBanner.id}
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] flex w-full items-center"
        >
          <div className="pointer-events-auto ml-3 w-[65%] max-w-[600px] rounded-lg bg-white/90 p-3 text-gray-950 shadow-sm backdrop-blur-[2px] sm:ml-6 sm:w-[48%] sm:p-5 md:ml-10 md:w-[45%] md:p-7 lg:ml-14 lg:w-[42%] lg:p-9 xl:ml-20">
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-600 sm:mb-2 sm:text-xs sm:tracking-[0.18em] md:text-sm">
              {activeBanner.subtitle}
            </p>

            <h1 className="text-base font-bold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              {activeBanner.title}
            </h1>

            <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-gray-700 sm:mt-3 sm:text-xs sm:leading-5 md:text-sm md:leading-6 lg:text-base">
              {activeBanner.description}
            </p>

            <Button
              size="lg"
              className="mt-3 h-8 rounded-full bg-black px-4 text-xs font-semibold text-white hover:bg-gray-800 sm:mt-5 sm:h-10 sm:px-6 sm:text-sm"
            >
              <Link href={activeBanner.buttonLink}>
                {activeBanner.buttonText}
              </Link>
            </Button>
          </div>
        </div> */}

        {/* Previous / next controls */}
        <div className="absolute right-2 top-1/2 z-[3] flex -translate-y-1/2 flex-col gap-2 sm:right-4 sm:flex-row sm:gap-3 md:right-6">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous banner"
            onClick={previousSlide}
            className="size-8 rounded-full border-gray-300 bg-white/90 text-black shadow-sm hover:bg-white sm:size-10"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next banner"
            onClick={nextSlide}
            className="size-8 rounded-full border-gray-300 bg-white/90 text-black shadow-sm hover:bg-white sm:size-10"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </Button>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-0 left-0 z-[3] flex w-full items-center justify-center gap-2 pb-3 sm:pb-4 md:pb-5">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-white shadow-md ring-1 ring-black/20"
                  : "w-2 bg-white/70 shadow-sm hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Pause / play */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          onClick={() => setIsPlaying((playing) => !playing)}
          className="absolute bottom-2 right-2 z-[3] size-8 rounded-full border-gray-300 bg-white/90 text-black shadow-sm hover:bg-white sm:bottom-4 sm:right-4 sm:size-9"
        >
          {isPlaying ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
        </Button>
      </div>
    </section>
  );
}
