import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, isUserLoggedIn } from "../context/CartContext";

export default function Menu() {
  const navigate = useNavigate(); // Dùng để điều hướng trang khi click vào món ăn
  const { addToCart } = useCart();
  // STATE

  const [foods, setFoods] = useState([]); // foods: lưu toàn bộ danh sách món ăn (fetch từ PHP API)
  const [filter, setFilter] = useState("All"); // filter: dùng để lưu loại món đang được chọn (All / Burger / Pizza / ...)
  // FETCH DỮ LIỆU TỪ BACKEND (PHP API)
  useEffect(() => {
    fetch("http://localhost/feane/api/foods.php")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);
  // XỬ LÝ LỌC MÓN ĂN THEO LOẠI
  const filteredFoods =
    filter === "All" ? foods : foods.filter((f) => f.type === filter);
  // Danh sách các loại món để hiển thị nút filter
  const categories = ["All", "Burger", "Pizza", "Pasta", "Fries"];
  //JSX RETURN: GIAO DIỆN MENU
  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-[Dancing Script] text-[#222831] mb-6">
          Our Menu
        </h1>
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border border-gray-300 text-gray-700 transition-all ${
                filter === cat
                  ? "bg-yellow-400 text-white font-semibold"
                  : "hover:bg-yellow-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Menu grid */}
      {/* PHẦN DANH SÁCH MÓN ĂN */}
      <main className="px-6 md:px-20 pb-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => navigate(`/food/${food.id}`)} // Điều hướng đến trang chi tiết món ăn
              className="bg-gray-100 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer" // Thêm con trỏ chuột khi hover
            >
              {/* Hình ảnh món ăn */}
              <div className="bg-[#f8f8f8] flex justify-center items-center pt-6 pb-4 rounded-t-2xl">
                <img
                  src={`/images/${food.image}`}
                  alt={food.name}
                  className="w-[150px] h-[150px] object-contain rounded-full drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Thông tin + nút giỏ hàng */}
              <div className="bg-[#222831] text-white p-5 flex flex-col justify-between min-h-[180px]">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{food.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {food.description}
                  </p>
                </div>

                {/* Giá + nút mua */}
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 font-bold text-lg">
                    ${food.price}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isUserLoggedIn()) {
                        if (window.confirm("Bạn cần đăng nhập để thêm món vào giỏ hàng. Bạn có muốn đăng nhập ngay?")) {
                          navigate("/login");
                        }
                        return;
                      }
                      addToCart(food, 1);
                    }}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-10">
          <button className="bg-yellow-400 text-white font-semibold px-8 py-2 rounded-full hover:bg-yellow-500 transition">
            View More
          </button>
        </div>
      </main>
    </div>
  );
}
