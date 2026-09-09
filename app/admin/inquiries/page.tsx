"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Loader2,
  Eye,
  Calendar,
  Users,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  destination: string;
  packageId: number | null;
  travelDate: string | null;
  travellers: number | null;
  message: string | null;
  status: string;
  createdAt: string;
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(
        "accessToken"
        );

        if (!token) {
        throw new Error(
            "You are not logged in. Please login again."
        );
        }

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiries`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load inquiries"
          );
        }

        const data: Inquiry[] =
          await response.json();

        setInquiries(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load inquiries."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const filteredInquiries =
    filter === "ALL"
      ? inquiries
      : inquiries.filter(
          (inquiry) =>
            inquiry.status === filter
        );

  function getStatusStyle(status: string) {
    switch (status) {
      case "NEW":
        return "bg-blue-50 text-blue-600";

      case "CONTACTED":
        return "bg-yellow-50 text-yellow-700";

      case "CONFIRMED":
        return "bg-green-50 text-green-700";

      case "CANCELLED":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "Not specified";

    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

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

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
              Customer Management
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
              Travel Inquiries
            </h1>

            <p className="mt-3 text-[#756b63]">
              Manage customer inquiries and travel requests.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
            <MessageSquare
              size={22}
              className="text-[#c85a2b]"
            />

            <div>
              <p className="text-xs text-[#756b63]">
                Total Inquiries
              </p>

              <p className="font-serif text-2xl text-[#211c17]">
                {inquiries.length}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Filters */}

        <div className="mt-10 flex flex-wrap gap-3">
          {[
            "ALL",
            "NEW",
            "CONTACTED",
            "CONFIRMED",
            "CANCELLED",
          ].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() =>
                setFilter(status)
              }
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                filter === status
                  ? "bg-[#c85a2b] text-white"
                  : "bg-white text-[#756b63] hover:bg-[#211c17]/5"
              }`}
            >
              {status === "ALL"
                ? "All Inquiries"
                : status.charAt(0) +
                  status
                    .slice(1)
                    .toLowerCase()}
            </button>
          ))}
        </div>

        {/* Inquiry List */}

        <div className="mt-8 overflow-hidden rounded-[28px] bg-white shadow-sm">

          {filteredInquiries.length === 0 ? (
            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
              <MessageSquare
                size={42}
                className="text-[#c85a2b]/50"
              />

              <h2 className="mt-5 font-serif text-2xl text-[#211c17]">
                No inquiries found
              </h2>

              <p className="mt-2 text-[#756b63]">
                There are no inquiries in this category.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#211c17]/10">

              {filteredInquiries.map(
                (inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-6 transition hover:bg-[#f7f3ed]/60 lg:p-8"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                      {/* Customer */}

                      <div className="min-w-[220px]">
                        <div className="flex items-center justify-between gap-4 lg:block">

                          <h2 className="font-serif text-2xl text-[#211c17]">
                            {inquiry.name}
                          </h2>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold lg:hidden ${getStatusStyle(
                              inquiry.status
                            )}`}
                          >
                            {inquiry.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 text-sm text-[#756b63]">

                          <div className="flex items-center gap-2">
                            <Mail size={15} />

                            {inquiry.email}
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone size={15} />

                            {inquiry.phone}
                          </div>

                        </div>
                      </div>

                      {/* Travel Details */}

                      <div className="grid gap-4 sm:grid-cols-3 lg:flex lg:items-center lg:gap-10">

                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#756b63]">
                            <MapPin size={14} />

                            Destination
                          </div>

                          <p className="mt-2 font-medium text-[#211c17]">
                            {inquiry.destination}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#756b63]">
                            <Calendar size={14} />

                            Travel Date
                          </div>

                          <p className="mt-2 font-medium text-[#211c17]">
                            {formatDate(
                              inquiry.travelDate
                            )}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#756b63]">
                            <Users size={14} />

                            Travellers
                          </div>

                          <p className="mt-2 font-medium text-[#211c17]">
                            {inquiry.travellers ??
                              "Not specified"}
                          </p>
                        </div>

                      </div>

                      {/* Status + Action */}

                      <div className="flex items-center gap-4">

                        <span
                          className={`hidden rounded-full px-3 py-1 text-xs font-bold lg:block ${getStatusStyle(
                            inquiry.status
                          )}`}
                        >
                          {inquiry.status}
                        </span>

                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="flex items-center gap-2 rounded-full border border-[#211c17]/10 px-5 py-3 text-sm font-semibold text-[#211c17] transition hover:border-[#c85a2b] hover:text-[#c85a2b]"
                        >
                          <Eye size={17} />

                          View
                        </Link>

                      </div>

                    </div>
                  </div>
                )
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}