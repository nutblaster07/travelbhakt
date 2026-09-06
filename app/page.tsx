import DestinationCarousel from "@/components/destination/DestinationCarousel";
import ExperienceSection from "@/components/experience/ExperienceSection";
import FeaturedGuide from "../components/guide/FeaturedGuide";
import HiddenGems from "../components/hidden-gems/HiddenGems";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/layout/Footer";
import InquiryForm from "../components/inquiry/InquiryForm";
import BlogSection from "../components/blog/BlogSection";
import QuickContact from "../components/quick-contact/QuickContact";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Heart,
  Leaf,
  Map,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const popularDestinations = [
  {
    name: "Meghalaya",
    tagline: "Clouds, Caves & Living Roots",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=900&q=85",
  },
  {
  name: "Assam",
  tagline: "Land of Tea & Heritage",
  image:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Tea%20garden%20in%20Assam.jpg",
},
  {
    name: "Sikkim",
    tagline: "Where Peace Lives",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kerala",
    tagline: "God's Own Country",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Rajasthan",
    tagline: "Land of Royals",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
  },
];

const features = [
  {
    icon: Leaf,
    title: "Authentic",
    description: "Experiences",
  },
  {
    icon: Users,
    title: "Local",
    description: "Communities",
  },
  {
    icon: Map,
    title: "Curated",
    description: "Itineraries",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description: "Travel",
  },
  {
    icon: Camera,
    title: "Real Stories",
    description: "Real People",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ed] pb-24 text-[#201c18] md:pb-0">
      {/* ================= NAVBAR ================= */}

      <nav className="absolute left-0 top-0 z-30 w-full">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 lg:px-12">
          {/* Logo */}

         <a href="#" className="group flex items-center gap-3">
  

  <div className="flex flex-col">
    <span className="text-2xl font-bold tracking-tight text-[#1f1b18] sm:text-[28px]">
      Travel<span className="text-[#c85a2b]">Bhakt</span>
    </span>

    <span className="text-[9px] font-medium tracking-[0.18em] text-[#6b625b]">
      INDIA, BEYOND THE POSTCARD
    </span>
  </div>
</a>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-9 text-sm font-medium lg:flex">
            <a
              href="#destinations"
              className="transition hover:text-[#c85a2b]"
            >
              Destinations
            </a>

            <a href="#experiences" className="transition hover:text-[#c85a2b]">
              Experiences
            </a>

            <a href="#guides" className="transition hover:text-[#c85a2b]">
              Travel Guides
            </a>

            <a href="#about" className="transition hover:text-[#c85a2b]">
              About
            </a>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3">
            <button
              className="hidden rounded-full p-3 transition hover:bg-black/5 md:flex"
              aria-label="Search"
            >
              <Search size={21} />
            </button>

            <button
              className="hidden rounded-full p-3 transition hover:bg-black/5 md:flex"
              aria-label="Wishlist"
            >
              <Heart size={21} />
            </button>

            <a
              href="#inquiry"
              className="hidden rounded-full bg-[#c85a2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a94720] sm:block"
            >
              Plan a Trip
            </a>

            <button
              className="rounded-full p-2 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={25} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="relative min-h-[850px] overflow-hidden">
        {/* Background */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        {/* Warm Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#f7efe5]/90 via-[#f7efe5]/45 to-black/20" />

        {/* Hero Content */}

        <div className="relative z-10 mx-auto flex min-h-[850px] max-w-[1440px] items-center px-6 pt-24 lg:px-12">
          <div className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#b84f25]">
  Every journey has a story
</p>

<h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-[#211c17] sm:text-6xl lg:text-7xl">
  See India
  <br />

  <span className="text-[#c85a2b]">
    Beyond the
  </span>

  <br />

  Postcard.
</h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#5f554d] sm:text-lg">
  From misty Himalayan villages to ancient temples, wild forests,
  hidden islands and roads that lead to unforgettable stories.
</p>

            {/* Search */}

            <div className="mt-9 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/60 bg-white/95 p-2 shadow-xl backdrop-blur-md sm:flex-row">
              <div className="flex flex-1 items-center gap-3 px-5">
                <Search size={21} className="text-[#746960]" />

                <input
                  type="text"
                  placeholder="Where do you want to go in India?"
                  className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-[#8c827a]"
                />
              </div>

              <div className="hidden w-px bg-[#e8e0d8] sm:block" />

              <button className="flex items-center gap-2 px-5 py-4 text-sm text-[#4f4740]">
                <MapPin size={19} />

                Select Date
              </button>

              <button className="flex items-center justify-center gap-2 rounded-[22px] bg-[#c85a2b] px-9 py-4 font-semibold text-white transition hover:bg-[#aa4520]">
                Search
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Popular */}

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-[#665d56]">Popular:</span>

              {[
                "Assam",
                "Meghalaya",
                "Himachal Pradesh",
                "Kerala",
                "Varanasi",
                "Rajasthan",
              ].map((place) => (
                <button
                  key={place}
                  className="rounded-full border border-[#8b8178]/40 bg-white/20 px-4 py-2 text-[#3e3732] backdrop-blur-sm transition hover:bg-white/60"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="border-y border-[#e8e0d8] bg-[#fbf8f3]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-y divide-[#e8e0d8] md:grid-cols-5 md:divide-y-0">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex min-h-36 flex-col justify-center px-6 py-7 lg:px-10"
              >
                <Icon size={30} strokeWidth={1.5} />

                <p className="mt-4 font-semibold">{feature.title}</p>

                <p className="text-sm text-[#756b63]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}

      <section
        id="destinations"
        className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
              Explore Our
            </p>

            <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
              Popular Destinations
            </h2>

            <p className="mt-4 max-w-2xl text-[#756b63]">
              From snow-covered mountains to tropical beaches, discover the
              incredible diversity of India.
            </p>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 border-b border-[#9b8f84] pb-1 text-sm font-medium transition hover:text-[#c85a2b]"
          >
            View All Destinations
            <ArrowRight size={17} />
          </a>
        </div>

        {/* Destination Cards */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
         {popularDestinations.map((destination) => {
            const slug = destination.name
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <Link
                key={destination.name}
                href={`/destinations/${slug}`}
                className="group relative block h-[390px] overflow-hidden rounded-[22px] bg-black"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-serif text-2xl">
                    {destination.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    {destination.tagline}
                  </p>

                  {/* Visual arrow — not a button */}
                  <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition group-hover:scale-110 group-hover:translate-x-1">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            );
          })}
      
        </div>
      </section>
      <DestinationCarousel />
      <ExperienceSection />
      <FeaturedGuide />
      <HiddenGems />
      <BlogSection />
      <InquiryForm
        destinationName=""
        allowDestinationEdit={true}
      />
      <Newsletter />
      <Footer />
      <QuickContact />
    </main>
  );
}