import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

const blogs: Record<
  string,
  {
    title: string;
    category: string;
    readTime: string;
    description: string;
    image: string;
    content: string[];
  }
> = {
  "7-places-in-northeast-india": {
    title: "7 Places in Northeast India That Don't Feel Real",
    category: "Northeast India",
    readTime: "6 min read",
    description:
      "From living root bridges to Himalayan monasteries, discover places that make Northeast India feel like another world.",
    image:
      "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Northeast India is one of the most diverse and beautiful regions of the country. Mountains, forests, rivers and unique cultures make every journey feel different.",
      "From Meghalaya's green landscapes to the monasteries of Arunachal Pradesh, the region offers experiences that cannot easily be found anywhere else.",
      "Take your time, travel slowly and allow the journey itself to become part of the experience.",
    ],
  },

  "complete-guide-to-tawang": {
    title: "A Complete Guide to Tawang",
    category: "Travel Guide",
    readTime: "8 min read",
    description:
      "Everything you need to know before planning your journey to the mountains of Tawang.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Tawang is a mountain destination known for its dramatic landscapes, monasteries and peaceful atmosphere.",
      "The journey to Tawang is an adventure itself, taking travellers through winding Himalayan roads and spectacular mountain scenery.",
      "Plan your journey carefully and give yourself enough time to experience the destination at a slower pace.",
    ],
  },

  "best-time-to-visit-meghalaya": {
    title: "Best Time to Visit Meghalaya",
    category: "Travel Tips",
    readTime: "5 min read",
    description:
      "Plan your Meghalaya trip at the right time and experience its waterfalls, clouds and green landscapes.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85",
    content: [
      "Meghalaya changes character throughout the year, from dramatic monsoon landscapes to clearer skies during the cooler months.",
      "The best time for your trip depends on whether you want to experience waterfalls at their strongest or prefer easier sightseeing and outdoor travel.",
      "Planning according to the season can completely change your travel experience.",
    ],
  },
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const blog = blogs[slug];

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed] px-6">
        <div className="text-center">
          <h1 className="font-serif text-5xl text-[#211c17]">
            Article Not Found
          </h1>

          <Link
            href="/blog"
            className="mt-8 inline-flex rounded-full bg-[#c85a2b] px-6 py-3 text-white"
          >
            Back to Blog
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
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        <Link
          href="/blog"
          className="absolute left-6 top-8 z-10 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm text-white backdrop-blur-md hover:bg-white hover:text-[#211c17] lg:left-12"
        >
          <ArrowLeft size={18} />
          Back to Stories
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 text-white lg:px-12">
          <div className="mx-auto max-w-[1000px]">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f08b5d]">
              {blog.category}
            </p>

            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
              {blog.title}
            </h1>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <Clock size={16} />
              {blog.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Article */}

      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xl leading-relaxed text-[#756b63]">
          {blog.description}
        </p>

        <div className="mt-12 space-y-8 text-lg leading-relaxed text-[#4f4740]">
          {blog.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}