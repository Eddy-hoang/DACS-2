import { useEffect, useState } from "react";

export default function Home() {
  // =========================
  // IMAGE SLIDER (ULTRA)
  // =========================
  const images = [
    "/images/background.jpg",
    "/images/background2.jpg",
    "/images/background3.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const play = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400);
    }, 4500);

    return () => clearInterval(play);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden select-none">

      {/* BACKGROUND SLIDER */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ${
          fade ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{
          backgroundImage: `url('${images[index]}')`,
        }}
      ></div>

      {/* OVERLAY + LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/90"></div>
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent blur-3xl"></div>

      {/* FLOATING FOOD DECORATIONS */}
      <img
        src="/images/pizza.png"
        className="hidden md:block w-40 absolute top-[18%] right-[12%] opacity-80 animate-float-slow"
        alt=""
      />
      <img
        src="/images/fries.png"
        className="hidden md:block w-36 absolute bottom-[12%] left-[10%] opacity-80 animate-float-mid"
        alt=""
      />
      <img
        src="/images/burger.png"
        className="hidden md:block w-44 absolute bottom-[18%] right-[20%] opacity-80 animate-float-fast"
        alt=""
      />

      {/* MAIN CONTENT */}
      <div className="relative z-20 max-w-5xl px-8 md:px-16 pt-40">

        {/* TITLE */}
        <h1 className="text-white text-6xl md:text-7xl font-[Dancing Script] font-bold leading-tight drop-shadow-xl">
          <span className="inline-block animate-slide-reveal">Fast</span>{" "}
          <span className="inline-block animate-slide-reveal-delay">Food</span>{" "}
          <span className="inline-block animate-slide-reveal-delay2">Restaurant</span>
        </h1>

        {/* DESCRIPTION - Không còn khung hộp xấu nữa */}
        <p className="text-gray-200 text-lg md:text-xl max-w-xl mt-6 leading-relaxed drop-shadow-lg">
          Experience delicious moments crafted with passion.  
          Fresh ingredients, premium taste, unforgettable flavor.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          {/* NEON BUTTON */}
          <button className="px-8 py-3 text-black font-semibold bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-lg hover:shadow-yellow-500/40 transition-all hover:scale-[1.07]">
            Order Now
          </button>

          {/* OUTLINE BUTTON */}
          <button className="px-8 py-3 border border-white/50 text-white rounded-full backdrop-blur-md hover:border-yellow-400 hover:text-yellow-400 transition">
            Book a Table
          </button>
        </div>
      </div>

      {/* SLIDER DOTS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setIndex(i);
                setFade(true);
              }, 300);
            }}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              i === index
                ? "bg-yellow-400 shadow-[0_0_10px_3px_rgba(255,210,0,0.7)] scale-125"
                : "bg-white/60 hover:bg-white"
            }`}
          ></div>
        ))}
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-mid {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-fast {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }

        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-mid { animation: float-mid 4.5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 3.5s ease-in-out infinite; }

        @keyframes slide-reveal {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-reveal { animation: slide-reveal 1s ease-out forwards; }
        .animate-slide-reveal-delay { animation: slide-reveal 1.3s ease-out forwards; }
        .animate-slide-reveal-delay2 { animation: slide-reveal 1.6s ease-out forwards; }
      `}</style>

    </section>
  );
}
