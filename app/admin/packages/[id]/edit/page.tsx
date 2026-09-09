"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Save,
  CheckCircle2,
} from "lucide-react";

type PackageData = {
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
  seoTitle: string | null;
  seoDescription: string | null;
};

type Destination = {
  id: number;
  name: string;
};

type PackageImage = {
  id: number;
  packageId: number;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
};

type FormData = {
  title: string;
  slug: string;
  destinationId: string;
  category: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};

const categories = [
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

export default function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [packageId, setPackageId] = useState("");

  const [formData, setFormData] =
    useState<FormData>({
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

  const [destinations, setDestinations] =
    useState<Destination[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [originalImage, setOriginalImage] =
    useState("");

  /*
  =====================================================
  RESOLVE PARAMS
  =====================================================
  */

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;

      setPackageId(resolvedParams.id);
    };

    resolveParams();
  }, [params]);

  /*
  =====================================================
  FETCH PACKAGE + DESTINATIONS
  =====================================================
  */

  useEffect(() => {
    if (!packageId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          packageResponse,
          destinationsResponse,
        ] = await Promise.all([
          fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/packages/${packageId}`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/destinations`
        ),
        ]);

        if (!packageResponse.ok) {
          throw new Error(
            "Failed to load package"
          );
        }

        if (!destinationsResponse.ok) {
          throw new Error(
            "Failed to load destinations"
          );
        }

        const packageData: PackageData =
          await packageResponse.json();

        const destinationsData: Destination[] =
          await destinationsResponse.json();

        setDestinations(destinationsData);

        setOriginalImage(
          packageData.image ?? ""
        );

        setFormData({
          title: packageData.title,
          slug: packageData.slug,
          destinationId:
            packageData.destinationId.toString(),
          category:
            packageData.category ||
            "MOST_POPULAR",
          duration: packageData.duration,
          price:
            packageData.price.toString(),
          description:
            packageData.description ?? "",
          image:
            packageData.image ?? "",
          isPublished:
            packageData.isPublished,
          seoTitle:
            packageData.seoTitle ?? "",
          seoDescription:
            packageData.seoDescription ?? "",
        });
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load package details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [packageId]);

  /*
  =====================================================
  HANDLE INPUT CHANGE
  =====================================================
  */

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
  UPDATE PACKAGE
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

      /*
      -------------------------------------------------
      UPDATE PACKAGE
      -------------------------------------------------
      */

      const packageResponse =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/packages/${packageId}`,
          {
            method: "PATCH",

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
              category:
                formData.category,
              duration:
                formData.duration,
              price: Number(
                formData.price
              ),
              description:
                formData.description ||
                null,
              isPublished:
                formData.isPublished,
              seoTitle:
                formData.seoTitle ||
                null,
              seoDescription:
                formData.seoDescription ||
                null,
            }),
          }
        );

      if (!packageResponse.ok) {
        throw new Error(
          "Failed to update package"
        );
      }

      /*
      -------------------------------------------------
      UPDATE PACKAGE IMAGE
      -------------------------------------------------
      */

      if (
        formData.image !== originalImage
      ) {
        const imagesResponse =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/package-images`
          );

        if (!imagesResponse.ok) {
          throw new Error(
            "Failed to load package images"
          );
        }

        const images: PackageImage[] =
          await imagesResponse.json();

        const packageImages =
          images.filter(
            (image) =>
              image.packageId ===
              Number(packageId)
          );

        /*
        UPDATE EXISTING IMAGE
        */

        if (packageImages.length > 0) {
          const firstImage =
            packageImages.sort(
              (a, b) =>
                a.sortOrder -
                b.sortOrder
            )[0];

          const imageResponse =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/package-images/${firstImage.id}`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  imageUrl:
                    formData.image,
                }),
              }
            );

          if (!imageResponse.ok) {
            throw new Error(
              "Failed to update package image"
            );
          }
        }

        /*
        CREATE IMAGE IF NONE EXISTS
        */

        else if (formData.image) {
          const imageResponse =
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/package-images`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  packageId:
                    Number(packageId),

                  imageUrl:
                    formData.image,

                  altText:
                    formData.title,

                  sortOrder: 0,
                }),
              }
            );

          if (!imageResponse.ok) {
            throw new Error(
              "Failed to create package image"
            );
          }
        }

        setOriginalImage(
          formData.image
        );
      }

    setSuccess("Package updated successfully!");
    router.push("/admin/packages");
    router.refresh();

    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while updating the package."
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
  ERROR
  =====================================================
  */

  if (error && !formData.title) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <p className="text-red-500">
          {error}
        </p>

        <Link
          href="/admin/packages"
          className="rounded-full bg-[#211c17] px-6 py-3 text-white"
        >
          Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#c85a2b]"
        >
          <ArrowLeft size={17} />

          Back to Packages
        </Link>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
            Package Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
            Edit Package
          </h1>

          <p className="mt-3 text-[#756b63]">
            Update your travel package details.
          </p>
        </div>

        {/* =====================================================
            SUCCESS
        ===================================================== */}

        {success && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-700">
            <CheckCircle2 size={20} />

            {success}
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[32px] bg-white p-6 shadow-sm sm:p-10"
        >

          <h2 className="font-serif text-3xl text-[#211c17]">
            Basic Information
          </h2>

          {/* =====================================================
              TITLE + SLUG
          ===================================================== */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Package Title
              </label>

              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div>
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

          </div>

          {/* =====================================================
              DESTINATION + CATEGORY
          ===================================================== */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Destination
              </label>

              <select
                required
                name="destinationId"
                value={
                  formData.destinationId
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              >
                <option value="">
                  Select destination
                </option>

                {destinations.map(
                  (destination) => (
                    <option
                      key={destination.id}
                      value={
                        destination.id
                      }
                    >
                      {destination.name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category.value}
                      value={
                        category.value
                      }
                    >
                      {category.label}
                    </option>
                  )
                )}
              </select>
            </div>

          </div>

          {/* =====================================================
              DURATION + PRICE
          ===================================================== */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Duration
              </label>

              <input
                required
                type="text"
                name="duration"
                value={
                  formData.duration
                }
                onChange={handleChange}
                placeholder="5 Days / 4 Nights"
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <input
                required
                min="0"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />
            </div>

          </div>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
            />
          </div>

          {/* =====================================================
              IMAGE
          ===================================================== */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">

            <h2 className="font-serif text-3xl text-[#211c17]">
              Package Image
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
                  alt={formData.title}
                  className="h-72 w-full object-cover"
                />
              </div>
            )}

          </div>

          {/* =====================================================
              SEO
          ===================================================== */}

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
                value={
                  formData.seoTitle
                }
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
                value={
                  formData.seoDescription
                }
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
              />

            </div>

          </div>

          {/* =====================================================
              PUBLISH
          ===================================================== */}

          <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#f7f3ed] p-6">

            <div>
              <h3 className="font-semibold text-[#211c17]">
                Publish Package
              </h3>

              <p className="mt-1 text-sm text-[#756b63]">
                Make this package visible
                on your website.
              </p>
            </div>

            <input
              type="checkbox"
              name="isPublished"
              checked={
                formData.isPublished
              }
              onChange={handleChange}
              className="h-5 w-5 accent-[#c85a2b]"
            />

          </div>

          {/* =====================================================
              SUBMIT
          ===================================================== */}

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