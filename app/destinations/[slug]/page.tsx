import type { Metadata } from "next";
import Link from "next/link";
import DestinationInquiryForm from "../../../components/inquiry/InquiryForm";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";

const destinations: Record<
  string,
  {
    name: string;
    state: string;
    description: string;
    image: string;
    bestTime: string;
  }
> = {
  darjeeling: {
    name: "Darjeeling",
    state: "West Bengal",
    description:
      "Known for its tea gardens, Himalayan views and colonial charm, Darjeeling is one of India's most iconic hill destinations.",
    image:
      "https://images.unsplash.com/photo-1544636508-03a1b4e10d77?auto=format&fit=crop&w=1800&q=85",
    bestTime: "March to May and October to December",
  },

  tawang: {
    name: "Tawang",
    state: "Arunachal Pradesh",
    description:
      "A breathtaking Himalayan destination known for ancient monasteries, high mountain passes and beautiful lakes.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=85",
    bestTime: "March to October",
  },

  assam: {
    name: "Assam",
    state: "Northeast India",
    description:
      "A land of tea gardens, the Brahmaputra, wildlife and rich Assamese culture.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tea%20garden%20in%20Assam.jpg",
    bestTime: "October to April",
  },

  meghalaya: {
    name: "Meghalaya",
    state: "Northeast India",
    description:
      "Known for dramatic waterfalls, living root bridges, caves and some of the most beautiful landscapes in India.",
    image:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1800&q=85",
    bestTime: "October to April",
  },

  sikkim: {
    name: "Sikkim",
    state: "Eastern Himalayas",
    description:
      "A beautiful Himalayan destination known for snow-covered mountains, peaceful monasteries, pristine lakes and breathtaking valleys.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=85",
    bestTime: "March to June and October to December",
  },

  kerala: {
    name: "Kerala",
    state: "South India",
    description:
      "Known for its peaceful backwaters, tropical beaches, lush forests, hill stations and rich cultural traditions.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1800&q=85",
    bestTime: "September to March",
  },
};

/* =====================================================
   DYNAMIC SEO METADATA
===================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const destination = destinations[slug];

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.name} Travel Guide`,

    description: `Explore ${destination.name}, ${destination.state}. Discover the best time to visit, top attractions, things to do and everything you need to plan your trip to ${destination.name}.`,

    keywords: [
      destination.name,
      `${destination.name} travel`,
      `${destination.name} tourism`,
      `${destination.name} travel guide`,
      `places to visit in ${destination.name}`,
      `things to do in ${destination.name}`,
      `${destination.name} trip`,
      `${destination.name} tour`,
    ],

    alternates: {
      canonical: `/destinations/${slug}`,
    },

    openGraph: {
      type: "website",

      title: `${destination.name} Travel Guide | Travel Bhakt`,

      description: `Explore ${destination.name}, ${destination.state}. Discover attractions, travel experiences and the best time to visit.`,

      url: `https://travelgency.in/destinations/${slug}`,

      siteName: "Travel Bhakt",

      images: [
        {
          url: destination.image,
          width: 1200,
          height: 630,
          alt: `${destination.name} Travel Guide`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: `${destination.name} Travel Guide | Travel Bhakt`,

      description: `Explore ${destination.name}, ${destination.state} and plan your perfect journey.`,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =====================================================
   DESTINATION PAGE
===================================================== */

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const destination = destinations[slug];

  if (!destination) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-[#211c17]">
            Destination Not Found
          </h1>

          <p className="mt-4 text-[#756b63]">
            The destination you are looking for does not exist.
          </p>

          <Link
            href="/destinations"
            className="mt-6 inline-flex rounded-full bg-[#211c17] px-6 py-3 text-white transition hover:opacity-90"
          >
            Explore Destinations
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f3ed]">

      {/* ================= HERO ================= */}

      <section className="relative min-h-[75vh] overflow-hidden">

        <img
          src={destination.image}
          alt={`${destination.name} travel destination`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        {/* BACK BUTTON */}

        <Link
          href="/destinations"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[#211c17] transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          All Destinations
        </Link>

        {/* HERO CONTENT */}

        <div className="absolute bottom-0 left-0 z-10 p-8 text-white sm:p-14">

          <div className="flex items-center gap-2 text-sm text-white/80">
            <MapPin size={17} />

            {destination.state}
          </div>

          <h1 className="mt-4 font-serif text-6xl sm:text-8xl">
            {destination.name}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Discover the beauty, culture and unforgettable experiences of{" "}
            {destination.name}.
          </p>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className="px-6 py-20 lg:px-12">

        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.4fr_0.6fr]">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              Discover {destination.name}
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#211c17]">
              About {destination.name}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#756b63]">
              {destination.description}
            </p>

            <p className="mt-5 max-w-2xl leading-relaxed text-[#756b63]">
              Whether you are planning a short getaway or a longer journey,
              {destination.name} offers unique landscapes, local experiences
              and memorable moments for every type of traveller.
            </p>

          </div>

          {/* BEST TIME */}

          <div className="rounded-3xl bg-[#211c17] p-8 text-white">

            <Calendar className="text-[#e0784b]" />

            <p className="mt-6 text-sm font-medium text-white/60">
              BEST TIME TO VISIT
            </p>

            <h3 className="mt-2 font-serif text-2xl">
              {destination.bestTime}
            </h3>

          </div>

        </div>

      </section>

      {/* ================= THINGS TO EXPLORE ================= */}

      <section className="bg-white px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1200px]">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
            Experiences
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#211c17]">
            Things to Explore in {destination.name}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#756b63]">
            Discover scenic landscapes, local culture, food, nature and unique
            experiences that make {destination.name} a memorable travel
            destination.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-3xl bg-[#f7f3ed] p-8">
              <h3 className="font-serif text-2xl text-[#211c17]">
                Explore Nature
              </h3>

              <p className="mt-4 leading-relaxed text-[#756b63]">
                Discover breathtaking landscapes, scenic viewpoints and
                beautiful natural surroundings.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f7f3ed] p-8">
              <h3 className="font-serif text-2xl text-[#211c17]">
                Local Culture
              </h3>

              <p className="mt-4 leading-relaxed text-[#756b63]">
                Experience local traditions, communities, food and culture
                during your journey.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f7f3ed] p-8">
              <h3 className="font-serif text-2xl text-[#211c17]">
                Unforgettable Views
              </h3>

              <p className="mt-4 leading-relaxed text-[#756b63]">
                Capture beautiful moments and experience views that make your
                trip truly memorable.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= TRAVEL GUIDE ================= */}

      <section className="px-6 py-20 lg:px-12">

        <div className="mx-auto max-w-[1200px]">

          <div className="rounded-[32px] bg-[#211c17] p-8 text-white sm:p-12">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
              Travel Guide
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Plan Your Trip to {destination.name}
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              Planning a trip to {destination.name}? Travel Bhakt can help you
              discover destinations, create travel plans and find experiences
              that match your journey.
            </p>

            <Link
              href="/packages"
              className="mt-8 inline-flex rounded-full bg-[#e0784b] px-7 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Explore Travel Packages
            </Link>

          </div>

        </div>

      </section>

      {/* ================= INQUIRY FORM ================= */}

      <DestinationInquiryForm
        destinationName={destination.name}
      />

    </main>
  );
}