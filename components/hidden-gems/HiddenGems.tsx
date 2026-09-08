"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

const hiddenGems = [
  {
    name: "Majuli",
    state: "Assam",
    description:
      "A river island shaped by culture, monasteries and the Brahmaputra.",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85",
    slug: "majuli",
  },
  {
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    description:
      "Quiet valleys, green landscapes and a world that moves slowly.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
    slug: "ziro-valley",
  },
  {
    name: "Mawlynnong",
    state: "Meghalaya",
    description:
      "A peaceful village surrounded by rain, forests and living traditions.",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=85",
    slug: "mawlynnong",
  },
  {
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    description:
      "High-altitude roads, dramatic mountains and endless Himalayan silence.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
    slug: "spiti-valley",
  },
];

export default function HiddenGems() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const interval = setInterval(() => {
      if (isInteracting.current) return;

      const cardWidth = container.clientWidth * 0.85;
      const gap = 20;

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
          left: cardWidth + gap,
          behavior: "smooth",
        });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (!scrollRef.current) return;

    isInteracting.current = true;

    scrollRef.current.scrollBy({
      left: -(scrollRef.current.clientWidth * 0.85),
      behavior: "smooth",
    });

    setTimeout(() => {
      isInteracting.current = false;
    }, 3000);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    isInteracting.current = true;

    const container = scrollRef.current;

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
      id="hidden-gems"
      className="bg-[#f3eee6] px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b84f25]">
              Beyond The Obvious
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl lg:text-6xl">
              Hidden Gems
              <br />
              Worth Finding.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            <p className="max-w-md text-base leading-relaxed text-[#756b63]">
              Step away from the usual tourist routes and discover places that
              still feel personal, peaceful and beautifully unexplored.
            </p>

            {/* Manual Navigation */}
            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                aria-label="Previous hidden gems"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              >
                <ArrowLeft size={19} />
              </button>

              <button
                onClick={scrollRight}
                aria-label="Next hidden gems"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
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
          {hiddenGems.map((place) => (
            <Link
              key={place.name}
              href={`/hidden-gems/${place.slug}`}
              className="group relative block w-[85vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-[#211c17] sm:w-[60vw] lg:w-[420px]"
            >
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin size={15} />
                  {place.state}
                </div>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl text-white">
                      {place.name}
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                      {place.description}
                    </p>
                  </div>

                  <div className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#211c17] transition duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}