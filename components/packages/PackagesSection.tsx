"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  MessageCircle,
  Mail,
} from "lucide-react";

type Package = {
  title: string;
  slug: string;
  destination: string;
  duration: string;
  price: string;
  image: string;
  description: string;
};

const packages: Package[] = [
  {
    title: "Meghalaya Explorer",
    slug: "meghalaya-explorer",
    destination: "Meghalaya",
    duration: "5 Days / 4 Nights",
    price: "₹18,999",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore living root bridges, cascading waterfalls, crystal-clear rivers and the pristine beauty of Meghalaya.",
  },
  {
    title: "Sikkim Himalayan Journey",
    slug: "sikkim-himalayan-journey",
    destination: "Sikkim",
    duration: "6 Days / 5 Nights",
    price: "₹24,999",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    description:
      "Experience monasteries, alpine lakes, snow-covered mountains and the peaceful beauty of Sikkim.",
  },
  {
    title: "Assam Wildlife Escape",
    slug: "assam-wildlife-escape",
    destination: "Assam",
    duration: "4 Days / 3 Nights",
    price: "₹16,999",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover wildlife, tea gardens, river cruises and unforgettable experiences across Assam.",
  },
];

type PackagesSectionProps = {
  onInquiry: (
    packageName: string,
    destinationName: string
  ) => void;
};

export default function PackagesSection({
  onInquiry,
}: PackagesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const speed = 35;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      lastTime = currentTime;

      if (!isPaused) {
        const pixelsToMove =
          (speed * deltaTime) / 1000;

        container.scrollLeft += pixelsToMove;

        const firstSetWidth =
          container.scrollWidth / 2;

        if (
          firstSetWidth > 0 &&
          container.scrollLeft >= firstSetWidth
        ) {
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

  /* ================= MANUAL SCROLL ================= */

  const scroll = (
    direction: "left" | "right"
  ) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        direction === "left"
          ? -420
          : 420,
      behavior: "smooth",
    });
  };

  const whatsappNumber = "919999999999";

  /*
    Duplicate packages for continuous
    infinite horizontal scrolling.
  */

  const loopingPackages = [
    ...packages,
    ...packages,
  ];

  return (
    <section
      id="packages"
      className="overflow-hidden bg-[#f7f3ed] px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#c85a2b]">
              TravelBhakt Packages
            </p>

            <h2 className="mt-4 font-serif text-5xl text-[#211c17] sm:text-6xl lg:text-7xl">
              Explore Our Packages
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#756b63]">
              Discover carefully curated journeys across India.
              Handpicked destinations, authentic experiences and
              seamless travel planning.
            </p>
          </div>

          {/* Controls */}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8cec4] text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              aria-label="Previous packages"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8cec4] text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
              aria-label="Next packages"
            >
              <ArrowRight size={20} />
            </button>

            <Link
              href="/packages"
              className="flex items-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white transition hover:bg-[#a94720]"
            >
              View All Packages
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Packages Carousel */}

        <div
          ref={scrollRef}
          className="mt-12 flex w-full flex-nowrap gap-6 overflow-x-auto pb-6 scrollbar-hide"
        >
          {loopingPackages.map((pkg, index) => (
            <article
              key={`${pkg.slug}-${index}`}
              className="w-[320px] shrink-0 overflow-hidden rounded-[28px] bg-white shadow-sm sm:w-[380px]"
            >
              {/* Image */}

              <div className="group relative h-[280px] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <MapPin size={15} />
                  {pkg.destination}
                </div>
              </div>

              {/* Content */}

              <div className="p-6">
                <h3 className="font-serif text-3xl text-[#211c17]">
                  {pkg.title}
                </h3>

                {/* Meta */}

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#756b63]">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-[#c85a2b]"
                    />
                    {pkg.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin
                      size={16}
                      className="text-[#c85a2b]"
                    />
                    {pkg.destination}
                  </div>
                </div>

                {/* Description */}

                <p className="mt-5 leading-relaxed text-[#756b63]">
                  {pkg.description}
                </p>

                {/* Price */}

                <div className="mt-6 border-t border-[#eee7de] pt-5">
                  <p className="text-sm text-[#756b63]">
                    Starting from
                  </p>

                  <p className="mt-1 text-3xl font-bold text-[#c85a2b]">
                    {pkg.price}
                  </p>
                </div>

                {/* Buttons */}

                <div className="mt-6 flex w-full flex-nowrap gap-2">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-[#211c17] px-3 py-3 text-xs font-semibold text-white transition hover:bg-black"
                  >
                    Details
                    <ArrowUpRight size={15} />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      onInquiry(
                        pkg.title,
                        pkg.destination
                      )
                    }
                    className="flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-[#c85a2b] px-3 py-3 text-xs font-semibold text-[#c85a2b] transition hover:bg-[#c85a2b] hover:text-white"
                  >
                    <Mail size={15} />
                    Inquiry
                  </button>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `Hello TravelBhakt, I am interested in the ${pkg.title} package in ${pkg.destination}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-[#25D366] px-3 py-3 text-xs font-semibold text-white transition hover:opacity-90"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-10 text-center">
          <p className="italic text-[#756b63]">
            More journeys, more stories waiting for you...
          </p>

          <Link
            href="/packages"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-[#c85a2b]"
          >
            Explore all journeys
            <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}