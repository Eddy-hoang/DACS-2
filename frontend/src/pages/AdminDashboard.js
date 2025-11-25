import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    foods: 0,
    bookings: 0,
    contacts: 0,
    revenue: 0,
  });

  // 🆕 State cho hoạt động gần đây
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) window.location.href = "/admin/login";

    // GỌI API LẤY THỐNG KÊ
    fetch("http://localhost/feane/api/dashboard_stats.php")
    .then((res) => res.json())
    .then((data) => setStats(data))
    .catch((err) => console.log(err));

    fetch("http://localhost/feane/api/recent_activity.php")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.log(err));

  }, []);

  const admin = JSON.parse(localStorage.getItem("admin")) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090d17] text-white">
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-72 p-10">
        <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide">
          Dashboard thống kê hệ thống
        </h1>

        <p className="mt-2 text-gray-300 text-lg">
          Chào mừng trở lại,{" "}
          <span className="text-yellow-300">{admin.name}</span> 👋
        </p>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {/* MÓN ĂN */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg">
            <h3 className="text-xl font-semibold">Tổng món ăn</h3>
            <p className="text-4xl font-bold mt-3">{stats.foods}</p>
          </div>

          {/* ĐẶT BÀN */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg">
            <h3 className="text-xl font-semibold">Đơn đặt bàn</h3>
            <p className="text-4xl font-bold mt-3">{stats.bookings}</p>
          </div>

          {/* LIÊN HỆ */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 shadow-lg">
            <h3 className="text-xl font-semibold">Tin nhắn</h3>
            <p className="text-4xl font-bold mt-3">{stats.contacts}</p>
          </div>

          {/* DOANH THU */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-red-500 to-red-400 shadow-lg">
            <h3 className="text-xl font-semibold">Doanh thu</h3>
            <p className="text-4xl font-bold mt-3">${stats.revenue}</p>
          </div>
        </div>

        {/* 🆕 RECENT ACTIVITY */}
        <div className="mt-12 bg-[#1b2234] p-6 rounded-2xl border border-yellow-500/20 shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-300 mb-4">
Hoạt động gần đây
          </h2>

          {activities.length === 0 ? (
            <p className="text-gray-400">Chưa có hoạt động nào.</p>
          ) : (
            <ul className="space-y-3">
              {activities.map((act, i) => (
                <li
                  key={i}
                  className="p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <p className="text-white">{act.message}</p>
                  <span className="text-gray-400 text-sm">{act.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}