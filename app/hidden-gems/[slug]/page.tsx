import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  ArrowRight,
  Calendar,
} from "lucide-react";

const hiddenGems: Record<
  string,
  {
    name: string;
    state: string;
    image: string;
    description: string;
    about: string;
    bestTime: string;
    howToReach: string;
  }
> = {
  majuli: {
    name: "Majuli",
    state: "Assam",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1600&q=85",
    description:
      "A peaceful river island filled with culture, monasteries and unforgettable landscapes.",
    about:
      "Majuli is a beautiful river island surrounded by the Brahmaputra. Known for its unique culture, peaceful villages and traditional monasteries, it offers a completely different side of Assam.",
    bestTime: "October to March",
    howToReach:
      "Reach Jorhat and take a ferry across the Brahmaputra to Majuli.",
  },

  "ziro-valley": {
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    description:
      "A peaceful Himalayan valley surrounded by green hills and traditional villages.",
    about:
      "Ziro Valley is known for its green landscapes, rice fields and unique tribal culture. The slow pace of life and beautiful surroundings make it one of India's most peaceful hidden destinations.",
    bestTime: "March to October",
    howToReach:
      "Travel to Itanagar or Naharlagun and continue towards Ziro by road.",
  },

  "dzukou-valley": {
    name: "Dzukou Valley",
    state: "Nagaland",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    description:
      "A breathtaking valley of rolling hills, seasonal flowers and mountain trails.",
    about:
      "Dzukou Valley is one of Northeast India's most beautiful trekking destinations. The valley is famous for its rolling green hills, clear streams and spectacular seasonal flowers.",
    bestTime: "June to September",
    howToReach:
      "Reach Kohima or Dimapur and travel towards the Dzukou Valley trekking route.",
  },
  mawlynnong: {
  name: "Mawlynnong",
  state: "Meghalaya",
  image:
    "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1600&q=85",
  description:
    "A peaceful village surrounded by lush greenery, clean streets and breathtaking natural beauty.",
  about:
    "Mawlynnong is a beautiful village in Meghalaya known for its community-driven cleanliness, green surroundings and peaceful atmosphere. Surrounded by forests and traditional Khasi villages, it offers travellers a calm and authentic experience of Northeast India.",
  bestTime: "October to April",
  howToReach:
    "Reach Shillong or Guwahati and travel by road towards Mawlynnong. Shillong is the most convenient major city for starting the journey.",
},
"spiti-valley": {
  name: "Spiti Valley",
  state: "Himachal Pradesh",
  image:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
  description:
    "A dramatic Himalayan desert of high mountain roads, ancient monasteries and unforgettable landscapes.",
  about:
    "Spiti Valley is a high-altitude Himalayan region known for its dramatic landscapes, remote villages and ancient Buddhist monasteries. The journey through Spiti is as memorable as the destination, with winding mountain roads, deep valleys and some of India's most breathtaking scenery.",
  bestTime: "May to October",
  howToReach:
    "Spiti Valley can be reached by road through Shimla or Manali, depending on the season and road conditions.",
},
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function HiddenGemPage({ params }: PageProps) {
  const { slug } = await params;

  const place = hiddenGems[slug];

  if (!place) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-6">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-[#211c17]">
            Place Not Found
          </h1>

          <p className="mt-4 text-[#756b63]">
            This hidden gem does not exist yet.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c85a2b] px-6 py-3 font-semibold text-white"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#211c17]">
      {/* Hero */}

      <section className="relative h-[75vh] min-h-[600px] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        <Link
          href="/#hidden-gems"
          className="absolute left-6 top-8 z-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-[#211c17] lg:left-12"
        >
          <ArrowLeft size={18} />
          Back to Hidden Gems
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 text-white lg:px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <MapPin size={17} />
              {place.state}
            </div>

            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-6xl lg:text-8xl">
              {place.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {place.description}
            </p>
          </div>
        </div>
      </section>

      {/* About */}

      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              Discover the hidden side
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              Why visit {place.name}?
            </h2>

            <p className="mt-7 text-lg leading-relaxed text-[#756b63]">
              {place.about}
            </p>
          </div>

          {/* Information Card */}

          <div className="rounded-3xl bg-[#211c17] p-8 text-white">
            <div className="border-b border-white/10 pb-6">
              <div className="flex items-center gap-3 text-[#e0784b]">
                <Calendar size={20} />

                <p className="text-sm font-semibold uppercase tracking-wider">
                  Best Time to Visit
                </p>
              </div>

              <p className="mt-4 text-lg">
                {place.bestTime}
              </p>
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-3 text-[#e0784b]">
                <MapPin size={20} />

                <p className="text-sm font-semibold uppercase tracking-wider">
                  How to Reach
                </p>
              </div>

              <p className="mt-4 leading-relaxed text-white/65">
                {place.howToReach}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}

      <section className="bg-[#211c17] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
              Ready to explore?
            </p>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              Plan your journey to {place.name}.
            </h2>

            <p className="mt-5 max-w-xl text-white/60">
              Tell us about your travel plans and start planning an unforgettable journey.
            </p>
          </div>

          <Link
            href={`/destinations/${slug}#destination-inquiry`}
            className="inline-flex items-center gap-3 rounded-full bg-[#c85a2b] px-7 py-4 font-semibold text-white transition hover:bg-[#a94720]"
          >
            Send Inquiry
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}