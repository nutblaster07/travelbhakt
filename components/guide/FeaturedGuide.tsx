import Link from "next/link";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";

export default function FeaturedGuide() {
  return (
    <section
      id="guides"
      className="bg-[#f7f3ed] px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section heading */}

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#b84f25]">
              Travel Stories
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#211c17] sm:text-5xl">
              Stories Worth Taking
              <br />
              The Long Way For.
            </h2>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-[#211c17] transition hover:text-[#c85a2b]"
          >
            View All Stories
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Featured Story */}

        <article className="grid overflow-hidden rounded-[32px] border border-[#e5dbd0] bg-white lg:grid-cols-2">
          {/* Image */}

          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85"
              alt="Northeast India mountains"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#211c17]">
              FEATURED STORY
            </div>
          </div>

          {/* Content */}

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#756b63]">
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                Northeast India
              </span>

              <span className="flex items-center gap-2">
                <Clock size={16} />
                8 min read
              </span>
            </div>

            <h3 className="mt-6 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl">
              7 Places in Northeast India That Don't Feel Real
            </h3>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#756b63]">
              From clouds floating through Meghalaya's hills to ancient
              monasteries hidden in the Himalayas, discover places that feel
              untouched by time.
            </p>

           <Link
              href="/guides/northeast-india"
              className="inline-flex items-center gap-3 rounded-full bg-[#211c17] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c85a2b]"
            >
              Read The Story
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}