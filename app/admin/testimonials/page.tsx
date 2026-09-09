"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Pencil,
  Star,
  MapPin,
  Quote,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  location: string | null;
  review: string;
  rating: number;
  image: string | null;
  packageName: string | null;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

       const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/testimonials`,
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load testimonials",
          );
        }

        const data: Testimonial[] =
          await response.json();

        setTestimonials(
          data.sort(
            (a, b) =>
              a.sortOrder - b.sortOrder,
          ),
        );
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load testimonials. Please check if the backend is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2
          size={32}
          className="animate-spin text-[#c85a2b]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
              Traveller Stories
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
              Testimonials
            </h1>

            <p className="mt-3 text-[#756b63]">
              Manage reviews and experiences shared by your travellers.
            </p>
          </div>

          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white transition hover:bg-[#a94720]"
          >
            <Plus size={18} />

            Add Testimonial
          </Link>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}

        {!error &&
          testimonials.length === 0 && (
            <div className="mt-10 rounded-[32px] bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">
                <Quote size={30} />
              </div>

              <h2 className="mt-6 font-serif text-3xl text-[#211c17]">
                No testimonials yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-[#756b63]">
                Add traveller reviews and experiences to build trust with your visitors.
              </p>

              <Link
                href="/admin/testimonials/new"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white"
              >
                <Plus size={18} />

                Add Your First Testimonial
              </Link>
            </div>
          )}

        {/* Testimonials Grid */}

        {testimonials.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map(
              (testimonial) => (
                <div
                  key={testimonial.id}
                  className="overflow-hidden rounded-[28px] bg-white shadow-sm"
                >
                  <div className="p-6">

                    {/* Top */}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">

                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-14 w-14 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c85a2b]/10 font-serif text-xl text-[#c85a2b]">
                            {testimonial.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div>
                          <h2 className="font-serif text-xl text-[#211c17]">
                            {testimonial.name}
                          </h2>

                          {testimonial.location && (
                            <p className="mt-1 flex items-center gap-1 text-xs text-[#756b63]">
                              <MapPin size={12} />

                              {testimonial.location}
                            </p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          testimonial.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-[#211c17]/10 text-[#756b63]"
                        }`}
                      >
                        {testimonial.isPublished
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>

                    {/* Rating */}

                    <div className="mt-6 flex gap-1">
                      {Array.from({
                        length: testimonial.rating,
                      }).map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className="fill-[#c85a2b] text-[#c85a2b]"
                        />
                      ))}
                    </div>

                    {/* Review */}

                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-[#756b63]">
                      “{testimonial.review}”
                    </p>

                    {/* Package */}

                    {testimonial.packageName && (
                      <div className="mt-5 rounded-xl bg-[#f7f3ed] px-4 py-3 text-sm text-[#756b63]">
                        Travelled to{" "}

                        <span className="font-semibold text-[#211c17]">
                          {testimonial.packageName}
                        </span>
                      </div>
                    )}

                    {/* Footer */}

                    <div className="mt-6 flex items-center justify-between border-t border-[#211c17]/10 pt-5">
                      <span className="text-xs text-[#756b63]">
                        Order: {testimonial.sortOrder}
                      </span>

                      <Link
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#211c17] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#c85a2b]"
                      >
                        <Pencil size={15} />

                        Edit
                      </Link>
                    </div>

                  </div>
                </div>
              ),
            )}
          </div>
        )}

      </div>
    </div>
  );
}