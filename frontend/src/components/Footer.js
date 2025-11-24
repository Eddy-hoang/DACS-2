import React, { useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {

  // Fade-in animation on scroll
  useEffect(() => {
    const sections = document.querySelectorAll(".footer-animate");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }, []);

  return (
    <footer className="relative bg-[#141820] text-gray-300 pt-24 pb-12 mt-0 overflow-hidden">

      {/* 🔥 Gradient Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-lg shadow-yellow-500/30"></div>

      {/* ⭐ MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 px-6 footer-animate opacity-0">

        {/* 📍 CONTACT */}
        <div className="text-center">
          <h3 className="text-3xl font-[Dancing Script] text-white mb-4">
            Contact Us
          </h3>

          <p className="flex justify-center items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-yellow-400" /> Ho Chi Minh City
          </p>

          <p className="flex justify-center items-center gap-2 mb-2">
            <FaPhoneAlt className="text-yellow-400" /> +84 123 456 789
          </p>

          <p className="flex justify-center items-center gap-2">
            <FaEnvelope className="text-yellow-400" /> feane@gmail.com
          </p>
        </div>

        {/* 🍔 BRAND */}
        <div className="text-center">
          <h3 className="text-3xl font-[Dancing Script] text-yellow-400 mb-4">
            Feane
          </h3>

          <p className="max-w-md mx-auto leading-relaxed text-gray-400 mb-6">
            Bringing unforgettable flavors crafted with passion, authenticity,
            and premium ingredients. Your satisfaction is our signature.
          </p>

          {/* 🔥 ICONS */}
          <div className="flex justify-center gap-5 text-xl">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-full bg-[#1e242f] flex items-center justify-center 
                           hover:bg-yellow-400 hover:text-black transition-all duration-300 
                           cursor-pointer shadow-md hover:shadow-yellow-400/40"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* 🕒 OPENING HOURS */}
        <div className="text-center">
          <h3 className="text-3xl font-[Dancing Script] text-white mb-4">
            Opening Hours
          </h3>

          <p>Everyday</p>
          <p className="text-yellow-400 text-lg font-semibold mt-1">
            10:00 AM – 10:00 PM
          </p>
        </div>
      </div>

      {/* ⭐ COPYRIGHT */}
      <div className="text-center mt-16 text-sm text-gray-500 footer-animate opacity-0">
        <p>© {new Date().getFullYear()} Feane. All Rights Reserved.</p>
        <p className="mt-1 opacity-70">
          Designed with ❤️ | Premium Tailwind Edition
        </p>
      </div>

      {/* 📌 EXTRA ANIMATIONS */}
      <style>{`
        .footer-animate {
          transform: translateY(40px);
          transition: all 0.8s ease-out;
        }
        .footer-animate.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </footer>
  );
}
