"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Quote,
  Star,
} from "lucide-react";

type Feedback = {
  id: number;
  name: string;
  location: string | null;
  packageName: string | null;
  image: string | null;
  rating: number;
  review: string;
  isPublished: boolean;
  sortOrder: number;
};

export default function MomentsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | null>(null);

  const isPausedRef = useRef(false);

  const resumeTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH TESTIMONIALS
  ========================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/testimonials`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch testimonials",
          );
        }

        const data = await response.json();

        const publishedTestimonials =
          data
            .filter(
              (testimonial: Feedback) =>
                testimonial.isPublished,
            )
            .sort(
              (a: Feedback, b: Feedback) =>
                a.sortOrder - b.sortOrder,
            );

        setFeedbacks(
          publishedTestimonials,
        );
      } catch (error) {
        console.error(
          "Error fetching testimonials:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  /* =========================
     AUTO SCROLL
  ========================= */

  useEffect(() => {
    const carousel = scrollRef.current;

    if (!carousel) return;

    if (feedbacks.length === 0) return;

    const autoScroll = () => {
      if (!isPausedRef.current) {
        const maxScroll =
          carousel.scrollWidth -
          carousel.clientWidth;

        carousel.scrollLeft += 0.45;

        if (
          carousel.scrollLeft >=
          maxScroll - 1
        ) {
          carousel.scrollLeft = 0;
        }
      }

      animationRef.current =
        requestAnimationFrame(
          autoScroll,
        );
    };

    animationRef.current =
      requestAnimationFrame(
        autoScroll,
      );

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current,
        );
      }

      if (resumeTimeoutRef.current) {
        clearTimeout(
          resumeTimeoutRef.current,
        );
      }
    };
  }, [feedbacks.length]);

  /* =========================
     PAUSE
  ========================= */

  const pauseAutoScroll = () => {
    isPausedRef.current = true;

    if (resumeTimeoutRef.current) {
      clearTimeout(
        resumeTimeoutRef.current,
      );
    }
  };

  const resumeAutoScroll = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(
        resumeTimeoutRef.current,
      );
    }

    resumeTimeoutRef.current =
      setTimeout(() => {
        isPausedRef.current = false;
      }, 1200);
  };

  /* =========================
     BUTTON SCROLL
  ========================= */

  const scroll = (
    direction: "left" | "right",
  ) => {
    const carousel =
      scrollRef.current;

    if (!carousel) return;

    pauseAutoScroll();

    carousel.scrollBy({
      left:
        direction === "left"
          ? -420
          : 420,
      behavior: "smooth",
    });

    resumeAutoScroll();
  };

  /* =========================
     WHEEL SCROLL
  ========================= */

  const handleWheel = (
    event: React.WheelEvent<HTMLDivElement>,
  ) => {
    const carousel =
      scrollRef.current;

    if (!carousel) return;

    if (
      Math.abs(event.deltaY) >
      Math.abs(event.deltaX)
    ) {
      carousel.scrollLeft +=
        event.deltaY;
    }

    pauseAutoScroll();

    resumeAutoScroll();
  };

  /* =========================
     LOADING / EMPTY STATE
  ========================= */

  if (
    !loading &&
    feedbacks.length === 0
  ) {
    return null;
  }

  return (
    <section
      id="moments"
      className="overflow-hidden bg-[#211c17] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-7 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-12">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#c85a2b] sm:text-xs">
              TravelBhakt Moments
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Memories From The Road
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg">
              Real journeys, unforgettable moments
              and stories shared by travellers
              who explored India with us.
            </p>
          </div>

          {/* Desktop Controls */}

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() =>
                scroll("left")
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#211c17]"
              aria-label="Previous feedback"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() =>
                scroll("right")
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#211c17]"
              aria-label="Next feedback"
            >
              <ArrowRight size={20} />
            </button>
          </div>

        </div>

        {/* ================= CAROUSEL ================= */}

        {loading ? (

          <div className="mt-10 px-5 sm:px-8 lg:px-12">
            <p className="text-white/60">
              Loading traveller stories...
            </p>
          </div>

        ) : (

          <div
            ref={scrollRef}
            onMouseEnter={
              pauseAutoScroll
            }
            onMouseLeave={
              resumeAutoScroll
            }
            onTouchStart={
              pauseAutoScroll
            }
            onTouchEnd={
              resumeAutoScroll
            }
            onWheel={
              handleWheel
            }
            className="
              mt-10
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

            {feedbacks.map(
              (feedback) => (

                <article
                  key={feedback.id}
                  className="
                    flex
                    min-w-[86vw]
                    max-w-[86vw]
                    shrink-0
                    overflow-hidden
                    rounded-[26px]
                    bg-[#f7f3ed]
                    sm:min-w-[480px]
                    sm:max-w-[480px]
                    lg:min-w-[560px]
                    lg:max-w-[560px]
                  "
                >

                  {/* Image */}

                  <div className="relative hidden w-[38%] overflow-hidden sm:block">

                    {feedback.image ? (
                      <img
                        src={feedback.image}
                        alt={`${feedback.name}'s travel experience`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#d8cfc4]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {feedback.packageName && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs font-medium text-white">

                        <MapPin size={14} />

                        {feedback.packageName}

                      </div>
                    )}

                  </div>

                  {/* Feedback Content */}

                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">

                    <Quote
                      size={38}
                      className="absolute right-6 top-6 text-[#c85a2b]/20"
                    />

                    {/* Rating */}

                    <div className="flex gap-1">

                      {Array.from({
                        length: feedback.rating,
                      }).map(
                        (_, index) => (

                          <Star
                            key={index}
                            size={15}
                            className="fill-[#c85a2b] text-[#c85a2b]"
                          />

                        ),
                      )}

                    </div>

                    {/* Review */}

                    <p className="mt-5 text-[16px] leading-7 text-[#4b423b] sm:text-lg sm:leading-8">
                      “{feedback.review}”
                    </p>

                    {/* User */}

                    <div className="mt-auto border-t border-[#ded6cc] pt-5">

                      <div className="flex items-center gap-3">

                        {/* Mobile Avatar */}

                        {feedback.image ? (
                          <img
                            src={
                              feedback.image
                            }
                            alt={
                              feedback.name
                            }
                            className="h-11 w-11 rounded-full object-cover sm:hidden"
                          />
                        ) : (
                          <div className="h-11 w-11 rounded-full bg-[#d8cfc4] sm:hidden" />
                        )}

                        <div>

                          <h3 className="font-semibold text-[#211c17]">
                            {feedback.name}
                          </h3>

                          {feedback.location && (
                            <p className="mt-1 text-xs text-[#756b63]">
                              {
                                feedback.location
                              }
                            </p>
                          )}

                        </div>

                      </div>

                      {/* Destination Mobile */}

                      {feedback.packageName && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-[#c85a2b] sm:hidden">

                          <MapPin size={14} />

                          Travelled to{" "}
                          {
                            feedback.packageName
                          }

                        </div>
                      )}

                    </div>

                  </div>

                </article>

              ),
            )}

          </div>

        )}

        {/* ================= MOBILE CONTROLS ================= */}

        {!loading &&
          feedbacks.length > 0 && (

          <div className="mt-2 flex items-center justify-center gap-3 lg:hidden">

            <button
              type="button"
              onClick={() =>
                scroll("left")
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Previous feedback"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() =>
                scroll("right")
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Next feedback"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        )}

      </div>
    </section>
  );
}