"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Check,
} from "lucide-react";

type Package = {
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

export default function PackageDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [packageData, setPackageData] =
    useState<Package | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [slug, setSlug] = useState("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    getParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchPackage = async () => {
      try {
        setLoading(true);

       const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/packages/slug/${slug}`
    );

        if (!response.ok) {
          throw new Error("Package not found");
        }

        const data: Package = await response.json();

        setPackageData(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">
        <p className="text-[#756b63]">
          Loading package...
        </p>
      </main>
    );
  }

  if (error || !packageData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#f7f3ed]">
        <h1 className="font-serif text-3xl text-[#211c17]">
          Package not found
        </h1>

        <Link
          href="/packages"
          className="rounded-full bg-[#211c17] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Packages
        </Link>
      </main>
    );
  }

  const image =
    packageData.image ??
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85";

  return (
    <main className="bg-[#f7f3ed]">
      {/* HERO */}

      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={image}
          alt={packageData.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        {/* Back Button */}

        <Link
          href="/packages"
          className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[#211c17] backdrop-blur-md transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to Packages
        </Link>

        {/* Hero Content */}

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold tracking-[0.2em] text-white backdrop-blur-md">
              {packageData.category.replace("_", " ")}
            </span>

            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight text-white md:text-6xl lg:text-7xl">
              {packageData.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {packageData.description}
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS */}

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_380px]">
          {/* Left Content */}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              Your Journey
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#211c17]">
              Experience the journey
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#756b63]">
              {packageData.description}
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl bg-white p-6">
                <Clock className="text-[#c85a2b]" size={24} />

                <p className="mt-4 text-sm text-[#756b63]">
                  Duration
                </p>

                <p className="mt-1 font-semibold text-[#211c17]">
                  {packageData.duration}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6">
                <MapPin
                  className="text-[#c85a2b]"
                  size={24}
                />

                <p className="mt-4 text-sm text-[#756b63]">
                  Destination
                </p>

                <p className="mt-1 font-semibold text-[#211c17]">
                  India
                </p>
              </div>
            </div>

            {/* Highlights */}

            <div className="mt-12">
              <h3 className="font-serif text-3xl text-[#211c17]">
                Package Highlights
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Comfortable accommodation",
                  "Scenic sightseeing",
                  "Memorable travel experiences",
                  "Professional travel assistance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-[#756b63]"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c85a2b]/10 text-[#c85a2b]">
                      <Check size={15} />
                    </div>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}

          <aside>
            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-sm text-[#756b63]">
                Starting from
              </p>

              <p className="mt-2 font-serif text-5xl text-[#211c17]">
                ₹{packageData.price.toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-sm text-[#756b63]">
                per person
              </p>

              <div className="my-8 h-px bg-[#211c17]/10" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-[#756b63]">
                  <Clock size={18} className="text-[#c85a2b]" />

                  {packageData.duration}
                </div>

                <div className="flex items-center gap-3 text-sm text-[#756b63]">
                  <Calendar
                    size={18}
                    className="text-[#c85a2b]"
                  />

                  Flexible travel dates
                </div>
              </div>

              <Link
                href={`/inquiry?package=${packageData.slug}`}
                className="mt-8 flex w-full items-center justify-center rounded-full bg-[#c85a2b] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#a94720]"
              >
                Enquire Now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}