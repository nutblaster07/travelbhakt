"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Edit,
  MapPin,
  Plus,
  Search,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

type Destination = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isPublished: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<
    Destination[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError("");

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
        console.error(error);

        setError(
          "Unable to load destinations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations =
    destinations.filter((destination) => {
      const searchText =
        search.toLowerCase();

      return (
        destination.name
          .toLowerCase()
          .includes(searchText) ||
        destination.slug
          .toLowerCase()
          .includes(searchText)
      );
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2
          size={30}
          className="animate-spin text-[#c85a2b]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADER */}

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
              Destination Management
            </p>

            <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
              Destinations
            </h1>

            <p className="mt-3 text-[#756b63]">
              Manage travel destinations on your website.
            </p>
          </div>

          <Link
            href="/admin/destinations/new"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3.5 font-semibold text-white transition hover:bg-[#a94720]"
          >
            <Plus size={18} />

            Add Destination
          </Link>
        </div>

        {/* SEARCH */}

        <div className="relative mt-10 max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756b63]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search destinations..."
            className="w-full rounded-xl border border-[#ded6cc] bg-white py-3 pl-11 pr-4 outline-none focus:border-[#c85a2b]"
          />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* DESTINATIONS TABLE */}

        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">

              <thead className="border-b border-[#211c17]/10 bg-[#f7f3ed]">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                    Destination
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                    Slug
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                    Status
                  </th>

                  <th className="px-6 py-5 text-right text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDestinations.map(
                  (destination) => (
                    <tr
                      key={destination.id}
                      className="border-b border-[#211c17]/5 last:border-0"
                    >
                      {/* DESTINATION */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">

                          {destination.image ? (
                            <img
                              src={destination.image}
                              alt={destination.name}
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c85a2b]/10 text-[#c85a2b]">
                              <MapPin size={20} />
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-[#211c17]">
                              {destination.name}
                            </p>

                            <p className="mt-1 max-w-[300px] truncate text-sm text-[#756b63]">
                              {destination.description ||
                                "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SLUG */}

                      <td className="px-6 py-5 text-sm text-[#756b63]">
                        {destination.slug}
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5">
                        <div className="inline-flex items-center gap-2">
                          {destination.isPublished ? (
                            <>
                              <Eye
                                size={16}
                                className="text-green-600"
                              />

                              <span className="text-sm font-medium text-green-600">
                                Published
                              </span>
                            </>
                          ) : (
                            <>
                              <EyeOff
                                size={16}
                                className="text-[#756b63]"
                              />

                              <span className="text-sm font-medium text-[#756b63]">
                                Draft
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/destinations/${destination.id}/edit`}
                          className="inline-flex items-center gap-2 rounded-full border border-[#211c17]/10 px-4 py-2 text-sm font-semibold text-[#211c17] transition hover:border-[#c85a2b] hover:text-[#c85a2b]"
                        >
                          <Edit size={16} />

                          Edit
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {filteredDestinations.length === 0 && (
            <div className="py-20 text-center text-[#756b63]">
              No destinations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}