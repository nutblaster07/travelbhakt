"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type Destination = {
  id: number;
  name: string;
  slug: string;
  isPublished: boolean;
};

export default function NewPackagePage() {
  const [destinations, setDestinations] = useState<
    Destination[]
  >([]);

  const [loadingDestinations, setLoadingDestinations] =
    useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    destinationId: "",
    category: "MOST_POPULAR",
    duration: "",
    price: "",
    description: "",
    image: "",
    isPublished: false,
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch destinations"
          );
        }

        const data: Destination[] =
          await response.json();

        setDestinations(data);
      } catch (error) {
        console.error(
          "Failed to load destinations:",
          error
        );

        setError(
          "Unable to load destinations."
        );
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const checked =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : undefined;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const title = e.target.value;

    setFormData((previous) => ({
      ...previous,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!formData.destinationId) {
      setError(
        "Please select a destination."
      );

      return;
    }

    try {
      setSubmitting(true);

      /*
        STEP 1
        Create package first.
      */

      const packageResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title: formData.title,
            slug: formData.slug,
            destinationId: Number(
              formData.destinationId
            ),
            category: formData.category,
            duration: formData.duration,
            price: Number(formData.price),
            description:
              formData.description || undefined,
            isPublished:
              formData.isPublished,
            seoTitle:
              formData.seoTitle || undefined,
            seoDescription:
              formData.seoDescription ||
              undefined,
          }),
        }
      );

      if (!packageResponse.ok) {
        throw new Error(
          "Failed to create package"
        );
      }

      const createdPackage =
        await packageResponse.json();

      /*
        STEP 2
        Add package image.

        PackageImage is stored separately
        in your database.
      */

      if (formData.image.trim()) {
        const imageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/package-images`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              packageId:
                createdPackage.id,
              imageUrl:
                formData.image,
              sortOrder: 0,
            }),
          }
        );

        if (!imageResponse.ok) {
          console.error(
            "Package created but image failed"
          );
        }
      }

      /*
        Redirect back to packages.
      */

      window.location.href =
        "/admin/packages";
    } catch (error) {
      console.error(
        "Failed to create package:",
        error
      );

      setError(
        "Unable to create package. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDestinations) {
    return (
      <div className="p-8 lg:p-12 text-[#756b63]">
        Loading destinations...
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      {/* Header */}

      <Link
        href="/admin/packages"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#211c17]"
      >
        <ArrowLeft size={18} />

        Back to Packages
      </Link>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c85a2b]">
          Package Management
        </p>

        <h1 className="mt-3 font-serif text-4xl text-[#211c17]">
          Create New Package
        </h1>

        <p className="mt-3 text-[#756b63]">
          Add a new travel package to your website.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-8"
      >
        {/* Basic Information */}

        <section className="rounded-3xl bg-white p-6 lg:p-8">
          <h2 className="font-serif text-2xl text-[#211c17]">
            Basic Information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">
                Package Title
              </label>

              <input
                required
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Amazing Sikkim Tour"
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                URL Slug
              </label>

              <input
                required
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="amazing-sikkim-tour"
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Destination
              </label>

              <select
                required
                name="destinationId"
                value={formData.destinationId}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              >
                <option value="">
                  Select destination
                </option>

                {destinations.map(
                  (destination) => (
                    <option
                      key={destination.id}
                      value={destination.id}
                    >
                      {destination.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              >
                <option value="MOST_POPULAR">
                  Most Popular
                </option>

                <option value="HOLIDAY">
                  Holiday
                </option>

                <option value="WEEKEND">
                  Weekend
                </option>

                <option value="ADVENTURE">
                  Adventure
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Duration
              </label>

              <input
                required
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="5 Days / 4 Nights"
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Price
              </label>

              <input
                required
                min="0"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="24999"
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe this travel package..."
              className="mt-2 w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
            />
          </div>
        </section>

        {/* Image */}

        <section className="rounded-3xl bg-white p-6 lg:p-8">
          <h2 className="font-serif text-2xl text-[#211c17]">
            Package Image
          </h2>

          <p className="mt-2 text-sm text-[#756b63]">
            For now, paste a Cloudinary image URL.
          </p>

          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://res.cloudinary.com/..."
            className="mt-6 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
          />

          {formData.image && (
            <img
              src={formData.image}
              alt="Package preview"
              className="mt-6 h-64 w-full rounded-2xl object-cover"
            />
          )}
        </section>

        {/* SEO */}

        <section className="rounded-3xl bg-white p-6 lg:p-8">
          <h2 className="font-serif text-2xl text-[#211c17]">
            SEO Settings
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <label className="text-sm font-medium">
                SEO Title
              </label>

              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                placeholder="Amazing Sikkim Tour | Best Sikkim Holiday Package"
                className="mt-2 w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                SEO Description
              </label>

              <textarea
                rows={4}
                name="seoDescription"
                value={
                  formData.seoDescription
                }
                onChange={handleChange}
                placeholder="Write a short SEO description..."
                className="mt-2 w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>
          </div>
        </section>

        {/* Publish */}

        <section className="rounded-3xl bg-white p-6 lg:p-8">
          <label className="flex cursor-pointer items-center gap-4">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <div>
              <p className="font-semibold text-[#211c17]">
                Publish Package
              </p>

              <p className="mt-1 text-sm text-[#756b63]">
                Make this package visible on the public website.
              </p>
            </div>
          </label>
        </section>

        {/* Submit */}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-full bg-[#c85a2b] px-7 py-4 font-semibold text-white transition hover:bg-[#a94720] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {submitting
              ? "Creating..."
              : "Create Package"}
          </button>

          <Link
            href="/admin/packages"
            className="rounded-full border border-[#211c17]/15 px-7 py-4 text-sm font-semibold text-[#211c17]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}