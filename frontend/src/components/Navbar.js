// ========================= //
// 📌 IMPORT CÁC THƯ VIỆN
// ========================= //
import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa"; // Bộ icon
import { Link } from "react-router-dom"; // Điều hướng giữa các trang mà không reload

// ========================= //
// 📌 COMPONENT NAVBAR
// ========================= //
export default function Navbar() {

  // ========================= //
  // 📌 STATE ĐIỀU KHIỂN MENU
  // ========================= //

  // isOpen → trạng thái mở menu mobile hay chưa
  const [isOpen, setIsOpen] = useState(false);

  // active → mục menu nào đang được chọn (dùng để tô màu vàng)
  const [active, setActive] = useState("Home");

  const [user, setUser] = useState(null);

    // Lấy thông tin user từ localStorage khi component được mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);


  // Hàm đổi trạng thái menu mobile
  // const toggleMenu = () => setIsOpen(!isOpen);

  // ========================= //
  // 📌 DANH SÁCH MENU (Tên + Đường dẫn)
  // ========================= //
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Book Table", path: "/booking" }, // ← đường dẫn vào trang Booking
  ];

  // ========================= //
  // 📌 JSX TRẢ VỀ GIAO DIỆN NAVBAR
  // ========================= //
  return (
    <nav className="bg-gradient-to-r from-[#0c0c0c] to-[#2c2c2c] text-white shadow-md fixed top-0 left-0 w-full z-50">
      
      {/* ========================= */}
      {/* 📌 KHỐI CHÍNH NAVBAR */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* ========================= */}
        {/* 📌 CỘT 1: LOGO (BÊN TRÁI) */}
        {/* ========================= */}
        <div className="w-1/3 flex justify-start">
          <Link
            to="/"
            className="text-3xl font-[Dancing Script] text-white tracking-wider cursor-pointer"
            onClick={() => setActive("Home")} // Khi bấm logo → chuyển active về Home
          >
            Feane
          </Link>
        </div>

        {/* ========================= */}
        {/* 📌 CỘT 2: MENU (Ở GIỮA) */}
        {/* ========================= */}
        <div className="w-1/3 flex justify-center">
          <ul className="hidden md:flex gap-10 text-sm uppercase font-semibold">
            
            {/* Lặp qua từng mục menu */}
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}               // Điều hướng tới trang tương ứng
                  onClick={() => setActive(item.name)} // Cập nhật mục đang active
                  className={`transition-colors ${
                    active === item.name
                      ? "text-yellow-400 border-b-2 border-yellow-400 pb-1" // Nếu mục đang được chọn
                      : "text-white hover:text-yellow-400"                  // Nếu mục bình thường
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* ========================= */}
        {/* 📌 CỘT 3: ICON + NÚT ORDER (BÊN PHẢI) */}
        {/* ========================= */}
        <div className="w-1/3 flex justify-end items-center gap-6">
          <FaUser
            className="cursor-pointer text-lg hover:text-yellow-400 transition"
            onClick={() => {
              if (user) {
                window.location.href = "/profile"; // ĐÃ đăng nhập → qua trang hồ sơ
              } else {
                window.location.href = "/login";   // CHƯA đăng nhập → đi tới login
              }
            }}
          />



          <FaShoppingCart className="cursor-pointer text-lg hover:text-yellow-400 transition" />
          <FaSearch className="cursor-pointer text-lg hover:text-yellow-400 transition" />

          {/* Nút màu vàng */}
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-300 transition font-semibold">
            Order Online
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* 📌 MENU DÀNH CHO MOBILE (hiện khi bấm ☰) */}
      {/* ========================= */}
      {isOpen && (
        <div className="md:hidden bg-[#111] text-center py-4 space-y-3 border-t border-gray-700">

          {menuItems.map((item) => (
            <div key={item.name}>
              <Link
                to={item.path}
                className={`block py-1 ${
                  active === item.name ? "text-yellow-400" : "text-white"
                }`}
                onClick={() => {
                  setActive(item.name); // Gán active
                  setIsOpen(false);     // Tự đóng menu mobile
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}

          {/* 3 icon nằm ngang trong mobile */}
          <div className="flex justify-center gap-5 py-2">
            <FaUser />
            <FaShoppingCart />
            <FaSearch />
          </div>

          {/* Nút Order Online cho mobile */}
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-300 transition">
            Order Online
          </button>
        </div>
      )}
    </nav>
  );
}
