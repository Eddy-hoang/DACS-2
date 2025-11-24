import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { name: "Quản lý món ăn", icon: "🍽️", path: "/admin/foods" },
    { name: "Quản lý đặt bàn", icon: "📅", path: "/admin/bookings" },
    { name: "Quản lý liên hệ", icon: "💬", path: "/admin/contacts" },
  ];

  return (
    <div className="
      w-72 h-screen fixed left-0 top-0 
      bg-gradient-to-b from-[#0f172a] via-[#0c1220] to-[#090d17]
      text-white border-r border-yellow-500/10 shadow-xl
    ">
      
      {/* HEADER ADMIN */}
      <div className="p-6 flex items-center gap-4 border-b border-yellow-500/10">
        <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold shadow-xl">
          A
        </div>
        <div>
          <h3 className="text-xl font-[Playfair_Display]">Admin Panel</h3>
          <p className="text-xs text-gray-400">Trang quản lý Feane</p>
        </div>
      </div>

      {/* MENU */}
      <div className="mt-6 px-4 flex flex-col gap-2">
        {menu.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                transition-all duration-300 font-medium
                ${active 
                  ? "bg-yellow-400 text-black shadow-lg scale-[1.02]" 
                  : "hover:bg-yellow-400/20"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            localStorage.removeItem("isAdminLoggedIn");
            window.location.href = "/admin/login";
          }}
          className="
            text-red-300 hover:text-red-400 hover:bg-red-500/10
            transition-all duration-200 mt-4 px-4 py-3 rounded-xl text-left
          "
        >
          🚪 Đăng xuất
        </button>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-4 w-full text-center text-xs text-gray-500">
        © 2025 Feane Admin
      </div>
    </div>
  );
}
