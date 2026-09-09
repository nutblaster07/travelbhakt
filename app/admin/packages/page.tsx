"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

type PackageData = {
  id: number;
  title: string;
  slug: string;
  category: string;
  duration: string;
  price: number;
  isPublished: boolean;
  image: string | null;
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<
    PackageData[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch packages"
          );
        }

        const data = await response.json();

        setPackages(data);
      } catch (error) {
        console.error(
          "Failed to load packages:",
          error
        );

        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const deletePackage = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete package"
        );
      }

      setPackages((currentPackages) =>
        currentPackages.filter(
          (item) => item.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete package:",
        error
      );

      alert(
        "Unable to delete package. Please try again."
      );
    }
  };

  const togglePublish = async (
    packageItem: PackageData
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages/${packageItem.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            isPublished:
              !packageItem.isPublished,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update package"
        );
      }

      const updatedPackage =
        await response.json();

      setPackages((currentPackages) =>
        currentPackages.map((item) =>
          item.id === packageItem.id
            ? {
                ...item,
                ...updatedPackage,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to update package:",
        error
      );

      alert(
        "Unable to update package."
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8 lg:p-12">
        Loading packages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 lg:p-12 text-red-500">
        Unable to load packages.
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12">
      {/* Heading */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c85a2b]">
            Package Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#211c17]">
            Packages
          </h1>

          <p className="mt-3 text-[#756b63]">
            Create, edit and manage your travel packages.
          </p>
        </div>

        <Link
          href="/admin/packages/new"
          className="flex items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a94720]"
        >
          <Plus size={18} />

          Add Package
        </Link>
      </div>

      {/* Table */}

      <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="border-b border-[#211c17]/10 bg-[#f7f3ed]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Package
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Duration
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {packages.map((packageItem) => (
                <tr
                  key={packageItem.id}
                  className="border-b border-[#211c17]/5 last:border-0"
                >
                  {/* Package */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {packageItem.image ? (
                        <img
                          src={packageItem.image}
                          alt={packageItem.title}
                          className="h-14 w-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="h-14 w-16 rounded-xl bg-[#f7f3ed]" />
                      )}

                      <div>
                        <p className="font-semibold text-[#211c17]">
                          {packageItem.title}
                        </p>

                        <p className="mt-1 text-xs text-[#756b63]">
                          /{packageItem.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-[#c85a2b]/10 px-3 py-1 text-xs font-semibold text-[#c85a2b]">
                      {packageItem.category.replaceAll(
                        "_",
                        " "
                      )}
                    </span>
                  </td>

                  {/* Duration */}

                  <td className="px-6 py-5 text-sm text-[#756b63]">
                    {packageItem.duration}
                  </td>

                  {/* Price */}

                  <td className="px-6 py-5 font-semibold text-[#211c17]">
                    ₹
                    {packageItem.price.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">
                    <button
                      onClick={() =>
                        togglePublish(
                          packageItem
                        )
                      }
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        packageItem.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {packageItem.isPublished ? (
                        <Eye size={14} />
                      ) : (
                        <EyeOff size={14} />
                      )}

                      {packageItem.isPublished
                        ? "Published"
                        : "Draft"}
                    </button>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/packages/${packageItem.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#211c17]/10 text-[#756b63] transition hover:bg-[#f7f3ed] hover:text-[#211c17]"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() =>
                          deletePackage(
                            packageItem.id
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {packages.length === 0 && (
          <div className="py-16 text-center text-[#756b63]">
            No packages found. Create your first package.
          </div>
        )}
      </div>
    </div>
  );
}