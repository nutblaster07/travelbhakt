import Link from "next/link";
import { ArrowLeft, MapPin, ArrowRight } from "lucide-react";

type Experience = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  destinations: string[];
};

const experiences: Record<string, Experience> = {
  mountains: {
    title: "Mountains",
    subtitle: "Where the roads touch the sky",
    description:
      "From the Himalayas to peaceful hill towns, mountain journeys offer dramatic landscapes, winding roads, fresh air and unforgettable adventures.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",
    destinations: [
      "Tawang",
      "Sikkim",
      "Darjeeling",
      "Himachal Pradesh",
    ],
  },

  "spiritual-india": {
    title: "Spiritual India",
    subtitle: "Journeys beyond destinations",
    description:
      "Discover ancient temples, peaceful monasteries, sacred rivers and places where culture, history and spirituality come together.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1800&q=85",
    destinations: [
      "Varanasi",
      "Rishikesh",
      "Bodh Gaya",
      "Tawang",
    ],
  },

  wildlife: {
    title: "Wildlife",
    subtitle: "Into India's untamed heart",
    description:
      "Explore national parks, forests and wildlife landscapes where you can experience India's incredible biodiversity and natural beauty.",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1800&q=85",
    destinations: [
      "Kaziranga",
      "Jim Corbett",
      "Ranthambore",
      "Sundarbans",
    ],
  },

  "road-trips": {
    title: "Road Trips",
    subtitle: "The journey is the destination",
    description:
      "Discover scenic highways, mountain roads, coastal routes and journeys where every stop becomes part of the adventure.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    destinations: [
      "Ladakh",
      "Spiti Valley",
      "Arunachal Pradesh",
      "Rajasthan",
    ],
  },
};

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const experience = experiences[slug];

  if (!experience) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-6">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-[#211c17]">
            Experience Not Found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#c85a2b] px-6 py-3 text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#211c17]">
      {/* Hero */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        {/* Back Button */}
        <Link
          href="/"
          className="absolute left-6 top-8 z-10 flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-5 py-3 text-sm text-white backdrop-blur-md transition hover:bg-white hover:text-black lg:left-12"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 text-white lg:px-12 lg:pb-24">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f08b5d]">
            Travel Experience
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-6xl sm:text-7xl lg:text-8xl">
            {experience.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-white/75">
            {experience.subtitle}
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
            Discover Your Journey
          </p>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Travel beyond the ordinary.
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-[#756b63]">
            {experience.description}
          </p>
        </div>
      </section>

      {/* Related Destinations */}
      <section className="bg-[#ebe4da] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
            Explore
          </p>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Destinations for this journey
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experience.destinations.map((destination) => {
              const destinationSlug = destination
                .toLowerCase()
                .replace(/\s+/g, "-");

              return (
                <Link
                  key={destination}
                  href={`/destinations/${destinationSlug}`}
                  className="group rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <MapPin size={20} className="text-[#c85a2b]" />

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>

                  <h3 className="mt-8 font-serif text-2xl">
                    {destination}
                  </h3>

                  <p className="mt-2 text-sm text-[#756b63]">
                    Explore this destination
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}