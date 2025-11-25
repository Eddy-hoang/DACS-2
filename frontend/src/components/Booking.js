import { useState } from "react";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    note: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/feane/api/book_table.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("❌ Có lỗi xảy ra, vui lòng thử lại!"));
  };

  return (
    <section
      id="book-table"
      className="py-20 bg-gradient-to-br from-[#111827] via-[#111827] to-[#1f2937] text-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ⭐ TIÊU ĐỀ — TÁCH RA NGOÀI GRID */}
        <div className="mb-12 text-center md:text-left">
          <p className="uppercase tracking-[0.3em] text-xs text-yellow-400 mb-2">
            Reservation
          </p>
          <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-semibold">
            Book A Table
          </h2>
          <p className="mt-3 text-gray-300 text-sm md:text-base max-w-xl">
            Đặt bàn trước để chúng tôi chuẩn bị không gian hoàn hảo cho bạn.
          </p>
        </div>

        {/* ⭐ GRID GIỮA — CHỈ FORM + MAP */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* FORM */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-7 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/15 p-3 rounded-lg 
                             focus:outline-none focus:border-yellow-400 text-sm
                             placeholder:text-gray-400"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/15 p-3 rounded-lg 
                             focus:outline-none focus:border-yellow-400 text-sm
                             placeholder:text-gray-400"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/15 p-3 rounded-lg 
                           focus:outline-none focus:border-yellow-400 text-sm
                           placeholder:text-gray-400"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="guests"
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1f2937] border border-white/20 p-3 rounded-lg 
                            focus:outline-none focus:border-yellow-400 text-sm
                            text-white"
                >

                  <option value="">How many persons?</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>

                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/15 p-3 rounded-lg 
                             focus:outline-none focus:border-yellow-400 text-sm
                             text-gray-200"
                />
              </div>

              <textarea
                name="note"
                rows="3"
                placeholder="Note (ví dụ: Không cay, sinh nhật, cần view cửa sổ...)"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 p-3 rounded-lg 
                           focus:outline-none focus:border-yellow-400 text-sm
                           placeholder:text-gray-400 text-gray-100 resize-none"
              />

              <button
                className="w-full bg-yellow-400 text-black px-10 py-3 rounded-full font-semibold 
                           hover:bg-yellow-300 transition-transform duration-300
                           shadow-lg hover:shadow-xl hover:-translate-y-[2px]"
              >
                BOOK NOW
              </button>

              {message && (
                <p className="mt-4 text-sm text-yellow-300">
                  {message}
                </p>
              )}
            </form>
          </div>

          {/* MAP */}
          <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              title="restaurant-location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.444984064962!2d106.70042387582242!3d10.776889959232624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3ef29f89c9%3A0xe2a5a2a7f3de5f8!2zTmjDoCBow6BuZyBOZ3V54buFbiDEkOG7qWMgVGjhu6d0IFZp4buHdA!5e0!3m2!1svi!2s!4v1730670000000!5m2!1svi!2s"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
