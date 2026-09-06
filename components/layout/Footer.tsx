import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
    id="about"
    className="bg-[#17130f] px-6 pt-20 text-white lg:px-12"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">Explore India</h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Discover the beauty, culture, history, and incredible destinations
              that make India unique.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-4">
              
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
              >
                <FaXTwitter size={18} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Explore</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <Link
                  href="#destinations"
                  className="transition hover:text-white"
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  href="#culture"
                  className="transition hover:text-white"
                >
                  Culture
                </Link>
              </li>

              <li>
                <Link
                  href="#about"
                  className="transition hover:text-white"
                >
                  About India
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">Stay Connected</h3>

            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Follow us on social media and stay updated with new destinations,
              stories, and travel inspiration.
            </p>

            <a
              href="mailto:hello@example.com"
              className="mt-4 inline-block text-sm text-white transition hover:text-white/60"
            >
              hello@example.com
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Explore India. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link href="#" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}