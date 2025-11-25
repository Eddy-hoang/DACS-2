import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Nếu chưa đăng nhập → đá về trang login
  if (!user) {
    navigate("/login");
    return null;
  }

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("cart"); // Xóa giỏ hàng khi đăng xuất
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d0f15] text-white p-8 pt-24">
      
      <div className="max-w-lg mx-auto bg-[#161b22] p-10 rounded-3xl shadow-xl border border-gray-700">

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-10">
          Hồ sơ của bạn
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.avatar ? `/images/${user.avatar}` : "/images/default.png"}
            alt="avatar"
            className="w-36 h-36 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />

          {/* Tên */}
          <h2 className="text-2xl font-semibold mt-3">{user.username}</h2>

          {/* Email */}
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* Nút đăng xuất */}
        <button
          onClick={handleLogout}
          className="
            w-full mt-10 bg-red-500 py-3 rounded-xl 
            text-lg font-semibold hover:bg-red-400 
            transition shadow-md
          "
        >
          Đăng xuất
        </button>

      </div>
    </div>
  );
}
