import Link from "next/link";
import { packages } from "@/data/packages";

export default function PackagesSection() {
  return (
    <section id="packages" className="bg-[#f7f3ed] px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
          Travel Packages
        </p>

        <h2 className="mt-4 font-serif text-4xl text-[#211c17] sm:text-5xl">
          Explore Our Packages
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg.slug}
              href={`/packages/${pkg.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-[#c85a2b]">
                  {pkg.destination}
                </p>

                <h3 className="mt-2 font-serif text-2xl text-[#211c17]">
                  {pkg.title}
                </h3>

                <p className="mt-3 text-sm text-[#756b63]">
                  {pkg.duration}
                </p>

                <p className="mt-5 font-semibold text-[#211c17]">
                  From ₹{pkg.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/packages"
          className="mt-10 inline-flex rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white"
        >
          View All Packages
        </Link>
      </div>
    </section>
  );
}