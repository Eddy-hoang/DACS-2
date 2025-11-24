import React, { useState, useEffect } from "react";

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [typingText, setTypingText] = useState("");

  // 🔤 Typing text effect
  useEffect(() => {
    const fullText = "We Are Feane";
    let index = 0;

    const timer = setInterval(() => {
      setTypingText(fullText.substring(0, index + 1));
      index++;

      if (index === fullText.length) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#111] min-h-screen py-24 px-6 md:px-20 overflow-hidden">

      {/* 🌟 PARALLAX BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/images/about-bg.jpg')",
          backgroundAttachment: "fixed"
        }}
      ></div>

      {/* ✨ FLOATING FOOD ICONS */}
      <img
        src="/images/floating-burger.png"
        className="w-32 absolute left-10 top-20 animate-float"
        alt=""
      />
      <img
        src="/images/floating-fries.png"
        className="w-24 absolute right-10 bottom-20 animate-float-delayed"
        alt=""
      />

      {/* 💡 MAIN CONTAINER */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* 📸 IMAGE with Glow */}
        <div className="relative animate-slideLeft opacity-0" style={{ animationFillMode: "forwards" }}>
          <div className="absolute -inset-4 bg-yellow-400 blur-3xl opacity-20"></div>

          <img
            src="/images/about-img.png"
            alt="burger"
            className="relative w-[85%] md:w-full drop-shadow-2xl rounded-lg 
                       transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* 📝 TEXT CONTENT */}
        <div className="text-white animate-slideRight opacity-0" style={{ animationFillMode: "forwards" }}>
          <h2 className="text-5xl md:text-6xl font-[Dancing Script] mb-6 text-yellow-400">
            {typingText}
            <span className="text-yellow-400 animate-blink">|</span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Feane is where flavor meets passion. Every meal is crafted with love,
            freshness, and creativity. We deliver unforgettable taste experiences
            using the highest-quality ingredients and signature secret recipes.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-3 rounded-full font-semibold 
                       shadow-lg hover:shadow-yellow-400/40 transition-all"
          >
            Read More
          </button>
        </div>
      </div>

      {/* 🔥 OUR STORY – MISSION – VISION */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

        {[
          { title: "Our Story", icon: "🍔", desc: "Born from passion, crafted with love." },
          { title: "Our Mission", icon: "🎯", desc: "Deliver unforgettable taste & quality." },
          { title: "Our Vision", icon: "🌟", desc: "Become the top fast-food experience." }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#1c1f27] p-8 rounded-xl shadow-xl transform hover:-translate-y-2 transition-all"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🪟 MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[600px] p-8 rounded-lg text-black relative animate-modal">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-2xl hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold mb-4 text-yellow-500">More About Feane</h2>
            <p className="leading-relaxed text-gray-700">
              At Feane, we take pride in delivering meals that ignite emotions.
              Our chefs combine creativity, tradition, and innovation to create
              unforgettable dishes. From signature burgers to handcrafted sauces,
              every detail matters.
            </p>
          </div>
        </div>
      )}

      {/* 🎬 CUSTOM ANIMATIONS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float { animation: float 5s ease-in-out infinite; }
          .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 1s; }

          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(60px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .animate-slideLeft { animation: slideLeft 1.1s ease-out; }
          .animate-slideRight { animation: slideRight 1.1s ease-out; }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            50.1%, 100% { opacity: 0; }
          }
          .animate-blink { animation: blink 1s infinite; }

          @keyframes modal {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-modal { animation: modal .3s ease-out; }
        `}
      </style>
    </section>
  );
}
