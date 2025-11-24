import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/api/admin_login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setMsg(data.message);
        } else {
          // Lưu thông tin admin
          localStorage.setItem("admin", JSON.stringify(data.admin));
          localStorage.setItem("isAdminLoggedIn", "true");

          // Chuyển đến Dashboard
          window.location.href = "/admin/dashboard";
        }
      })
      .catch(() => setMsg("Lỗi kết nối server!"));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#111827] text-white px-4">
      <div className="bg-white/10 p-10 rounded-2xl shadow-xl w-full max-w-sm backdrop-blur-md border border-white/20">

        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 
                       focus:outline-none focus:border-yellow-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/5 border border-white/20 
                       focus:outline-none focus:border-yellow-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold 
                       hover:bg-yellow-300 transition-transform hover:-translate-y-[2px]"
          >
            LOGIN
          </button>
        </form>

        {msg && (
          <p className="text-red-400 mt-4 text-center">{msg}</p>
        )}
      </div>
    </div>
  );
}
