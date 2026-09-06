"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

type InquiryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InquiryPopup({
  isOpen,
  onClose,
}: InquiryPopupProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Later: send this data to Spring Boot API
    setSubmitted(true);
  }

  function handleClose() {
    setSubmitted(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-black/60 backdrop-blur-sm md:items-center md:justify-center">
      {/* Popup */}

      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-[32px] bg-[#f7f3ed] p-6 shadow-2xl md:max-w-xl md:rounded-[32px]">
        
        {/* Close Button */}

        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#e9e1d8] text-[#211c17] transition hover:bg-[#dcd2c7]"
          aria-label="Close inquiry form"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            {/* Heading */}

            <div className="pr-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c85a2b]">
                Plan Your Journey
              </p>

              <h2 className="mt-3 font-serif text-4xl text-[#211c17]">
                Where would you like to go?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#756b63]">
                Tell us about your travel plans and we&apos;ll help you plan
                your journey.
              </p>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >
              <input
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
              />

              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
              />

              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
              />

              <input
                required
                type="text"
                placeholder="Where do you want to travel?"
                className="w-full rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="w-full rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
                />

                <input
                  type="number"
                  min="1"
                  placeholder="Travellers"
                  className="w-full rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
                />
              </div>

              <textarea
                rows={4}
                placeholder="Tell us about your trip..."
                className="w-full resize-none rounded-xl border border-[#ded6cc] bg-white px-4 py-3 outline-none focus:border-[#c85a2b]"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-4 font-semibold text-white transition hover:bg-[#a94720]"
              >
                Send Inquiry
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
            <CheckCircle2
              size={64}
              className="text-[#c85a2b]"
            />

            <h2 className="mt-6 font-serif text-4xl text-[#211c17]">
              Inquiry Received!
            </h2>

            <p className="mt-4 max-w-sm text-[#756b63]">
              Thank you for contacting TravelBhakt. We&apos;ll get back to you
              soon.
            </p>

            <button
              onClick={handleClose}
              className="mt-8 rounded-full bg-[#211c17] px-6 py-3 font-semibold text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}