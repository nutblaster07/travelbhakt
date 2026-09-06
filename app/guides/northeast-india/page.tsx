import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NortheastIndiaGuidePage() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-[#211c17] lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#c85a2b]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
          Northeast India
        </p>

        <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
          7 Places in Northeast India That Don&apos;t Feel Real
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-[#756b63]">
          From Meghalaya's floating clouds and living root bridges to ancient
          monasteries hidden in the Himalayas, discover places that feel
          untouched by time.
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-[#4f4740]">
          <p>
            Northeast India is one of the most diverse and breathtaking regions
            of the country, filled with mountains, forests, rivers and cultures.
          </p>

          <p>
            Explore Meghalaya, Assam, Arunachal Pradesh, Sikkim and many more
            destinations through stories and unforgettable journeys.
          </p>
        </div>
      </div>
    </main>
  );
}