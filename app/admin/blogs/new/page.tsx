"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Save,
  CheckCircle2,
  FileText,
} from "lucide-react";

type FormData = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
};

export default function NewBlogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    coverImage: "",
    isPublished: false,
    seoTitle: "",
    seoDescription: "",
  });

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (
        e.target as HTMLInputElement
      ).checked;

      setFormData((previousData) => ({
        ...previousData,
        [name]: checked,
      }));

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleTitleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    setFormData((previousData) => {
      const previousGeneratedSlug = generateSlug(
        previousData.title
      );

      return {
        ...previousData,
        title: value,
        slug:
          previousData.slug === "" ||
          previousData.slug === previousGeneratedSlug
            ? generateSlug(value)
            : previousData.slug,
      };
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: formData.title,
            slug: formData.slug,

            category:
              formData.category || null,

            excerpt:
              formData.excerpt || null,

            content: formData.content,

            coverImage:
              formData.coverImage || null,

            isPublished:
              formData.isPublished,

            seoTitle:
              formData.seoTitle || null,

            seoDescription:
              formData.seoDescription || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData =
          await response.json().catch(() => null);

        console.error(errorData);

        throw new Error(
          "Failed to create blog"
        );
      }

      setSuccess(
        "Blog created successfully!"
      );

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong while creating the blog."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f3ed] p-6 lg:p-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Back Button */}

        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#756b63] transition hover:text-[#c85a2b]"
        >
          <ArrowLeft size={17} />

          Back to Blogs
        </Link>

        {/* Header */}

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c85a2b]">
            Content Management
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#211c17] lg:text-5xl">
            Create New Blog
          </h1>

          <p className="mt-3 text-[#756b63]">
            Write and publish travel guides, stories and
            useful travel content.
          </p>
        </div>

        {/* Success */}

        {success && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-700">
            <CheckCircle2 size={20} />

            {success}
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-600">
            {error}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[32px] bg-white p-6 shadow-sm sm:p-10"
        >
          {/* Basic Information */}

          <div>
            <h2 className="flex items-center gap-3 font-serif text-3xl text-[#211c17]">
              <FileText
                size={28}
                className="text-[#c85a2b]"
              />

              Basic Information
            </h2>

            {/* Title */}

            <div className="mt-8">
              <label className="mb-2 block text-sm font-medium">
                Blog Title
              </label>

              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Top Places to Visit in Sikkim"
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Slug */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                URL Slug
              </label>

              <input
                required
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. top-places-to-visit-in-sikkim"
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />

              <p className="mt-2 text-xs text-[#756b63]">
                This will be used in the blog URL.
              </p>
            </div>

            {/* Category */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Travel Guide"
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Excerpt */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Short Excerpt
              </label>

              <textarea
                rows={3}
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a short summary of the blog..."
                className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Content */}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Blog Content
              </label>

              <textarea
                required
                rows={15}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your complete blog article here..."
                className="w-full resize-y rounded-xl border border-[#ded6cc] px-4 py-3 leading-7 outline-none transition focus:border-[#c85a2b]"
              />

              <p className="mt-2 text-xs text-[#756b63]">
                Write the complete content of your blog
                article.
              </p>
            </div>
          </div>

          {/* Cover Image */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">
            <h2 className="font-serif text-3xl text-[#211c17]">
              Cover Image
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Cover Image URL
              </label>

              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            {/* Image Preview */}

            {formData.coverImage && (
              <div className="mt-6 overflow-hidden rounded-2xl">
                <img
                  src={formData.coverImage}
                  alt={formData.title || "Blog cover"}
                  className="h-72 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SEO */}

          <div className="mt-10 border-t border-[#211c17]/10 pt-10">
            <h2 className="font-serif text-3xl text-[#211c17]">
              SEO Information
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                SEO Title
              </label>

              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                placeholder="e.g. Top Places to Visit in Sikkim | TravelBhakt"
                className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                SEO Description
              </label>

              <textarea
                rows={4}
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
                placeholder="Write a search engine description..."
                className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
              />
            </div>
          </div>

          {/* Publish */}

          <div className="mt-10 flex items-center justify-between rounded-2xl bg-[#f7f3ed] p-6">
            <div>
              <h3 className="font-semibold text-[#211c17]">
                Publish Blog
              </h3>

              <p className="mt-1 text-sm text-[#756b63]">
                Make this blog visible on your website.
              </p>
            </div>

            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-5 w-5 accent-[#c85a2b]"
            />
          </div>

          {/* Submit */}

          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-[#c85a2b] px-8 py-4 font-semibold text-white transition hover:bg-[#a94720] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />

                  Create Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}