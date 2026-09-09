import Link from "next/link";

const destinations = [
  {
    name: "Darjeeling",
    slug: "darjeeling",
    state: "West Bengal",
  },
  {
    name: "Tawang",
    slug: "tawang",
    state: "Arunachal Pradesh",
  },
  {
    name: "Assam",
    slug: "assam",
    state: "Northeast India",
  },
  {
    name: "Meghalaya",
    slug: "meghalaya",
    state: "Northeast India",
  },
  {
    name: "Sikkim",
    slug: "sikkim",
    state: "Eastern Himalayas",
  },
  {
    name: "Kerala",
    slug: "kerala",
    state: "South India",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
          Explore India
        </p>

        <h1 className="mt-4 font-serif text-5xl text-[#211c17] sm:text-6xl">
          Discover Destinations
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#756b63]">
          Explore beautiful destinations across India and discover your next
          unforgettable journey.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="rounded-3xl bg-white p-8 transition hover:-translate-y-1"
            >
              <p className="text-sm text-[#c85a2b]">
                {destination.state}
              </p>

              <h2 className="mt-3 font-serif text-3xl text-[#211c17]">
                {destination.name}
              </h2>

              <p className="mt-6 text-sm font-semibold text-[#211c17]">
                Explore Destination →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}