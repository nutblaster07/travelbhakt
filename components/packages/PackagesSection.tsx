"use client";

import { useEffect, useState } from "react";
import PackageSection, {
  PackageItem,
} from "./PackageSection";

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

export default function PackagesSection() {
  const [packages, setPackages] = useState<BackendPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/packages`
      );

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
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
  }, []);

  const formatPackage = (
    item: BackendPackage
  ): PackageItem => {
    return {
      title: item.title,

      slug: item.slug,

      destination: "India",

      duration: item.duration,

      price: `₹${item.price.toLocaleString(
        "en-IN"
      )}`,

      description: item.description ?? "",

      image:
        item.image ??
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    };
  };

  const mostPopularPackages = packages
    .filter(
      (item) =>
        item.category === "MOST_POPULAR"
    )
    .map(formatPackage);

  const holidayPackages = packages
    .filter(
      (item) => item.category === "HOLIDAY"
    )
    .map(formatPackage);

  const weekendPackages = packages
    .filter(
      (item) => item.category === "WEEKEND"
    )
    .map(formatPackage);

  const adventurePackages = packages
    .filter(
      (item) =>
        item.category === "ADVENTURE"
    )
    .map(formatPackage);

  if (loading) {
    return (
      <section className="bg-[#f7f3ed] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px] text-center text-[#756b63]">
          Loading packages...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#f7f3ed] px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px] text-center text-red-500">
          Unable to load packages.
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Most Popular Packages */}

      {mostPopularPackages.length > 0 && (
        <PackageSection
          eyebrow="Most Popular"
          title="Most Popular Packages"
          description="Discover our most loved travel experiences and unforgettable journeys."
          packages={mostPopularPackages}
          viewAllHref="/packages?category=MOST_POPULAR"
        />
      )}

      {/* Holiday Packages */}

      {holidayPackages.length > 0 && (
        <PackageSection
          eyebrow="Holiday Packages"
          title="Holiday Packages"
          description="Relax, explore and create unforgettable memories with perfectly planned holidays."
          packages={holidayPackages}
          viewAllHref="/packages?category=HOLIDAY"
        />
      )}

      {/* Weekend Trips */}

      {weekendPackages.length > 0 && (
        <PackageSection
          eyebrow="Weekend Trips"
          title="Weekend Trips"
          description="Short escapes and refreshing journeys for your perfect weekend."
          packages={weekendPackages}
          viewAllHref="/packages?category=WEEKEND"
        />
      )}

      {/* Adventure Tours */}

      {adventurePackages.length > 0 && (
        <PackageSection
          eyebrow="Adventure Tours"
          title="Adventure Tours"
          description="Experience thrilling journeys, mountains, trails and unforgettable adventures."
          packages={adventurePackages}
          viewAllHref="/packages?category=ADVENTURE"
        />
      )}
    </>
  );
}