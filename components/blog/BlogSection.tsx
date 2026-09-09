"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type Blog = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://travelbhakt-backend-production.up.railway.app";

export default function BlogSection() {
  const [blogs, setBlogs] =
    useState<Blog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const scrollRef =
    useRef<HTMLDivElement>(null);

  const isInteracting =
    useRef(false);
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://travelbhakt-backend-production.up.railway.app";

  /*
  =====================================================
  FETCH BLOGS FROM BACKEND
  =====================================================
  */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "Blogs API URL:",
          API_URL
        );

        const response = await fetch(
          `${API_URL}/blogs`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load blogs: ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid blogs response"
          );
        }

        const publishedBlogs =
          data.filter(
            (blog: Blog) =>
              blog.isPublished === true
          );

        /*
        Sort newest first
        */

        const latestBlogs =
          publishedBlogs
            .sort(
              (a: Blog, b: Blog) =>
                new Date(
                  b.createdAt
                ).getTime() -
                new Date(
                  a.createdAt
                ).getTime()
            )
            .slice(0, 6);

        setBlogs(latestBlogs);
      } catch (error) {
        console.error(
          "Error fetching blogs:",
          error
        );

        setError(
          "Unable to load travel stories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /*
  =====================================================
  AUTO SCROLL
  =====================================================
  */

  useEffect(() => {
    const container =
      scrollRef.current;

    if (
      !container ||
      blogs.length <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      if (isInteracting.current) {
        return;
      }

      const isAtEnd =
        container.scrollLeft +
          container.clientWidth >=
        container.scrollWidth - 10;

      if (isAtEnd) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left:
            container.clientWidth *
            0.85,
          behavior: "smooth",
        });
      }
    }, 3500);

    return () =>
      clearInterval(interval);
  }, [blogs.length]);

  /*
  =====================================================
  PAUSE AUTO SCROLL
  =====================================================
  */

  const pauseAutoScroll = () => {
    isInteracting.current = true;

    setTimeout(() => {
      isInteracting.current = false;
    }, 3000);
  };

  /*
  =====================================================
  SCROLL LEFT
  =====================================================
  */

  const scrollLeft = () => {
    const container =
      scrollRef.current;

    if (!container) return;

    pauseAutoScroll();

    const isAtStart =
      container.scrollLeft <= 10;

    if (isAtStart) {
      container.scrollTo({
        left: container.scrollWidth,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left:
          -(
            container.clientWidth *
            0.85
          ),
        behavior: "smooth",
      });
    }
  };

  /*
  =====================================================
  SCROLL RIGHT
  =====================================================
  */

  const scrollRight = () => {
    const container =
      scrollRef.current;

    if (!container) return;

    pauseAutoScroll();

    const isAtEnd =
      container.scrollLeft +
        container.clientWidth >=
      container.scrollWidth - 10;

    if (isAtEnd) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left:
          container.clientWidth *
          0.85,
        behavior: "smooth",
      });
    }
  };

  /*
  =====================================================
  CALCULATE READ TIME
  =====================================================
  */

  function getReadTime(
    content: string
  ) {
    if (!content) {
      return "1 min read";
    }

    const words =
      content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const minutes =
      Math.max(
        1,
        Math.ceil(words / 200)
      );

    return `${minutes} min read`;
  }

  return (
    <section
      id="blog"
      className="bg-[#f7f3ed] px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* HEADING */}

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
              Travel Stories
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-[#211c17] sm:text-5xl">
              Stories that inspire
              <br />
              your next journey.
            </h2>

            <p className="mt-5 max-w-xl text-[#756b63]">
              Travel guides, stories and useful
              tips to help you discover India in
              a different way.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#211c17]"
            >
              View All Stories

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            {blogs.length > 1 && (
              <div className="flex gap-3">

                <button
                  onClick={scrollLeft}
                  aria-label="Previous travel stories"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
                >
                  <ArrowLeft size={19} />
                </button>

                <button
                  onClick={scrollRight}
                  aria-label="Next travel stories"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#211c17]/20 text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
                >
                  <ArrowRight size={19} />
                </button>

              </div>
            )}

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="flex justify-center py-16">
            <div className="text-[#756b63]">
              Loading travel stories...
            </div>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-3xl bg-white p-10 text-center">

            <FileText
              size={32}
              className="mx-auto text-[#c85a2b]"
            />

            <p className="mt-4 text-[#756b63]">
              {error}
            </p>

          </div>
        )}

        {/* EMPTY STATE */}

        {!loading &&
          !error &&
          blogs.length === 0 && (
            <div className="rounded-3xl bg-white p-10 text-center">

              <FileText
                size={32}
                className="mx-auto text-[#c85a2b]"
              />

              <h3 className="mt-4 font-serif text-2xl text-[#211c17]">
                Stories coming soon
              </h3>

              <p className="mt-3 text-[#756b63]">
                New travel stories and guides
                will appear here soon.
              </p>

            </div>
          )}

        {/* BLOG CAROUSEL */}

        {!loading &&
          !error &&
          blogs.length > 0 && (
            <div
              ref={scrollRef}
              onMouseEnter={() => {
                isInteracting.current = true;
              }}
              onMouseLeave={() => {
                isInteracting.current = false;
              }}
              onTouchStart={() => {
                isInteracting.current = true;
              }}
              onTouchEnd={() => {
                setTimeout(() => {
                  isInteracting.current = false;
                }, 3000);
              }}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
            >

              {blogs.map((blog) => (

                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group w-[85vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:w-[60vw] lg:w-[420px]"
                >

                  {/* IMAGE */}

                  <div className="relative h-[260px] overflow-hidden">

                    {blog.coverImage ? (

                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center bg-[#211c17]/5">

                        <FileText
                          size={40}
                          className="text-[#756b63]"
                        />

                      </div>

                    )}

                    {/* CATEGORY */}

                    {blog.category && (

                      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#211c17] backdrop-blur-md">

                        {blog.category}

                      </div>

                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="p-7">

                    <div className="flex items-center gap-2 text-xs text-[#8a7f76]">

                      <Clock size={14} />

                      {getReadTime(
                        blog.content
                      )}

                    </div>

                    <h3 className="mt-4 font-serif text-2xl leading-tight text-[#211c17]">

                      {blog.title}

                    </h3>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#756b63]">

                      {blog.excerpt ||
                        "Discover this travel story and explore more."}

                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#c85a2b]">

                      Read Article

                      <ArrowUpRight
                        size={17}
                        className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                      />

                    </div>

                  </div>

                </Link>

              ))}

            </div>
          )}

      </div>
    </section>
  );
}