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
  onInquiry?: (
    packageName: string,
    destinationName: string
  ) => void;
};

export default function PackagesSection({
  onInquiry,
}: PackagesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | null>(null);

  const isPausedRef = useRef(false);

  const resumeTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const whatsappNumber = "919999999999";

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {
    const carousel = scrollRef.current;

    if (!carousel) return;

    const autoScroll = () => {
      if (!isPausedRef.current) {
        const maxScroll =
          carousel.scrollWidth - carousel.clientWidth;

        carousel.scrollLeft += 0.5;

        /*
          Reset when the carousel reaches the end.
          Small reset keeps the movement smooth.
        */

        if (carousel.scrollLeft >= maxScroll - 1) {
          carousel.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(autoScroll);
    };

    animationRef.current =
      requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  /* =========================
     PAUSE / RESUME
  ========================= */

  const pauseAutoScroll = () => {
    isPausedRef.current = true;

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const resumeAutoScroll = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1200);
  };

  /* =========================
     MANUAL BUTTON SCROLL
  ========================= */

  const scroll = (direction: "left" | "right") => {
    const carousel = scrollRef.current;

    if (!carousel) return;

    pauseAutoScroll();

    carousel.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });

    resumeAutoScroll();
  };

  /* =========================
     MOUSE WHEEL
  ========================= */

  const handleWheel = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    const carousel = scrollRef.current;

    if (!carousel) return;

    /*
      Convert vertical mouse wheel
      movement into horizontal carousel scroll.
    */

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      carousel.scrollLeft += event.deltaY;
    }

    pauseAutoScroll();
    resumeAutoScroll();
  };

  return (
    <section
      id="packages"
      className="overflow-hidden bg-[#f7f3ed] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-7 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c85a2b] sm:text-xs">
              TravelBhakt Packages
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl lg:text-6xl">
              Explore Our Packages
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#756b63] sm:text-base lg:text-lg">
              Carefully curated journeys designed to help you experience
              India beyond the ordinary.
            </p>
          </div>

          {/* Desktop Controls */}

          <div className="hidden items-center gap-3 lg:flex">
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
              className="flex items-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a94720]"
            >
              View All
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        {/* ================= CAROUSEL ================= */}

        <div
          ref={scrollRef}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          onWheel={handleWheel}
          className="
            mt-9
            flex
            gap-4
            overflow-x-auto
            overflow-y-hidden
            px-5
            pb-5
            sm:gap-6
            sm:px-8
            lg:mt-12
            lg:px-12
            scrollbar-hide
            cursor-grab
            active:cursor-grabbing
          "
        >
          {packages.map((pkg) => (
            <article
              key={pkg.slug}
              className="
                group
                relative
                flex
                min-w-[88vw]
                max-w-[88vw]
                shrink-0
                flex-col
                overflow-hidden
                rounded-[24px]
                bg-white
                shadow-[0_10px_35px_rgba(33,28,23,0.08)]
                sm:min-w-[480px]
                sm:max-w-[480px]
                lg:min-w-[520px]
                lg:max-w-[520px]
              "
            >
              {/* IMAGE */}

              <div className="relative h-[210px] overflow-hidden sm:h-[250px]">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Destination */}

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                  <MapPin size={14} />
                  {pkg.destination}
                </div>

                {/* WhatsApp */}

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello TravelBhakt, I am interested in the ${pkg.title} package.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact us on WhatsApp about ${pkg.title}`}
                  className="
                    absolute
                    bottom-4
                    right-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#25D366]
                    text-white
                    shadow-lg
                    transition
                    hover:scale-105
                  "
                >
                  <MessageCircle size={21} />
                </a>
              </div>

              {/* CONTENT */}

              <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Title */}

                <h3 className="font-serif text-[28px] leading-tight text-[#211c17] sm:text-3xl">
                  {pkg.title}
                </h3>

                {/* Meta */}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#756b63] sm:text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={15}
                      className="text-[#c85a2b]"
                    />

                    {pkg.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin
                      size={15}
                      className="text-[#c85a2b]"
                    />

                    {pkg.destination}
                  </div>
                </div>

                {/* Description */}

                <p className="mt-4 text-sm leading-6 text-[#756b63]">
                  {pkg.description}
                </p>

                {/* Price */}

                <div className="mt-5 border-t border-[#eee7de] pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#756b63]">
                        Starting from
                      </p>

                      <p className="mt-1 text-2xl font-bold text-[#c85a2b] sm:text-3xl">
                        {pkg.price}
                      </p>
                    </div>

                    <p className="pb-1 text-xs text-[#756b63]">
                      Per person
                    </p>
                  </div>
                </div>

                {/* BUTTONS */}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-[#211c17]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-black
                    "
                  >
                    Details

                    <ArrowUpRight size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      onInquiry?.(
                        pkg.title,
                        pkg.destination
                      )
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#c85a2b]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#c85a2b]
                      transition
                      hover:bg-[#c85a2b]
                      hover:text-white
                    "
                  >
                    <Mail size={16} />

                    Inquiry
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ================= MOBILE CONTROLS ================= */}

        <div className="mt-2 flex items-center justify-between px-5 lg:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cec4] text-[#211c17]"
              aria-label="Previous packages"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cec4] text-[#211c17]"
              aria-label="Next packages"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <Link
            href="/packages"
            className="flex items-center gap-1 text-sm font-semibold text-[#c85a2b]"
          >
            View all
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}