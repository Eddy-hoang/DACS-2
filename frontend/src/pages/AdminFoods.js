import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminFoods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) window.location.href = "/admin/login";

    fetch("http://localhost/api/foods.php")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  // Xử lý xóa món ăn
  const handleDelete = (id) => {
  if (!window.confirm("Bạn có chắc muốn xóa món này không?")) return;

  fetch("http://localhost/api/delete_food.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);

      if (data.success) {
        // Xóa món ăn khỏi giao diện mà không cần load lại
        setFoods((prev) => prev.filter((item) => item.id !== id));
      }
    })
    .catch(() => alert("Lỗi khi xóa món."));
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090d17] text-white">

      <AdminSidebar />

      <div className="ml-72 p-10">
        
        <h1 className="text-4xl font-bold text-yellow-400 font-[Playfair_Display]">
          Quản lý món ăn
        </h1>

        <p className="mt-2 text-gray-300">
          Danh sách tất cả món ăn đang có trong hệ thống.
        </p>
        {/* Nút thêm món ăn mới */}
        <div className="flex justify-end">
          <button 
            onClick={() => window.location.href = "/admin/add-food"}
            className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 shadow-md"
          >
            + Thêm món
          </button>
        </div>


        {/* TABLE */}
        <div className="mt-8 bg-[#1b2234] p-6 rounded-2xl border border-yellow-500/20 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-yellow-300 border-b border-white/10">
                <th className="p-3">Ảnh</th>
                <th className="p-3">Tên món</th>
                <th className="p-3">Mô tả</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Loại</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {foods.map((item) => (
                <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">

                  <td className="p-3">
                    <img 
                      src={`/images/${item.image}`} 
                      className="w-14 h-14 rounded-lg object-cover"
                      alt={item.name}
                    />
                  </td>

                  <td className="p-3">{item.name}</td>
                  <td className="p-3 max-w-xs text-gray-300">{item.description}</td>
                  <td className="p-3 text-yellow-300">${item.price}</td>
                  <td className="p-3">{item.type}</td>

                  <td className="p-3">
                    <button
                      onClick={() => window.location.href = `/admin/edit-food/${item.id}`}
                      className="bg-yellow-400 text-black px-3 py-1 rounded-lg mr-2 hover:bg-yellow-300"
                    >
                      Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Xóa
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
