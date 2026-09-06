"use client";

import { useState } from "react";
import { Phone, MessageCircle, Send } from "lucide-react";
import InquiryPopup from "./InquiryPopup";

export default function QuickContact() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <>
      {/* Mobile Quick Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e6ddd3] bg-white/95 px-3 py-3 backdrop-blur-lg md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2">

          {/* Call */}
          <a
            href="tel:+918250067309"
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[#211c17] transition active:bg-[#f3eee6]"
          >
            <Phone size={20} />

            <span className="text-xs font-medium">
              Call
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918250067309"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[#211c17] transition active:bg-[#f3eee6]"
          >
            <MessageCircle size={20} />

            <span className="text-xs font-medium">
              WhatsApp
            </span>
          </a>

          {/* Inquiry */}
          <button
            type="button"
            onClick={() => setIsInquiryOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-[#c85a2b] py-2 text-white transition active:scale-95"
          >
            <Send size={20} />

            <span className="text-xs font-semibold">
              Inquiry
            </span>
          </button>
        </div>
      </div>

      {/* Popup */}
      <InquiryPopup
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </>
  );
}