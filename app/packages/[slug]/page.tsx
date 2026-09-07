import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  X,
  CalendarDays,
  MapPin,
  Car,
  Hotel,
  ChevronRight,
} from "lucide-react";

import { packages } from "@/data/packages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PackagePage({ params }: PageProps) {
  const { slug } = await params;

  const packageData = packages.find(
    (item) => item.slug === slug
  );

  if (!packageData) {
    notFound();
  }

  return (
    <main className="bg-[#f7f3ed] text-[#211c17]">

      {/* HERO */}

      <section className="relative h-[500px] overflow-hidden">
        <img
          src={packageData.image}
          alt={packageData.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 mx-auto flex max-w-[1400px] items-end px-6 pb-16 lg:px-12">
          <div className="text-white">

            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/80">
              <MapPin size={16} />
              {packageData.destination}
            </div>

            <h1 className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl">
              {packageData.title}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-lg text-white/90">
              <CalendarDays size={19} />
              {packageData.duration}
            </div>

          </div>
        </div>
      </section>


      {/* QUICK PACKAGE INFO */}

      <section className="border-b border-[#ded6cc] bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 py-8 sm:grid-cols-3 lg:px-12">

          <div>
            <p className="text-sm text-[#756b63]">Destination</p>
            <p className="mt-1 text-lg font-semibold">
              {packageData.destination}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#756b63]">Duration</p>
            <p className="mt-1 text-lg font-semibold">
              {packageData.duration}
            </p>
          </div>

          <div>
            <p className="text-sm text-[#756b63]">Starting From</p>
            <p className="mt-1 text-2xl font-bold text-[#c85a2b]">
              ₹{packageData.price}
            </p>
          </div>

        </div>
      </section>


      {/* MAIN CONTENT */}

      <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 lg:grid-cols-[1fr_340px] lg:px-12">

        {/* LEFT CONTENT */}

        <div>

          {/* ABOUT */}

          <section>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              About the Journey
            </p>

            <h2 className="mt-4 font-serif text-4xl">
              Discover {packageData.destination}
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#756b63]">
              {packageData.description}
            </p>
          </section>


          {/* HIGHLIGHTS */}

          <section className="mt-20">
            <h2 className="font-serif text-4xl">
              Trip Highlights
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {packageData.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-2xl bg-white p-5"
                >
                  <Check
                    size={20}
                    className="shrink-0 text-[#c85a2b]"
                  />

                  <p className="text-[#756b63]">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* ITINERARY */}

          <section className="mt-20">
            <h2 className="font-serif text-4xl">
              Day-by-Day Itinerary
            </h2>

            <div className="mt-10 space-y-5">
              {packageData.itinerary.map((item) => (
                <article
                  key={item.day}
                  className="rounded-3xl bg-white p-6 sm:p-8"
                >
                  <div className="flex gap-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#211c17] text-sm font-bold text-white">
                      {item.day.replace("Day ", "D")}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#c85a2b]">
                        {item.day}
                      </p>

                      <h3 className="mt-2 font-serif text-2xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 leading-relaxed text-[#756b63]">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </section>


          {/* INCLUSIONS / EXCLUSIONS */}

          <section className="mt-20 grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl bg-white p-7">
              <h2 className="font-serif text-3xl">
                What's Included
              </h2>

              <ul className="mt-6 space-y-4">
                {packageData.inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[#756b63]"
                  >
                    <Check
                      size={20}
                      className="shrink-0 text-[#c85a2b]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>


            <div className="rounded-3xl bg-white p-7">
              <h2 className="font-serif text-3xl">
                What's Not Included
              </h2>

              <ul className="mt-6 space-y-4">
                {packageData.exclusions.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[#756b63]"
                  >
                    <X
                      size={20}
                      className="shrink-0 text-red-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </section>


          {/* ACCOMMODATION */}

          <section className="mt-20">
            <div className="flex items-center gap-3">
              <Hotel className="text-[#c85a2b]" />
              <h2 className="font-serif text-4xl">
                Accommodation
              </h2>
            </div>

            <div className="mt-8 space-y-4">
              {packageData.accommodation.map((hotel) => (
                <div
                  key={hotel.location}
                  className="rounded-2xl bg-white p-6"
                >
                  <h3 className="text-xl font-semibold">
                    {hotel.location}
                  </h3>

                  <p className="mt-2 text-[#756b63]">
                    {hotel.details}
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* TRANSPORT */}

          <section className="mt-20 rounded-3xl bg-[#211c17] p-8 text-white">

            <div className="flex items-center gap-3">
              <Car className="text-[#e0784b]" />
              <h2 className="font-serif text-3xl">
                Transport
              </h2>
            </div>

            <p className="mt-5 leading-relaxed text-white/65">
              {packageData.transport}
            </p>

          </section>


          {/* FAQ */}

          <section className="mt-20">
            <h2 className="font-serif text-4xl">
              Frequently Asked Questions
            </h2>

            <div className="mt-8 space-y-4">
              {packageData.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl bg-white p-6"
                >
                  <summary className="cursor-pointer text-lg font-semibold">
                    {faq.question}
                  </summary>

                  <p className="mt-4 leading-relaxed text-[#756b63]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>


          {/* MAP */}

          <section className="mt-20">
            <h2 className="font-serif text-4xl">
              Where You'll Travel
            </h2>

            <a
              href={packageData.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-between rounded-3xl bg-white p-8 transition hover:bg-[#efe8df]"
            >
              <div>
                <MapPin className="text-[#c85a2b]" />

                <p className="mt-4 text-xl font-semibold">
                  View {packageData.destination} on Google Maps
                </p>
              </div>

              <ChevronRight />
            </a>
          </section>

        </div>


        {/* STICKY BOOKING CARD */}

        <aside className="h-fit rounded-3xl bg-[#211c17] p-7 text-white lg:sticky lg:top-24">

          <p className="text-sm text-white/60">
            Starting from
          </p>

          <p className="mt-2 text-4xl font-bold">
            ₹{packageData.price}
          </p>

          <p className="mt-2 text-sm text-white/60">
            {packageData.duration}
          </p>

          <Link
            href="#inquiry"
            className="mt-7 flex w-full items-center justify-center rounded-full bg-[#c85a2b] px-6 py-4 font-semibold transition hover:bg-[#a94720]"
          >
            Plan This Trip
          </Link>

          <p className="mt-5 text-center text-xs text-white/50">
            No obligation. Our travel experts will contact you.
          </p>

        </aside>

      </section>


      {/* INQUIRY CTA */}

      <section
        id="inquiry"
        className="bg-[#211c17] px-6 py-20 text-white lg:px-12"
      >
        <div className="mx-auto max-w-[1000px] text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
            Plan Your Journey
          </p>

          <h2 className="mt-5 font-serif text-5xl">
            Ready to explore {packageData.destination}?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-white/60">
            Send us your travel requirements and we'll help you customize
            the perfect journey.
          </p>

          <Link
            href="/#inquiry"
            className="mt-8 inline-flex rounded-full bg-[#c85a2b] px-8 py-4 font-semibold"
          >
            Send an Inquiry
          </Link>

        </div>
      </section>

    </main>
  );
}