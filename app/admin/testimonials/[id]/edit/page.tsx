"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Loader2,
  Save,
  CheckCircle2,
  Quote,
} from "lucide-react";

type FormData = {
  name: string;
  location: string;
  review: string;
  rating: number;
  image: string;
  packageName: string;
  isPublished: boolean;
  sortOrder: number;
};

export default function EditTestimonialPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  const [formData, setFormData] =
    useState<FormData>({
      name: "",
      location: "",
      review: "",
      rating: 5,
      image: "",
      packageName: "",
      isPublished: false,
      sortOrder: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =========================
  // FETCH TESTIMONIAL
  // =========================

  useEffect(() => {
    if (!id) return;

    const fetchTestimonial = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem(
            "accessToken"
          );

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/testimonials/admin/${id}`,
        {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData =
            await response
              .json()
              .catch(() => null);

          console.error(
            "Failed to load testimonial:",
            errorData
          );

          throw new Error(
            errorData?.message ||
              "Failed to load testimonial"
          );
        }

        const data =
          await response.json();

        if (!data) {
          throw new Error(
            "Testimonial not found"
          );
        }

        setFormData({
          name:
            data.name ?? "",

          location:
            data.location ?? "",

          review:
            data.review ?? "",

          rating:
            data.rating ?? 5,

          image:
            data.image ?? "",

          packageName:
            data.packageName ?? "",

          isPublished:
            data.isPublished ?? false,

          sortOrder:
            data.sortOrder ?? 0,
        });
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load testimonial."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id, router]);

  // =========================
  // HANDLE CHANGE
  // =========================

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const {
      name,
      value,
      type,
    } = e.target;

    if (type === "checkbox") {
      const checked =
        (
          e.target as HTMLInputElement
        ).checked;

      setFormData(
        (previousData) => ({
          ...previousData,
          [name]: checked,
        })
      );

      return;
    }

    setFormData(
      (previousData) => ({
        ...previousData,

        [name]:
          name === "rating" ||
          name === "sortOrder"
            ? Number(value)
            : value,
      })
    );
  }

  // =========================
  // UPDATE TESTIMONIAL
  // =========================

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token =
        localStorage.getItem(
          "accessToken"
        );

      if (!token) {
        router.replace(
          "/admin/login"
        );

        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name:
              formData.name,

            location:
              formData.location ||
              null,

            review:
              formData.review,

            rating:
              formData.rating,

            image:
              formData.image ||
              null,

            packageName:
              formData.packageName ||
              null,

            isPublished:
              formData.isPublished,

            sortOrder:
              formData.sortOrder,
          }),
        }
      );

      if (!response.ok) {
        const errorData =
          await response
            .json()
            .catch(() => null);

        console.error(
          "Update error:",
          errorData
        );

        throw new Error(
          errorData?.message ||
            "Failed to update testimonial"
        );
      }

      setSuccess(
        "Testimonial updated successfully!"
      );

      setTimeout(() => {
        router.push(
          "/admin/testimonials"
        );
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the testimonial."
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">
        <Loader2
          size={32}
          className="animate-spin text-[#c85a2b]"
        />
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1000px]">

        {/* Back */}

        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#c85a2b]"
        >
          <ArrowLeft size={17} />

          Back to Testimonials
        </Link>

        {/* Header */}

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
            Customer Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
            Edit Testimonial
          </h1>

          <p className="mt-3 text-[#756b63]">
            Update the customer's travel review and
            display settings.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-700">
            <CheckCircle2 size={20} />

            {success}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[32px] bg-white p-6 shadow-sm sm:p-10"
        >

          {/* Customer Information */}

          <div>
            <h2 className="flex items-center gap-3 font-serif text-3xl text-[#211c17]">
              <Quote
                size={28}
                className="text-[#c85a2b]"
              />

              Customer Information
            </h2>

            {/* Name */}

            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium">
                Customer Name
              </label>

              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Location */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Destination */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Travel Destination
              </label>

              <input
                type="text"
                name="packageName"
                value={formData.packageName}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Rating */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Rating
              </label>

              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              >
                <option value={1}>
                  1 Star
                </option>

                <option value={2}>
                  2 Stars
                </option>

                <option value={3}>
                  3 Stars
                </option>

                <option value={4}>
                  4 Stars
                </option>

                <option value={5}>
                  5 Stars
                </option>
              </select>
            </div>

            {/* Review */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Customer Review
              </label>

              <textarea
                required
                rows={6}
                name="review"
                value={formData.review}
                onChange={handleChange}
                className="w-full resize-y rounded-xl border border-[#ded6cc] px-4 py-3 leading-7 outline-none transition focus:border-[#c85a2b]"
              />
            </div>
          </div>

          {/* Customer Image */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">
            <h2 className="font-serif text-3xl text-[#211c17]">
              Customer Image
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {formData.image && (
              <div className="mt-6">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="h-40 w-40 rounded-2xl object-cover"
                />
              </div>
            )}
          </div>

          {/* Display Settings */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">
            <h2 className="font-serif text-3xl text-[#211c17]">
              Display Settings
            </h2>

            {/* Sort Order */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Sort Order
              </label>

              <input
                type="number"
                name="sortOrder"
                min="0"
                value={formData.sortOrder}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Publish */}

            <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#f7f3ed] p-6">
              <div>
                <h3 className="font-semibold text-[#211c17]">
                  Publish Testimonial
                </h3>

                <p className="mt-1 text-sm text-[#756b63]">
                  Make this testimonial visible on your website.
                </p>
              </div>

              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
                className="h-5 w-5 accent-[#c85a2b]"
              />
            </div>
          </div>

          {/* Submit */}

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-[#c85a2b] px-8 py-4 font-semibold text-white transition hover:bg-[#a94720] disabled:cursor-not-allowed disabled:opacity-60"
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

                  Update Testimonial
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}