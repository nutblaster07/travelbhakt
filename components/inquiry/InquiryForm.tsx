"use client";

import { useEffect, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

type DestinationInquiryFormProps = {
  destinationName?: string;
  allowDestinationEdit?: boolean;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  travellers: string;
  message: string;
};

export default function InquiryForm({
  destinationName = "",
  allowDestinationEdit = false,
}: DestinationInquiryFormProps)  {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    destination: destinationName,
    travelDate: "",
    travellers: "",
    message: "",
  });

  // Update destination when the page provides a different destination
  useEffect(() => {
    setFormData((previousData) => ({
      ...previousData,
      destination: destinationName || "",
    }));
  }, [destinationName]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Inquiry Data:", formData);

    // Later we will send formData to Spring Boot

    setSubmitted(true);
  }

  return (
    <section
      id="inquiry"
      className="bg-[#211c17] px-6 py-20 text-white lg:px-12"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
            Plan Your Journey
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
            Ready to explore
            <br />
            {destinationName || "India"}?
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            Tell us about your travel plans and we&apos;ll help you take the
            next step towards your journey to{" "}
            {destinationName || "India"}.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-[32px] bg-white p-6 text-[#211c17] sm:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
           <div>
            <label className="mb-2 block text-sm font-medium">
                Destination
            </label>

            <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                readOnly={!allowDestinationEdit}
                placeholder="Where would you like to go?"
                className={`w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b] ${
                !allowDestinationEdit
                    ? "cursor-not-allowed bg-[#f3eee6] text-[#756b63]"
                    : "bg-white"
                }`}
            />
            </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Destination
                </label>

                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#ded6cc] bg-[#f3eee6] px-4 py-3 text-[#756b63]"
                />
              </div>

              {/* Travel Date */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Travel Date
                </label>

                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
                />
              </div>

              {/* Travellers */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Number of Travellers
                </label>

                <input
                  type="number"
                  name="travellers"
                  min="1"
                  value={formData.travellers}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  className="w-full rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tell us about your trip
                </label>

                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={`Tell us about your trip to ${
                    destinationName || "India"
                  }...`}
                  className="w-full resize-none rounded-xl border border-[#ded6cc] px-4 py-3 outline-none focus:border-[#c85a2b]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c85a2b] px-6 py-4 font-semibold text-white transition hover:bg-[#a94720]"
              >
                Send Inquiry
                <Send size={18} />
              </button>
            </form>
          ) : (
            <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
              <CheckCircle2 size={60} className="text-[#c85a2b]" />

              <h3 className="mt-6 font-serif text-4xl">
                Inquiry Received!
              </h3>

              <p className="mt-4 max-w-md text-[#756b63]">
                Thank you for your interest in{" "}
                {destinationName || "India"}. We&apos;ll get back to you soon.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full border border-[#c85a2b] px-6 py-3 text-sm font-semibold text-[#c85a2b]"
              >
                Send Another Inquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}