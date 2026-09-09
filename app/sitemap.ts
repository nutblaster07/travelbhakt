import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Home
    {
      url: "https://travelgency.in",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    // Main Destinations Page
    {
      url: "https://travelgency.in/destinations",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Packages
    {
      url: "https://travelgency.in/packages",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // Blog
    {
      url: "https://travelgency.in/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // Contact
    {
      url: "https://travelgency.in/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Darjeeling
    {
      url: "https://travelgency.in/destinations/darjeeling",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Tawang
    {
      url: "https://travelgency.in/destinations/tawang",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Assam
    {
      url: "https://travelgency.in/destinations/assam",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Meghalaya
    {
      url: "https://travelgency.in/destinations/meghalaya",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Sikkim
    {
      url: "https://travelgency.in/destinations/sikkim",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // Kerala
    {
      url: "https://travelgency.in/destinations/kerala",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}