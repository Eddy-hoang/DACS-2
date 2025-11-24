import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Giảm số lượng, tối thiểu = 1
const decrease = () => {
  if (quantity > 1) setQuantity(quantity - 1);
};

// Tăng số lượng
const increase = () => {
  setQuantity(quantity + 1);
};

  useEffect(() => {
    fetch(`http://localhost/api/get_food.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error(err));
  }, [id]);

    if (!food) {
    return <div className="text-center py-20 text-xl">Đang tải dữ liệu...</div>;
    }

    const totalPrice = (food.price * quantity).toFixed(2);

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(/images/${food.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* LAYER LÀM MỜ BACKGROUND */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl"></div>

      {/* CONTENT WRAPPER */}
      <div className="relative p-6 md:p-20 z-10">

        {/* NÚT QUAY LẠI */}
        <button
        onClick={() => navigate("/menu")}
        className="
            inline-flex items-center gap-2
            bg-white/10 backdrop-blur-xl
            px-6 py-2
            rounded-full
            border border-yellow-500/20
            text-yellow-300
            font-medium tracking-wide
            shadow-[0_0_18px_rgba(255,200,0,0.25)]
            hover:shadow-[0_0_28px_rgba(255,200,0,0.45)]
            hover:text-yellow-200
            hover:bg-white/20
            transition-all
        "
        >
        <span className="text-xl">←</span>
        <span>Quay lại Menu</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center animate-fadeIn">

          {/* IMAGE CARD  — GLASS + GLOW */}
          <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_0_40px_rgba(255,200,0,0.3)] border border-yellow-500/20 flex justify-center items-center transform transition duration-500 hover:scale-105 hover:rotate-1">
            <img
              src={`/images/${food.image}`}
              alt={food.name}
              className="w-[420px] h-[420px] object-contain drop-shadow-[0_0_35px_rgba(255,220,0,0.5)]"
            />
          </div>

          {/* INFO PANEL — GLASS + TYPOGRAPHY */}
          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl animate-slideUp">

            {/* TAG */}
            <span className="inline-block bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-5">
              {food.type}
            </span>

            {/* TÊN MÓN */}
            <h1 className="text-5xl font-extrabold drop-shadow-lg tracking-wide leading-tight">
              {food.name}
            </h1>

            {/* GIÁ */}
            <p className="text-4xl text-yellow-400 font-extrabold mt-6 tracking-wider drop-shadow-xl">
              ${food.price}
            </p>

            {/* LINE */}
            <div className="w-full h-[2px] bg-white/10 my-7"></div>

            {/* MÔ TẢ */}
            <p className="text-gray-200 text-lg leading-relaxed drop-shadow-sm mb-10">
              {food.description}
            </p>
            {/* SỐ LƯỢNG */}
            <div className="flex items-center gap-6 mt-6">
            <span className="text-lg text-gray-300">Số lượng:</span>

            {/* Nút giảm */}
            <button
                onClick={decrease}
                className="w-10 h-10 flex items-center justify-center 
                rounded-full border border-yellow-500/30 text-yellow-300 text-xl
                hover:bg-yellow-500/20 transition"
            >
                –
            </button>

            {/* Hiển thị số lượng */}
            <span className="text-2xl font-bold">{quantity}</span>

            {/* Nút tăng */}
            <button
                onClick={increase}
                className="w-10 h-10 flex items-center justify-center 
                rounded-full border border-yellow-500/30 text-yellow-300 text-xl
                hover:bg-yellow-500/20 transition"
            >
                +
            </button>
            </div>
            {/* TỔNG */}
            <div className="mt-8 bg-[#1b2234]/80 px-6 py-4 rounded-2xl flex justify-between items-center 
            border border-yellow-500/20 shadow-lg">
            <span className="text-lg text-gray-300">Tổng cộng:</span>
            <span className="text-3xl font-extrabold text-yellow-400 drop-shadow-md">
                ${totalPrice}
            </span>
            </div>
            {/* BUTTON — NEON */}
            <button className="bg-yellow-400 text-black px-16 py-4 rounded-full text-xl font-bold 
              shadow-[0_0_25px_rgba(255,200,0,0.5)]
              hover:bg-yellow-300 hover:shadow-[0_0_35px_rgba(255,200,0,0.8)]
              transition-all">
              Thêm vào giỏ hàng
            </button>
          </div>

        </div>
      </div>

      {/* ANIMATION KEYFRAMES */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slideUp {
          animation: slideUp 1.2s ease forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
