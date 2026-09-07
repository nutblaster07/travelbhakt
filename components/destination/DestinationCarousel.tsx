"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "Meghalaya",
    location: "Northeast India",
    description:
      "Cloud-covered hills, living root bridges and hidden caves.",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Assam",
    location: "Northeast India",
    description:
      "Tea gardens, the Brahmaputra and unforgettable wildlife.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Tea_gardens_of_Kaziranga_National_Park%2C_Assam.jpg",
  },
  {
    name: "Sikkim",
    location: "Eastern Himalayas",
    description:
      "Snow-covered mountains, monasteries and peaceful valleys.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tawang",
    location: "Arunachal Pradesh",
    description:
      "Ancient monasteries, Himalayan roads and breathtaking valleys.",
    image:
      "https://media1.thrillophilia.com/filestore/cnq6h48ewxmhwvq15gbhib2f9d7e_shutterstock_1588340653.jpg",
  },
  {
    name: "Kerala",
    location: "South India",
    description:
      "Backwaters, beaches, forests and slow unforgettable journeys.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
];

export default function DestinationCarousel() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    const container = scrollContainer.current;

    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const speed = 35; // pixels per second

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      lastTime = currentTime;

      if (!isPaused) {
        const pixelsToMove =
          (speed * deltaTime) / 1000;

        container.scrollLeft += pixelsToMove;

        /*
          The destination array is duplicated.
          When the first set finishes scrolling,
          return to the start seamlessly.
        */

        const firstSetWidth =
          container.scrollWidth / 2;

        if (container.scrollLeft >= firstSetWidth) {
          container.scrollLeft -= firstSetWidth;
        }
      }

      animationFrameId =
        requestAnimationFrame(animate);
    };

    animationFrameId =
      requestAnimationFrame(animate);

    const pause = () => {
      isPaused = true;
    };

    const resume = () => {
      isPaused = false;
      lastTime = performance.now();
    };

    container.addEventListener(
      "mouseenter",
      pause
    );

    container.addEventListener(
      "mouseleave",
      resume
    );

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      container.removeEventListener(
        "mouseenter",
        pause
      );

      container.removeEventListener(
        "mouseleave",
        resume
      );
    };
  }, []);

  /* ================= MANUAL BUTTON SCROLL ================= */

  const scroll = (
    direction: "left" | "right"
  ) => {
    if (!scrollContainer.current) return;

    scrollContainer.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  /*
    Duplicate destinations for infinite scrolling.
  */

  const loopingDestinations = [
    ...destinations,
    ...destinations,
  ];

  return (
    <section className="overflow-hidden bg-[#f7f3ed] py-24">
      <div className="mx-auto max-w-[1440px]">

        {/* ================= HEADING ================= */}

        <div className="mb-10 flex items-end justify-between px-6 lg:px-12">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b84f25]">
              Go somewhere different
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#211c17] sm:text-5xl">
              Places That Stay With You
            </h2>

            <p className="mt-4 max-w-xl text-[#756b63]">
              Discover landscapes, cultures and stories that make every
              journey unforgettable.
            </p>
          </div>

          {/* ================= CONTROLS ================= */}

          <div className="hidden gap-3 md:flex">

            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8cec4] transition hover:bg-[#211c17] hover:text-white"
              aria-label="Previous destinations"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8cec4] transition hover:bg-[#211c17] hover:text-white"
              aria-label="Next destinations"
            >
              <ChevronRight size={21} />
            </button>

          </div>
        </div>

        {/* ================= CAROUSEL ================= */}

        <div
          ref={scrollContainer}
          className="flex w-full flex-nowrap gap-5 overflow-x-auto px-6 pb-5 scrollbar-hide lg:px-12"
        >
          {loopingDestinations.map(
            (destination, index) => (
              <DestinationCard
                key={`${destination.name}-${index}`}
                {...destination}
              />
            )
          )}
        </div>

      </div>
    </section>
  );
}