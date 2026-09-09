import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Travel Bhakt for travel packages, destination information and personalized travel planning.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ed]">

      {/* HERO */}
      <section className="border-b border-[#211c17]/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px] text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c85a2b]">
            Get In Touch
          </p>

          <h1 className="mt-5 font-serif text-5xl text-[#211c17] sm:text-6xl lg:text-7xl">
            Contact Travel Bhakt
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#756b63]">
            Have questions about a destination or planning your next journey?
            Our team is here to help you plan a memorable travel experience.
          </p>

        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-2">

          {/* CONTACT DETAILS */}
          <div className="rounded-[32px] bg-[#211c17] p-8 text-white sm:p-12">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
              Contact Information
            </p>

            <h2 className="mt-5 font-serif text-4xl sm:text-5xl">
              Let's plan your next journey.
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-white/65">
              Whether you are looking for a customized travel package,
              destination recommendations or help planning your trip, feel
              free to contact us.
            </p>

            <div className="mt-10 space-y-6">

              {/* EMAIL */}
              <a
                href="mailto:contact@travelgency.in"
                className="flex items-center gap-5 rounded-2xl bg-white/10 p-5 transition hover:bg-white/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c85a2b]">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="text-sm text-white/55">
                    Email Us
                  </p>

                  <p className="mt-1 font-medium">
                    contact@travelgency.in
                  </p>
                </div>
              </a>

              {/* PHONE */}
              <a
                href="tel:+918250067309"
                className="flex items-center gap-5 rounded-2xl bg-white/10 p-5 transition hover:bg-white/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c85a2b]">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="text-sm text-white/55">
                    Call Us
                  </p>

                  <p className="mt-1 font-medium">
                    +91 82500 67309
                  </p>
                </div>
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/918250067309"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 rounded-2xl bg-white/10 p-5 transition hover:bg-white/15"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c85a2b]">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <p className="text-sm text-white/55">
                    WhatsApp
                  </p>

                  <p className="mt-1 font-medium">
                    Chat with Travel Bhakt
                  </p>
                </div>
              </a>

            </div>
          </div>

          {/* OFFICE / HOURS */}
          <div className="flex flex-col gap-8">

            <div className="rounded-[32px] bg-white p-8 shadow-sm sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f3ed] text-[#c85a2b]">
                <MapPin size={25} />
              </div>

              <h2 className="mt-6 font-serif text-3xl text-[#211c17]">
                Travel With Confidence
              </h2>

              <p className="mt-4 leading-relaxed text-[#756b63]">
                Travel Bhakt helps travellers discover incredible destinations
                and plan unforgettable journeys across India.
              </p>

            </div>

            <div className="rounded-[32px] bg-white p-8 shadow-sm sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f3ed] text-[#c85a2b]">
                <Clock size={25} />
              </div>

              <h2 className="mt-6 font-serif text-3xl text-[#211c17]">
                Working Hours
              </h2>

              <div className="mt-6 space-y-4 text-[#756b63]">

                <div className="flex justify-between border-b border-[#211c17]/10 pb-4">
                  <span>Monday – Friday</span>
                  <span className="font-medium text-[#211c17]">
                    9:00 AM – 6:00 PM
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#211c17]/10 pb-4">
                  <span>Saturday</span>
                  <span className="font-medium text-[#211c17]">
                    10:00 AM – 4:00 PM
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-[#c85a2b]">
                    Closed
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}