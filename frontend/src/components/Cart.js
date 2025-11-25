import { useCart, isUserLoggedIn } from "../context/CartContext";
import { FaTimes, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!isUserLoggedIn()) {
      setIsCartOpen(false);
      if (window.confirm("Bạn cần đăng nhập để thanh toán. Bạn có muốn đăng nhập ngay?")) {
        navigate("/login");
      }
      return;
    }
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1e293b] border-b border-yellow-500/20 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-yellow-400">Giỏ hàng</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-white transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-400 text-lg">Giỏ hàng trống</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/menu");
                }}
                className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-300 transition"
              >
                Xem Menu
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-500/30 transition"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <img
                      src={`/images/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-yellow-400 font-bold mb-2">
                        ${item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                          <FaPlus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-400 hover:text-red-300 transition"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-[#1e293b] border-t border-yellow-500/20 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-yellow-400">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-red-500/20 text-red-400 py-3 rounded-xl hover:bg-red-500/30 transition font-semibold"
              >
                Xóa tất cả
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-yellow-400 text-black py-3 rounded-xl hover:bg-yellow-300 transition font-bold"
              >
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

