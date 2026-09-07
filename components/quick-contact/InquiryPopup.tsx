"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

type InquiryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  destinationName?: string;
};

export default function InquiryPopup({
  isOpen,
  onClose,
  packageName = "",
  destinationName = "India",
}: InquiryPopupProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Later send data to Spring Boot backend

    setSubmitted(true);
  }

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl sm:p-10">
        {/* Close Button */}

        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f3eee6] text-[#211c17] transition hover:bg-[#211c17] hover:text-white"
          aria-label="Close inquiry form"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            {/* Heading */}

            <div className="pr-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
                Travel Inquiry
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[#211c17] sm:text-5xl">
                Plan Your Journey
              </h2>

              <p className="mt-4 text-[#756b63]">
                Tell us about your travel plans and our team will get back to
                you.
              </p>
            </div>

            {/* Selected Package */}

            {packageName && (
              <div className="mt-6 rounded-2xl bg-[#f7f3ed] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#756b63]">
                  Selected Package
                </p>

                <p className="mt-1 font-serif text-2xl text-[#211c17]">
                  {packageName}
                </p>

                <p className="mt-1 text-sm text-[#756b63]">
                  {destinationName}
                </p>
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5 sm:grid-cols-2"
            >
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Your Name *
                </label>

                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Phone Number *
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
                />
              </div>

              {/* Email */}

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
                />
              </div>

              {/* Destination */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Destination
                </label>

                <input
                  value={destinationName || ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#ded6cc] bg-[#f3eee6] px-4 py-3 text-[#756b63]"
                />
              </div>

              {/* Package */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Package
                </label>

                <input
                  value={packageName || "Custom Trip"}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#ded6cc] bg-[#f3eee6] px-4 py-3 text-[#756b63]"
                />
              </div>

              {/* Travel Date */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Expected Travel Date
                </label>

                <input
                  type="date"
                  name="travelDate"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
                />
              </div>

              {/* Travellers */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Number of Travellers
                </label>

                <input
                  type="number"
                  min="1"
                  name="travellers"
                  placeholder="e.g. 2"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
                />
              </div>

              {/* Message */}

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-[#211c17]">
                  Tell us about your trip
                </label>

                <textarea
                  rows={4}
                  name="message"
                  placeholder={`Tell us about your trip${
                    destinationName ? ` to ${destinationName}` : ""
                  }...`}
                  className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none transition focus:border-[#c85a2b]"
                />
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="sm:col-span-2 flex items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-4 font-semibold text-white transition hover:bg-[#a94720]"
              >
                Send Inquiry
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
            <CheckCircle2 size={64} className="text-[#c85a2b]" />

            <h2 className="mt-6 font-serif text-4xl text-[#211c17]">
              Inquiry Received!
            </h2>

            <p className="mt-4 max-w-md text-[#756b63]">
              Thank you for your interest
              {packageName ? ` in ${packageName}` : ""}. Our TravelBhakt team
              will contact you soon.
            </p>

            <button
              onClick={handleClose}
              className="mt-8 rounded-full bg-[#211c17] px-6 py-3 font-semibold text-white transition hover:bg-black"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}