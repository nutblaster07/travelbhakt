import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

type DestinationCardProps = {
  name: string;
  location: string;
  description: string;
  image: string;
};

export default function DestinationCard({
  name,
  location,
  description,
  image,
}: DestinationCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/destinations/${slug}`}
      className="group relative block h-[420px] min-w-[280px] overflow-hidden rounded-3xl bg-[#1f1b18] sm:min-w-[320px]"
    >
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2 text-xs text-white backdrop-blur-md">
        <MapPin size={14} />
        {location}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/60">
          Explore India
        </p>

        <h3 className="font-serif text-3xl">{name}</h3>

        <p className="mt-2 max-w-[230px] text-sm leading-relaxed text-white/75">
          {description}
        </p>

        <div className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1f1b18] transition duration-300 group-hover:rotate-45">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </Link>
  );
}