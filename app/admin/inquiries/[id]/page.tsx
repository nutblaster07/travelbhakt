"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Save,
} from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  destination: string;
  packageId: number | null;
  travelDate: string;
  travellers: number;
  message: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const statusOptions = [
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "CONFIRMED",
  "CLOSED",
];

export default function InquiryDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const inquiryId = params.id;

  const [inquiry, setInquiry] =
    useState<Inquiry | null>(null);

  const [status, setStatus] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    if (!inquiryId) return;

    const fetchInquiry = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiries/${inquiryId}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load inquiry"
          );
        }

        const data: Inquiry =
          await response.json();

        setInquiry(data);
        setStatus(data.status);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load inquiry details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [inquiryId]);

  async function handleStatusUpdate() {
    if (!inquiry) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiries/${inquiry.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update inquiry"
        );
      }

      const updatedInquiry =
        await response.json();

      setInquiry(updatedInquiry);

      setSuccess(
        "Inquiry status updated successfully!"
      );
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while updating the inquiry."
      );
    } finally {
      setSaving(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(
      dateString
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatDateTime(dateString: string) {
    return new Date(
      dateString
    ).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
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

  if (error && !inquiry) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <p className="text-red-500">
          {error}
        </p>

        <Link
          href="/admin/inquiries"
          className="rounded-full bg-[#211c17] px-6 py-3 text-white"
        >
          Back to Inquiries
        </Link>
      </div>
    );
  }

  if (!inquiry) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Back Button */}

        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#c85a2b]"
        >
          <ArrowLeft size={17} />

          Back to Inquiries
        </Link>

        {/* Header */}

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
              Inquiry Management
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
              Inquiry Details
            </h1>

            <p className="mt-3 text-[#756b63]">
              Review customer details and manage
              the inquiry status.
            </p>
          </div>

          <div className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#756b63] shadow-sm">
            Inquiry #{inquiry.id}
          </div>
        </div>

        {/* Success */}

        {success && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-700">
            <CheckCircle2 size={20} />

            {success}
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">

          {/* Main Details */}

          <div className="space-y-8">

            {/* Customer Information */}

            <div className="rounded-[32px] bg-white p-6 shadow-sm sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">
                  <User size={22} />
                </div>

                <div>
                  <h2 className="font-serif text-3xl text-[#211c17]">
                    Customer Information
                  </h2>

                  <p className="mt-1 text-sm text-[#756b63]">
                    Contact details provided by the customer.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#f7f3ed] p-5">
                  <div className="flex items-center gap-2 text-[#c85a2b]">
                    <User size={17} />

                    <span className="text-sm font-medium">
                      Name
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-[#211c17]">
                    {inquiry.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f7f3ed] p-5">
                  <div className="flex items-center gap-2 text-[#c85a2b]">
                    <Mail size={17} />

                    <span className="text-sm font-medium">
                      Email
                    </span>
                  </div>

                  <a
                    href={`mailto:${inquiry.email}`}
                    className="mt-3 block break-all font-semibold text-[#211c17] hover:text-[#c85a2b]"
                  >
                    {inquiry.email}
                  </a>
                </div>

                <div className="rounded-2xl bg-[#f7f3ed] p-5">
                  <div className="flex items-center gap-2 text-[#c85a2b]">
                    <Phone size={17} />

                    <span className="text-sm font-medium">
                      Phone
                    </span>
                  </div>

                  <a
                    href={`tel:${inquiry.phone}`}
                    className="mt-3 block font-semibold text-[#211c17] hover:text-[#c85a2b]"
                  >
                    {inquiry.phone}
                  </a>
                </div>

                <div className="rounded-2xl bg-[#f7f3ed] p-5">
                  <div className="flex items-center gap-2 text-[#c85a2b]">
                    <Calendar size={17} />

                    <span className="text-sm font-medium">
                      Inquiry Date
                    </span>
                  </div>

                  <p className="mt-3 font-semibold text-[#211c17]">
                    {formatDateTime(
                      inquiry.createdAt
                    )}
                  </p>
                </div>

              </div>
            </div>

            {/* Travel Information */}

            <div className="rounded-[32px] bg-white p-6 shadow-sm sm:p-10">
              <h2 className="font-serif text-3xl text-[#211c17]">
                Travel Information
              </h2>

              <p className="mt-2 text-[#756b63]">
                Details about the customer's travel plans.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-3">

                <div className="rounded-2xl border border-[#211c17]/10 p-5">
                  <MapPin
                    size={20}
                    className="text-[#c85a2b]"
                  />

                  <p className="mt-4 text-sm text-[#756b63]">
                    Destination / Package
                  </p>

                  <p className="mt-1 font-semibold text-[#211c17]">
                    {inquiry.destination}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#211c17]/10 p-5">
                  <Calendar
                    size={20}
                    className="text-[#c85a2b]"
                  />

                  <p className="mt-4 text-sm text-[#756b63]">
                    Travel Date
                  </p>

                  <p className="mt-1 font-semibold text-[#211c17]">
                    {formatDate(
                      inquiry.travelDate
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#211c17]/10 p-5">
                  <Users
                    size={20}
                    className="text-[#c85a2b]"
                  />

                  <p className="mt-4 text-sm text-[#756b63]">
                    Travellers
                  </p>

                  <p className="mt-1 font-semibold text-[#211c17]">
                    {inquiry.travellers}
                  </p>
                </div>

              </div>

              {inquiry.packageId && (
                <p className="mt-6 text-sm text-[#756b63]">
                  Package ID:{" "}
                  <span className="font-semibold text-[#211c17]">
                    #{inquiry.packageId}
                  </span>
                </p>
              )}
            </div>

            {/* Message */}

            <div className="rounded-[32px] bg-white p-6 shadow-sm sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c85a2b]/10 text-[#c85a2b]">
                  <MessageSquare size={22} />
                </div>

                <h2 className="font-serif text-3xl text-[#211c17]">
                  Customer Message
                </h2>
              </div>

              <div className="mt-8 rounded-2xl bg-[#f7f3ed] p-6">
                <p className="whitespace-pre-wrap leading-7 text-[#4f4740]">
                  {inquiry.message ||
                    "No additional message was provided."}
                </p>
              </div>
            </div>

          </div>

          {/* Sidebar */}

          <div className="h-fit rounded-[32px] bg-white p-6 shadow-sm sm:p-8">

            <h2 className="font-serif text-2xl text-[#211c17]">
              Manage Inquiry
            </h2>

            <p className="mt-2 text-sm text-[#756b63]">
              Update the current status of this inquiry.
            </p>

            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium text-[#211c17]">
                Inquiry Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              >
                {statusOptions.map(
                  (statusOption) => (
                    <option
                      key={statusOption}
                      value={statusOption}
                    >
                      {statusOption
                        .replaceAll("_", " ")
                        .toLowerCase()
                        .replace(
                          /\b\w/g,
                          (letter) =>
                            letter.toUpperCase()
                        )}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              type="button"
              onClick={handleStatusUpdate}
              disabled={saving}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-4 font-semibold text-white transition hover:bg-[#a94720] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />

                  Update Status
                </>
              )}
            </button>

            <div className="mt-8 border-t border-[#211c17]/10 pt-6">
              <p className="text-xs uppercase tracking-wider text-[#756b63]">
                Last Updated
              </p>

              <p className="mt-2 text-sm font-medium text-[#211c17]">
                {formatDateTime(
                  inquiry.updatedAt
                )}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}