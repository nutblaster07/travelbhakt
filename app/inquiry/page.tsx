"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import InquiryForm from "@/components/inquiry/InquiryForm";

type Package = {
  id: number;
  title: string;
  slug: string;
  destinationId: number;
  description: string | null;
};

function InquiryContent() {
  const searchParams = useSearchParams();

  const packageSlug =
    searchParams.get("package") || "";

  const [packageData, setPackageData] =
    useState<Package | null>(null);

  const [loading, setLoading] = useState(
    Boolean(packageSlug)
  );

  useEffect(() => {
    if (!packageSlug) {
      setLoading(false);
      return;
    }

    const fetchPackage = async () => {
      try {
       const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages/slug/${packageSlug}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch package"
          );
        }

        const data: Package =
          await response.json();

        setPackageData(data);
      } catch (error) {
        console.error(
          "Error fetching package:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageSlug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading package details...
      </main>
    );
  }

  return (
    <main>
      <InquiryForm
        destinationName={
          packageData?.title || ""
        }
        packageId={
          packageData?.id ?? null
        }
        allowDestinationEdit={
          !packageSlug
        }
      />
    </main>
  );
}

export default function InquiryPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          Loading inquiry form...
        </main>
      }
    >
      <InquiryContent />
    </Suspense>
  );
}