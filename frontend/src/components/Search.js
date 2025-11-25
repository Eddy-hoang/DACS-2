import { useState, useEffect } from "react";
import { useCart, isUserLoggedIn } from "../context/CartContext";
import { FaTimes, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    addToCart,
  } = useCart();
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const navigate = useNavigate();

  // Fetch foods
  useEffect(() => {
    fetch("http://localhost/feane/api/foods.php")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Filter foods based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  }, [searchQuery, foods]);

  const handleFoodClick = (foodId) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/food/${foodId}`);
  };

  const handleAddToCart = (e, food) => {
    e.stopPropagation();
    if (!isUserLoggedIn()) {
      if (window.confirm("Bạn cần đăng nhập để thêm món vào giỏ hàng. Bạn có muốn đăng nhập ngay?")) {
        setIsSearchOpen(false);
        navigate("/login");
      }
      return;
    }
    addToCart(food, 1);
  };

  if (!isSearchOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        onClick={() => {
          setIsSearchOpen(false);
          setSearchQuery("");
        }}
      ></div>

      {/* Search Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl shadow-2xl border border-yellow-500/20 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-yellow-500/20 flex items-center gap-4">
            <FaSearch className="text-yellow-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="text-gray-400 hover:text-white transition"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-4">
            {filteredFoods.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                {searchQuery.trim() ? (
                  <p>Không tìm thấy món ăn nào</p>
                ) : (
                  <p>Nhập từ khóa để tìm kiếm...</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => handleFoodClick(food.id)}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-yellow-500/30 transition cursor-pointer group"
                  >
                    <div className="flex gap-4">
                      <img
                        src={`/images/${food.image}`}
                        alt={food.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-yellow-400 transition">
                          {food.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {food.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-bold">
                            ${food.price}
                          </span>
                          <button
                            onClick={(e) => handleAddToCart(e, food)}
                            className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-300 transition text-sm font-semibold"
                          >
                            Thêm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

