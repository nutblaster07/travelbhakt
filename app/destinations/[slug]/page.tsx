import Link from "next/link";
import DestinationInquiryForm from "../../../components/inquiry/InquiryForm";
import { ArrowLeft, MapPin, Calendar, Navigation } from "lucide-react";

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

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#211c17] px-6 py-3 text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f3ed]">
      {/* HERO */}
      <section className="relative min-h-[75vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <Link
          href="/"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[#211c17]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="absolute bottom-0 left-0 z-10 p-8 text-white sm:p-14">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <MapPin size={17} />
            {destination.state}
          </div>

          <h1 className="mt-4 font-serif text-6xl sm:text-8xl">
            {destination.name}
          </h1>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              Discover
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#211c17]">
              About {destination.name}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#756b63]">
              {destination.description}
            </p>
          </div>

          <div className="rounded-3xl bg-[#211c17] p-8 text-white">
            <Calendar className="text-[#e0784b]" />

            <p className="mt-6 text-sm text-white/60">
              BEST TIME TO VISIT
            </p>

            <h3 className="mt-2 font-serif text-2xl">
              {destination.bestTime}
            </h3>
          </div>
        </div>
      </section>

      {/* PLACEHOLDER SECTIONS */}
      <section className="bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-serif text-4xl text-[#211c17]">
            Things to Explore
          </h2>

          <p className="mt-5 max-w-2xl text-[#756b63]">
            We'll next add top attractions, things to do, how to reach and
            travel tips here.
          </p>
        </div>
      </section>
      <DestinationInquiryForm destinationName={destination.name} />
    </main>
  );
}