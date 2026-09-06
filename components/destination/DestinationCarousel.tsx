"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "Meghalaya",
    location: "Northeast India",
    description: "Cloud-covered hills, living root bridges and hidden caves.",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Assam",
    location: "Northeast India",
    description: "Tea gardens, the Brahmaputra and unforgettable wildlife.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Tea_gardens_of_Kaziranga_National_Park%2C_Assam.jpg",
  },
  {
    name: "Sikkim",
    location: "Eastern Himalayas",
    description: "Snow-covered mountains, monasteries and peaceful valleys.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tawang",
    location: "Arunachal Pradesh",
    description: "Ancient monasteries, Himalayan roads and breathtaking valleys.",
    image:
      "https://media1.thrillophilia.com/filestore/cnq6h48ewxmhwvq15gbhib2f9d7e_shutterstock_1588340653.jpg",
  },
  {
    name: "Kerala",
    location: "South India",
    description: "Backwaters, beaches, forests and slow unforgettable journeys.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
];

export default function DestinationCarousel() {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainer.current) return;

    const amount = 350;

    scrollContainer.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="destinations" className="bg-[#f7f3ed] py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between px-6 lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b84f25]">
              Go somewhere different
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#211c17] sm:text-5xl">
              Places That Stay With You
            </h2>

            <p className="mt-4 max-w-xl text-[#756b63]">
              Discover landscapes, cultures and stories that make every journey
              unforgettable.
            </p>
          </div>

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

        {/* Carousel */}
        <div
          ref={scrollContainer}
          className="flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide lg:px-12"
        >
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              {...destination}
            />
          ))}
        </div>
      </div>
    </section>
  );
}