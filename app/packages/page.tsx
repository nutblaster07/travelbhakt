"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

type BackendPackage = {
  id: number;
  title: string;
  slug: string;
  destinationId: number;
  category: string;
  duration: string;
  price: number;
  description: string | null;
  image: string | null;
  isPublished: boolean;
};

const categories = [
  {
    label: "All Packages",
    value: "",
  },
  {
    label: "Most Popular",
    value: "MOST_POPULAR",
  },
  {
    label: "Holiday",
    value: "HOLIDAY",
  },
  {
    label: "Weekend",
    value: "WEEKEND",
  },
  {
    label: "Adventure",
    value: "ADVENTURE",
  },
];

function PackagesContent() {
  const searchParams = useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "";

  const [packages, setPackages] = useState<
    BackendPackage[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(false);

        const url = selectedCategory
      ? `${process.env.NEXT_PUBLIC_API_URL}/packages?category=${selectedCategory}`
      : `${process.env.NEXT_PUBLIC_API_URL}/packages`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            "Failed to fetch packages"
          );
        }

        const data: BackendPackage[] =
          await response.json();

        const publishedPackages = data.filter(
          (item) => item.isPublished
        );

        setPackages(publishedPackages);
      } catch (error) {
        console.error(
          "Error fetching packages:",
          error
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedCategory]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f3ed] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px] text-center text-[#756b63]">
          Loading packages...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#f7f3ed] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px] text-center text-red-500">
          Unable to load packages.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1440px]">

        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
            Explore India
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl lg:text-6xl">
            Find Your Next Journey
          </h1>

          <p className="mt-5 text-[#756b63]">
            Explore carefully curated travel experiences,
            beautiful destinations and unforgettable adventures.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive =
              selectedCategory === category.value;

            const href = category.value
              ? `/packages?category=${category.value}`
              : "/packages";

            return (
              <Link
                key={category.label}
                href={href}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#211c17] text-white"
                    : "border border-[#211c17]/15 bg-white text-[#211c17] hover:bg-[#211c17] hover:text-white"
                }`}
              >
                {category.label}
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-[#756b63]">
          {packages.length} package
          {packages.length !== 1 ? "s" : ""} found
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packages.map((item) => (
            <Link
              key={item.slug}
              href={`/packages/${item.slug}`}
              className="group overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={
                    item.image ??
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
                  }
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#211c17] backdrop-blur-md">
                  {item.category.replaceAll("_", " ")}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#8a7f76]">
                    <Clock size={14} />
                    {item.duration}
                  </div>

                  <span className="text-sm font-semibold text-[#c85a2b]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-2xl leading-tight text-[#211c17]">
                  {item.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#756b63]">
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

        {packages.length === 0 && (
          <div className="py-20 text-center text-[#756b63]">
            No packages found in this category.
          </div>
        )}
      </div>
    </main>
  );
}

export default function PackagesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f7f3ed] px-6 py-24">
          <div className="text-center text-[#756b63]">
            Loading packages...
          </div>
        </main>
      }
    >
      <PackagesContent />
    </Suspense>
  );
}