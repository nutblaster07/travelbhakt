"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Loader2,
  Save,
  CheckCircle2,
} from "lucide-react";

type DestinationData = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

type FormData = {
  name: string;
  slug: string;
  description: string;
  image: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};

export default function EditDestinationPage() {
  const router = useRouter();

  const params = useParams();

  const destinationId = params.id as string;

  const [formData, setFormData] =
    useState<FormData>({
      name: "",
      slug: "",
      description: "",
      image: "",
      isPublished: true,
      seoTitle: "",
      seoDescription: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /*
  =====================================================
  FETCH DESTINATION
  =====================================================
  */

  useEffect(() => {
    if (!destinationId) return;

    const fetchDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destinationId}`
      );

        if (!response.ok) {
          throw new Error(
            "Failed to load destination"
          );
        }

        const data: DestinationData =
          await response.json();

        setFormData({
          name: data.name,
          slug: data.slug,
          description:
            data.description ?? "",
          image:
            data.image ?? "",
          isPublished:
            data.isPublished,
          seoTitle:
            data.seoTitle ?? "",
          seoDescription:
            data.seoDescription ?? "",
        });
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load destination details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  /*
  =====================================================
  HANDLE INPUT CHANGE
  =====================================================
  */

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const {
      name,
      value,
      type,
    } = e.target;

    if (type === "checkbox") {
      const checked =
        (e.target as HTMLInputElement)
          .checked;

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

  /*
  =====================================================
  GENERATE SLUG
  =====================================================
  */

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
        previousData.slug ===
          generateSlug(previousData.name)
          ? generateSlug(value)
          : previousData.slug,
    }));
  }

  /*
  =====================================================
  UPDATE DESTINATION
  =====================================================
  */

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destinations/${destinationId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            slug: formData.slug,
            description:
              formData.description || null,
            image:
              formData.image || null,
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
          await response
            .json()
            .catch(() => null);

        console.error(errorData);

        throw new Error(
          "Failed to update destination"
        );
      }

      setSuccess(
        "Destination updated successfully!"
      );

      setTimeout(() => {
        router.push(
          "/admin/destinations"
        );

        router.refresh();
      }, 1000);

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while updating the destination."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2
          className="animate-spin text-[#c85a2b]"
          size={30}
        />
      </div>
    );
  }

  /*
  =====================================================
  LOAD ERROR
  =====================================================
  */

  if (error && !formData.name) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <p className="text-red-500">
          {error}
        </p>

        <Link
          href="/admin/destinations"
          className="rounded-full bg-[#211c17] px-6 py-3 text-white"
        >
          Back to Destinations
        </Link>
      </div>
    );
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
            Edit Destination
          </h1>

          <p className="mt-3 text-[#756b63]">
            Update your destination details.
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
              className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
            />
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

                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />

                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}