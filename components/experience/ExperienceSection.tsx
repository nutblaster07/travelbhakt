"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    title: "Mountains",
    slug: "mountains",
    subtitle: "Where the roads touch the sky",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Spiritual India",
    slug: "spiritual-india",
    subtitle: "Journeys beyond destinations",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Wildlife",
    slug: "wildlife",
    subtitle: "Into India's untamed heart",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Road Trips",
    slug: "road-trips",
    subtitle: "The journey is the destination",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function ExperienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let isPaused = false;

    const speed = 30;

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

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationFrameId);

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

  /* ================= DUPLICATE FOR LOOP ================= */

  const loopingExperiences = [
    ...experiences,
    ...experiences,
  ];

  return (
    <section
      id="experiences"
      className="overflow-hidden bg-[#211c17] py-24 text-white"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* Heading */}

        <div className="mb-12 px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
            Travel your way
          </p>

          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Every traveller seeks
            <br />
            something different.
          </h2>

          <p className="mt-5 max-w-xl text-white/60">
            Choose the kind of journey you want, and discover
            places across India that match your travel story.
          </p>
        </div>

        {/* ================= EXPERIENCE CAROUSEL ================= */}

        <div
          ref={scrollRef}
          className="flex w-full flex-nowrap gap-5 overflow-x-auto px-6 pb-5 scrollbar-hide lg:px-12"
        >
          {loopingExperiences.map(
            (experience, index) => (
              <Link
                key={`${experience.slug}-${index}`}
                href={`/experiences/${experience.slug}`}
                className="group relative block h-[400px] w-[300px] shrink-0 overflow-hidden rounded-3xl sm:w-[380px] lg:w-[440px]"
              >
                {/* Image */}

                <img
                  src={experience.image}
                  alt={experience.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content */}

                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                  <p className="text-sm text-white/70">
                    {experience.subtitle}
                  </p>

                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h3 className="font-serif text-3xl sm:text-4xl">
                      {experience.title}
                    </h3>

                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:rotate-45"
                      aria-label={`Explore ${experience.title}`}
                    >
                      <ArrowUpRight size={21} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

      </div>
    </section>
  );
}