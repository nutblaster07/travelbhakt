"use client";

import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    // Later this will connect to Spring Boot API
    console.log("Newsletter email:", email);

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section
      id="newsletter"
      className="bg-[#211c17] px-6 py-24 text-white lg:px-12"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center">
        
        {/* Left Side */}

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0784b]">
            Join The Journey
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            India has more stories
            <br />
            waiting for you.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Get travel stories, hidden destinations and seasonal travel ideas
            delivered occasionally. No spam. Just India worth exploring.
          </p>
        </div>

        {/* Right Side */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 sm:p-10">
          {!submitted ? (
            <>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#e0784b] text-[#211c17]">
                <Mail size={24} />
              </div>

              <h3 className="font-serif text-3xl">
                Become a Travel Bhakt.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Join travellers discovering the places that don't always appear
                in the usual guidebooks.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="min-h-14 flex-1 rounded-full border border-white/10 bg-white px-6 text-[#211c17] outline-none transition focus:border-[#e0784b]"
                  />

                  <button
                    type="submit"
                    className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#e0784b] px-7 font-semibold text-[#211c17] transition hover:scale-[1.02]"
                  >
                    Join Us
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>

              <p className="mt-5 text-xs text-white/40">
                By subscribing, you agree to receive travel updates from Travel
                Bhakt.
              </p>
            </>
          ) : (
            <div className="py-10 text-center">
              <div className="text-5xl">🙏</div>

              <h3 className="mt-6 font-serif text-3xl">
                Welcome to Travel Bhakt!
              </h3>

              <p className="mt-4 text-white/60">
                Your next journey might be closer than you think.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}