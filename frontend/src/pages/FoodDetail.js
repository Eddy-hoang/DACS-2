import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart, isUserLoggedIn } from "../context/CartContext";
import { FaComment, FaUser, FaClock } from "react-icons/fa";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Giảm số lượng, tối thiểu = 1
const decrease = () => {
  if (quantity > 1) setQuantity(quantity - 1);
};

// Tăng số lượng
const increase = () => {
  setQuantity(quantity + 1);
};

// Xử lý gửi bình luận
const handleSubmitComment = (e) => {
  e.preventDefault();
  
  if (!isUserLoggedIn()) {
    if (window.confirm("Bạn cần đăng nhập để bình luận. Bạn có muốn đăng nhập ngay?")) {
      navigate("/login");
    }
    return;
  }

  if (!newComment.trim()) {
    alert("Vui lòng nhập nội dung bình luận!");
    return;
  }

  setSubmitting(true);

  fetch("http://localhost/feane/api/add_comment.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      food_id: parseInt(id),
      user_id: user.id,
      username: user.username,
      comment: newComment.trim(),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setComments([data.comment, ...comments]);
        setNewComment("");
        alert("Bình luận đã được thêm thành công!");
      } else {
        alert(data.message || "Không thể thêm bình luận!");
      }
      setSubmitting(false);
    })
    .catch((err) => {
      console.error("Error adding comment:", err);
      alert("Có lỗi xảy ra khi thêm bình luận!");
      setSubmitting(false);
    });
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  // Load user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Load food details
  useEffect(() => {
    fetch(`http://localhost/feane/api/get_food.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Load comments
  useEffect(() => {
    if (id) {
      setLoadingComments(true);
      fetch(`http://localhost/feane/api/get_comments.php?food_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setComments(data.comments);
          }
          setLoadingComments(false);
        })
        .catch((err) => {
          console.error("Error loading comments:", err);
          setLoadingComments(false);
        });
    }
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
            <button 
              onClick={() => {
                if (!isUserLoggedIn()) {
                  if (window.confirm("Bạn cần đăng nhập để thêm món vào giỏ hàng. Bạn có muốn đăng nhập ngay?")) {
                    navigate("/login");
                  }
                  return;
                }
                addToCart(food, quantity);
                setIsCartOpen(true);
              }}
              className="bg-yellow-400 text-black px-16 py-4 rounded-full text-xl font-bold 
              shadow-[0_0_25px_rgba(255,200,0,0.5)]
              hover:bg-yellow-300 hover:shadow-[0_0_35px_rgba(255,200,0,0.8)]
              transition-all">
              Thêm vào giỏ hàng
            </button>
          </div>

        </div>

        {/* PHẦN BÌNH LUẬN */}
        <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <FaComment className="text-yellow-400" size={24} />
            <h2 className="text-3xl font-bold text-yellow-400">
              Bình luận ({comments.length})
            </h2>
          </div>

          {/* Form bình luận - chỉ hiển thị nếu đã đăng nhập */}
          {isUserLoggedIn() ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="bg-white/5 rounded-xl p-4 border border-yellow-500/20">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none mb-4"
                  rows="4"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">
                    {newComment.length}/1000 ký tự
                  </span>
                  <button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Đang gửi..." : "Gửi bình luận"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-white/5 rounded-xl p-6 border border-yellow-500/20 mb-8 text-center">
              <p className="text-gray-400 mb-4">
                Bạn cần đăng nhập để bình luận
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                Đăng nhập ngay
              </button>
            </div>
          )}

          {/* Danh sách bình luận */}
          <div className="space-y-4">
            {loadingComments ? (
              <div className="text-center py-8 text-gray-400">
                Đang tải bình luận...
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-yellow-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-yellow-300">
                          {comment.username}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <FaClock size={12} />
                          <span>{formatDate(comment.created_at)}</span>
                        </div>
                      </div>
                      <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
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
