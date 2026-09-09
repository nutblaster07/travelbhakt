"use client";

import { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

type PackageData = {
  id: number;
  isPublished: boolean;
};

type DestinationData = {
  id: number;
  isPublished: boolean;
};

type InquiryData = {
  id: number;
  status: string;
};

export default function AdminDashboard() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [destinations, setDestinations] =
    useState<DestinationData[]>([]);
  const [inquiries, setInquiries] =
    useState<InquiryData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("accessToken");

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const [
          packagesResponse,
          destinationsResponse,
          inquiriesResponse,
        ] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/packages`, {
        headers,
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
        headers,
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        headers,
        }),
        ]);

        const [
          packagesData,
          destinationsData,
          inquiriesData,
        ] = await Promise.all([
          packagesResponse.json(),
          destinationsResponse.json(),
          inquiriesResponse.json(),
        ]);

        if (
          !packagesResponse.ok ||
          !destinationsResponse.ok ||
          !inquiriesResponse.ok
        ) {
          console.error("Packages response:", packagesData);
          console.error(
            "Destinations response:",
            destinationsData
          );
          console.error(
            "Inquiries response:",
            inquiriesData
          );

          throw new Error(
            "Failed to load dashboard data. Please check your login token and API permissions."
          );
        }

        setPackages(
          Array.isArray(packagesData)
            ? packagesData
            : []
        );

        setDestinations(
          Array.isArray(destinationsData)
            ? destinationsData
            : []
        );

        setInquiries(
          Array.isArray(inquiriesData)
            ? inquiriesData
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data."
        );

        setPackages([]);
        setDestinations([]);
        setInquiries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const publishedPackages = packages.filter(
    (item) => item.isPublished
  ).length;

  const newInquiries = inquiries.filter(
    (item) => item.status === "NEW"
  ).length;

  const stats = [
    {
      label: "Total Packages",
      value: packages.length,
      icon: Package,
    },
    {
      label: "Published Packages",
      value: publishedPackages,
      icon: CheckCircle2,
    },
    {
      label: "Destinations",
      value: destinations.length,
      icon: MapPin,
    },
    {
      label: "New Inquiries",
      value: newInquiries,
      icon: MessageSquare,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#756b63]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c85a2b]">
          Admin Dashboard
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#211c17]">
          Welcome back
        </h1>

        <p className="mt-3 text-[#756b63]">
          Here's what's happening with your travel website.
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-6 text-sm text-[#756b63]">
                {stat.label}
              </p>

              <p className="mt-2 font-serif text-4xl text-[#211c17]">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8">
          <h2 className="font-serif text-2xl text-[#211c17]">
            Packages Overview
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#211c17]/10 pb-4">
              <span className="text-[#756b63]">
                Total Packages
              </span>

              <span className="font-semibold text-[#211c17]">
                {packages.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#756b63]">
                Published Packages
              </span>

              <span className="font-semibold text-[#211c17]">
                {publishedPackages}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8">
          <h2 className="font-serif text-2xl text-[#211c17]">
            Inquiry Overview
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#211c17]/10 pb-4">
              <span className="text-[#756b63]">
                Total Inquiries
              </span>

              <span className="font-semibold text-[#211c17]">
                {inquiries.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#756b63]">
                New Inquiries
              </span>

              <span className="font-semibold text-[#211c17]">
                {newInquiries}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}