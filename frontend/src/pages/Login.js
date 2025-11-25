import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/feane/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);

        if (data.success) {
          // Lưu thông tin user đầy đủ dưới dạng JSON
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");

          setTimeout(() => {
            navigate("/");
          }, 700);
        }
      })
      .catch(() => setMessage("❌ Lỗi server!"));
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex justify-center items-center px-6">
      <div className="bg-[#111827] p-10 rounded-2xl shadow-xl max-w-md w-full border border-yellow-600/20">

        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Đăng nhập
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div>
            <label className="text-yellow-300 mb-2 block">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-[#1f2937] text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-yellow-300 mb-2 block">Mật khẩu</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-[#1f2937] text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full py-3 bg-yellow-400 text-black rounded-lg font-bold text-lg hover:bg-yellow-300 transition"
          >
            Đăng nhập
          </button>

          {message && (
            <p className="text-center text-red-400 font-semibold">{message}</p>
          )}

          <p className="text-gray-400 text-center mt-4">
            Bạn chưa có tài khoản?{" "}
            <span
              className="text-yellow-400 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Đăng ký ngay
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
