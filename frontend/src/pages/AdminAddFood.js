import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminAddFood() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

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
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("image", image);

    fetch("http://localhost/feane/api/add_food.php", {
      method: "POST",
      body: data,
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setMessage(json.message);
          if (json.success) {
            setTimeout(() => {
              window.location.href = "/admin/foods";
            }, 1000);
          }
        } catch (err) {
          console.error("JSON ERROR:", text);
          setMessage("❌ Lỗi server!");
        }
      })
      .catch(() => setMessage("❌ Lỗi kết nối!"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0a0f1a] to-[#070b13] text-white">
      <AdminSidebar />

      <div className="ml-72 p-12">

        {/* TITLE */}
        <h1 className="text-5xl font-extrabold text-yellow-400 font-[Playfair_Display] drop-shadow-xl tracking-wide mb-10">
          Thêm món ăn mới ✨
        </h1>

        {/* GLASS CARD */}
        <div className="
          backdrop-blur-xl bg-white/5 
          p-10 rounded-3xl shadow-2xl 
          max-w-2xl mx-auto border border-yellow-500/30 
          hover:shadow-yellow-400/30 transition-all
        ">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* TÊN MÓN */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">
                Tên món
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên món..."
                className="
                  w-full p-4 rounded-xl 
                  bg-[#111827] text-white 
                  border border-gray-600 
                  outline-none
                  focus:border-yellow-400 
                  focus:ring-2 focus:ring-yellow-400
                  transition-all
                "
                onChange={handleChange}
                required
              />
            </div>

            {/* MÔ TẢ */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">
                Mô tả
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Nhập mô tả món ăn..."
                className="
                  w-full p-4 rounded-xl 
                  bg-[#111827] text-white 
                  border border-gray-600 
                  outline-none
                  focus:border-yellow-400 
                  focus:ring-2 focus:ring-yellow-400
                "
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* GIÁ */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">
                Giá
              </label>
              <input
                type="number"
                name="price"
                placeholder="Nhập giá..."
                className="
                  w-full p-4 rounded-xl 
                  bg-[#111827] text-white 
                  border border-gray-600 
                  outline-none
                  focus:border-yellow-400 
                  focus:ring-2 focus:ring-yellow-400
                "
                onChange={handleChange}
                required
              />
            </div>

            {/* LOẠI MÓN */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">
                Loại món
              </label>
              <select
                name="type"
                className="
                  w-full p-4 rounded-xl 
                  bg-[#111827] text-white 
                  border border-gray-600 
                  outline-none
                  focus:border-yellow-400 
                  focus:ring-2 focus:ring-yellow-400
                "
                onChange={handleChange}
                required
              >
                <option value="">Chọn loại</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Fries">Fries</option>
              </select>
            </div>

            {/* UPLOAD ẢNH */}
            <div>
              <label className="text-lg font-semibold text-yellow-300 mb-2 block">
                Ảnh món ăn
              </label>
              <input
                type="file"
                accept="image/*"
                className="text-yellow-300"
                onChange={handleImage}
                required
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="
                    w-44 h-44 rounded-xl object-cover mt-4 
                    shadow-xl border border-gray-500
                  "
                />
              )}
            </div>

            {/* BUTTON */}
            <button
              className="
                w-full bg-yellow-400 text-black 
                py-4 rounded-xl font-extrabold text-xl 
                hover:bg-yellow-300 shadow-xl
                transition-all tracking-wide
              "
            >
              Thêm món ✨
            </button>

            {message && (
              <p className="text-center text-red-400 font-semibold mt-3">
                {message}
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}
