import { useEffect } from "react";
import { useCart, isUserLoggedIn } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!isUserLoggedIn()) {
      if (window.confirm("Bạn cần đăng nhập để xem giỏ hàng. Bạn có muốn đăng nhập ngay?")) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  // Don't render if not logged in
  if (!isUserLoggedIn()) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-400 mb-8">Hãy thêm món ăn vào giỏ hàng của bạn</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full hover:bg-yellow-300 transition font-bold text-lg"
          >
            Xem Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">Giỏ hàng</h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 transition flex items-center gap-2"
          >
            <FaTrash />
            Xóa tất cả
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-500/30 transition"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    <p className="text-yellow-400 font-bold text-xl mb-4">
                      ${item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-400 hover:text-red-300 transition flex items-center gap-2"
                      >
                        <FaTrash />
                        Xóa
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-right text-lg">
                        Tổng:{" "}
                        <span className="text-yellow-400 font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-20">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Số lượng món:</span>
                  <span className="font-semibold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tạm tính:</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Chức năng thanh toán đang được phát triển!");
                }}
                className="w-full bg-yellow-400 text-black py-4 rounded-xl hover:bg-yellow-300 transition font-bold text-lg flex items-center justify-center gap-2"
              >
                <FaShoppingBag />
                Thanh toán
              </button>

              <button
                onClick={() => navigate("/menu")}
                className="w-full mt-4 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition font-semibold"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

