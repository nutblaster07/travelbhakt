"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useRef } from "react";

const blogs = [
  {
    title: "7 Places in Northeast India That Don't Feel Real",
    slug: "7-places-in-northeast-india",
    category: "Northeast India",
    readTime: "6 min read",
    description:
      "From living root bridges to Himalayan monasteries, discover places that make Northeast India feel like another world.",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "A Complete Guide to Tawang",
    slug: "complete-guide-to-tawang",
    category: "Travel Guide",
    readTime: "8 min read",
    description:
      "Everything you need to know before planning your journey to the mountains of Tawang.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Best Time to Visit Meghalaya",
    slug: "best-time-to-visit-meghalaya",
    category: "Travel Tips",
    readTime: "5 min read",
    description:
      "Plan your Meghalaya trip at the right time and experience its waterfalls, clouds and green landscapes.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

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
    }, 3500);

    return () => clearInterval(interval);
  }, []);

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
    <section
      id="blog"
      className="bg-[#f7f3ed] px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              Travel Stories
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl">
              Stories that inspire
              <br />
              your next journey.
            </h2>

            <p className="mt-5 max-w-xl text-[#756b63]">
              Travel guides, stories and useful tips to help you discover
              India in a different way.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#211c17]"
            >
              View All Stories

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {/* Manual navigation */}
            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                aria-label="Previous travel stories"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              >
                <ArrowLeft size={19} />
              </button>

              <button
                onClick={scrollRight}
                aria-label="Next travel stories"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Blog carousel */}
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
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group w-[85vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:w-[60vw] lg:w-[420px]"
            >
              {/* Image */}
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#211c17] backdrop-blur-md">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center gap-2 text-xs text-[#8a7f76]">
                  <Clock size={14} />
                  {blog.readTime}
                </div>

                <h3 className="mt-4 font-serif text-2xl leading-tight text-[#211c17]">
                  {blog.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#756b63]">
                  {blog.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#c85a2b]">
                  Read Article

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