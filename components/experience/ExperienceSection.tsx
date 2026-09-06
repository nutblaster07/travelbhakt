import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    title: "Mountains",
    slug: "mountains",
    subtitle: "Where the roads touch the sky",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    size: "large",
  },
  {
    title: "Spiritual India",
    slug: "spiritual-india",
    subtitle: "Journeys beyond destinations",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
    size: "small",
  },
  {
    title: "Wildlife",
    slug: "wildlife",
    subtitle: "Into India's untamed heart",
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=85",
    size: "small",
  },
  {
    title: "Road Trips",
    slug: "road-trips",
    subtitle: "The journey is the destination",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    size: "large",
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experiences"
      className="bg-[#211c17] px-6 py-24 text-white lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}

        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
            Travel your way
          </p>

          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Every traveller seeks
            <br />
            something different.
          </h2>

          <p className="mt-5 max-w-xl text-white/60">
            Choose the kind of journey you want, and discover places across
            India that match your travel story.
          </p>
        </div>

        {/* Experience Grid */}

        <div className="grid gap-5 md:grid-cols-2">
          {experiences.map((experience) => (
            <Link
              key={experience.slug}
              href={`/experiences/${experience.slug}`}
              className={`group relative block overflow-hidden rounded-3xl ${
                experience.size === "large"
                  ? "min-h-[420px]"
                  : "min-h-[320px]"
              }`}
            >
              {/* Image */}

              <img
                src={experience.image}
                alt={experience.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <p className="text-sm text-white/70">
                  {experience.subtitle}
                </p>

                <div className="mt-2 flex items-end justify-between">
                  <h3 className="font-serif text-3xl sm:text-4xl">
                    {experience.title}
                  </h3>

                  {/* Visual icon only */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={21} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}