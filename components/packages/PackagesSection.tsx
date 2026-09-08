"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
} from "lucide-react";
import { useEffect, useRef } from "react";

type PackageItem = {
  title: string;
  slug: string;
  destination: string;
  duration: string;
  price: string;
  description: string;
  image: string;
};

type PackageSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  packages?: PackageItem[];
  viewAllHref?: string;
};

export default function PackageSection({
  eyebrow,
  title,
  description,
  packages = [],
  viewAllHref = "/packages",
}: PackageSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container || packages.length <= 1) return;

    const interval = setInterval(() => {
      if (isInteracting.current) return;

      const isAtEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10;

      if (isAtEnd) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: container.clientWidth * 0.85,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [packages.length]);

  const scrollLeft = () => {
    const container = scrollRef.current;

    if (!container) return;

    isInteracting.current = true;

    container.scrollBy({
      left: -(container.clientWidth * 0.85),
      behavior: "smooth",
    });

    setTimeout(() => {
      isInteracting.current = false;
    }, 3000);
  };

  const scrollRight = () => {
    const container = scrollRef.current;

    if (!container) return;

    isInteracting.current = true;

    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 10;

    if (isAtEnd) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: container.clientWidth * 0.85,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isInteracting.current = false;
    }, 3000);
  };

  return (
    <section className="bg-[#f7f3ed] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              {eyebrow}
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl">
              {title}
            </h2>

            <p className="mt-5 max-w-xl text-[#756b63]">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#211c17]"
            >
              View All Packages

              <ArrowUpRight
                size={18}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            {/* Navigation */}

            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                aria-label="Previous packages"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              >
                <ArrowLeft size={19} />
              </button>

              <button
                onClick={scrollRight}
                aria-label="Next packages"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Package Carousel */}

        <div
          ref={scrollRef}
          onMouseEnter={() => {
            isInteracting.current = true;
          }}
          onMouseLeave={() => {
            isInteracting.current = false;
          }}
          onTouchStart={() => {
            isInteracting.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isInteracting.current = false;
            }, 3000);
          }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
        >
          {packages.map((item) => (
            <Link
              key={item.slug}
              href={`/packages/${item.slug}`}
              className="group w-[85vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:w-[60vw] lg:w-[400px]"
            >
              {/* Image */}

              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#211c17] backdrop-blur-md">
                  <MapPin size={13} />
                  {item.destination}
                </div>
              </div>

              {/* Content */}

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#8a7f76]">
                    <Clock size={14} />
                    {item.duration}
                  </div>

                  <span className="text-sm font-semibold text-[#c85a2b]">
                    {item.price}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl leading-tight text-[#211c17]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#756b63]">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#c85a2b]">
                  Explore Package

                  <ArrowUpRight
                    size={17}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}