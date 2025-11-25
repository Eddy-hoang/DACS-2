import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", form.username);
    data.append("email", form.email);
    data.append("password", form.password);

    fetch("http://localhost/feane/api/register.php", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);

        if (data.success) {
          setTimeout(() => navigate("/login"), 1000);
        }
      })
      .catch(() => setMessage("Lỗi server!"));
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex items-center justify-center">
      <div className="bg-white/5 p-10 rounded-3xl border border-yellow-500/20 shadow-xl w-[380px] backdrop-blur-xl">
        
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Đăng ký tài khoản ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Tên người dùng"
            className="w-full p-3 rounded-xl bg-[#111827] outline-none border border-gray-700 
                       focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-[#111827] outline-none border border-gray-700 
                       focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="w-full p-3 rounded-xl bg-[#111827] outline-none border border-gray-700 
                       focus:ring-2 focus:ring-yellow-400"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-yellow-400 text-black py-3 mt-2 rounded-xl
                             font-bold hover:bg-yellow-300 transition-all">
            Đăng ký
          </button>

          {message && (
            <p className="text-center text-yellow-300 mt-3">{message}</p>
          )}
        </form>

        <p className="text-center mt-4 text-gray-300 text-sm">
          Đã có tài khoản?{" "}
          <span
            className="text-yellow-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
