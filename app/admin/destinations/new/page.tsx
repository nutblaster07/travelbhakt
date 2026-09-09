"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Save,
  CheckCircle2,
} from "lucide-react";

type FormData = {
  name: string;
  slug: string;
  description: string;
  image: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};

export default function NewDestinationPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    slug: "",
    description: "",
    image: "",
    isPublished: true,
    seoTitle: "",
    seoDescription: "",
  });

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked =
        (e.target as HTMLInputElement).checked;

      setFormData((previousData) => ({
        ...previousData,
        [name]: checked,
      }));

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setFormData((previousData) => ({
      ...previousData,
      name: value,
      slug:
        previousData.slug === "" ||
        previousData.slug === generateSlug(
          previousData.name
        )
          ? generateSlug(value)
          : previousData.slug,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
            description:
              formData.description || null,
            image: formData.image || null,
            isPublished:
              formData.isPublished,
            seoTitle:
              formData.seoTitle || null,
            seoDescription:
              formData.seoDescription || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        console.error(errorData);

        throw new Error(
          "Failed to create destination"
        );
      }

      setSuccess(
        "Destination created successfully!"
      );

      setTimeout(() => {
        router.push("/admin/destinations");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while creating the destination."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Back Button */}

        <Link
          href="/admin/destinations"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#c85a2b]"
        >
          <ArrowLeft size={17} />

          Back to Destinations
        </Link>

        {/* Header */}

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
            Destination Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
            Add New Destination
          </h1>

          <p className="mt-3 text-[#756b63]">
            Create a new destination for your travel website.
          </p>
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

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[32px] bg-white p-6 shadow-sm sm:p-10"
        >
          <h2 className="font-serif text-3xl text-[#211c17]">
            Basic Information
          </h2>

          {/* Name */}

          <div className="mt-8">
            <label className="mb-2 block text-sm font-medium">
              Destination Name
            </label>

            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Sikkim"
              className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
            />
          </div>

          {/* Slug */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              URL Slug
            </label>

            <input
              required
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. sikkim"
              className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
            />

            <p className="mt-2 text-xs text-[#756b63]">
              This will be used in the destination URL.
            </p>
          </div>

          {/* Description */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description about this destination..."
              className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
            />
          </div>

          {/* Image */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">
            <h2 className="font-serif text-3xl text-[#211c17]">
              Destination Image
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
                placeholder="https://..."
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            {formData.image && (
              <div className="mt-6 overflow-hidden rounded-2xl">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="h-72 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SEO */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">
            <h2 className="font-serif text-3xl text-[#211c17]">
              SEO Information
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                SEO Title
              </label>

              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                placeholder="e.g. Explore Sikkim | Best Sikkim Travel Packages"
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                SEO Description
              </label>

              <textarea
                rows={4}
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                placeholder="Write a search engine description..."
                className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>
          </div>

          {/* Publish */}

          <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#f7f3ed] p-6">
            <div>
              <h3 className="font-semibold text-[#211c17]">
                Publish Destination
              </h3>

              <p className="mt-1 text-sm text-[#756b63]">
                Make this destination visible on your website.
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

                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />

                  Create Destination
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}