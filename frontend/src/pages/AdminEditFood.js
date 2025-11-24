import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminEditFood() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    oldImage: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Lấy thông tin món ăn hiện tại
  useEffect(() => {
    fetch(`http://localhost/api/get_food.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          type: data.type,
          oldImage: data.image,
        });
        setPreview(`/images/${data.image}`);
      })
      .catch(() => setMessage("Không thể tải dữ liệu món ăn!"));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("oldImage", formData.oldImage);

    if (image) {
      data.append("image", image);
    }

    fetch("http://localhost/api/update_food.php", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);

        if (data.success) {
          setTimeout(() => {
            window.location.href = "/admin/foods";
          }, 1000);
        }
      })
      .catch(() => setMessage("Lỗi server khi cập nhật món!"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0a0f1a] to-[#070b13] text-white">
      <AdminSidebar />

      <div className="ml-72 p-12">
      <h1 className="text-5xl font-semibold text-yellow-400 font-[Playfair_Display] tracking-wide drop-shadow-lg mb-10">
        Sửa món ăn ✨
      </h1>


        <div className="
          backdrop-blur-xl bg-white/5 p-10 rounded-3xl shadow-2xl
          border border-yellow-500/30 max-w-2xl mx-auto
          hover:shadow-yellow-400/30 transition-all
        ">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Tên món */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">Tên món</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="
                  w-full p-4 rounded-xl bg-[#111827] text-white
                  border border-gray-600 focus:ring-2 focus:ring-yellow-400
                "
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">Mô tả</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="
                  w-full p-4 rounded-xl bg-[#111827] text-white
                  border border-gray-600 focus:ring-2 focus:ring-yellow-400
                "
              ></textarea>
            </div>

            {/* Giá */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">Giá</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="
                  w-full p-4 rounded-xl bg-[#111827] text-white
                  border border-gray-600 focus:ring-2 focus:ring-yellow-400
                "
              />
            </div>

            {/* Loại */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">Loại món</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="
                  w-full p-4 rounded-xl bg-[#111827] text-white
                  border border-gray-600 focus:ring-2 focus:ring-yellow-400
                "
              >
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Fries">Fries</option>
              </select>
            </div>

            {/* Ảnh */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">Ảnh món ăn</label>
              <input type="file" accept="image/*" className="text-yellow-300" onChange={handleImage} />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-44 h-44 rounded-xl object-cover mt-4 shadow-xl border border-gray-500"
                />
              )}
            </div>

            {/* BUTTON */}
            <button className="
              w-full bg-yellow-400 text-black py-4 rounded-xl font-semibold text-lg
              hover:bg-yellow-300 transition-all shadow-xl tracking-wide
            ">

              Lưu thay đổi ✨
            </button>

            {message && (
              <p className="text-center text-red-400 font-semibold mt-3">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
