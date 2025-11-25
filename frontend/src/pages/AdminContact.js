import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) window.location.href = "/admin/login";

    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    fetch("http://localhost/feane/api/contacts.php")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      return;
    }

    fetch("http://localhost/feane/api/contacts.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          fetchContacts();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Có lỗi xảy ra khi xóa liên hệ!");
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090d17] text-white">
      <AdminSidebar />

      <div className="ml-72 p-10">
        <h1 className="text-4xl font-bold text-yellow-400 font-[Playfair_Display]">
          Quản lý liên hệ
        </h1>

        <p className="mt-2 text-gray-300">
          Danh sách tất cả tin nhắn liên hệ từ khách hàng.
        </p>

        {/* TABLE */}
        <div className="mt-8 bg-[#1b2234] p-6 rounded-2xl border border-yellow-500/20 shadow-xl">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Đang tải...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Chưa có liên hệ nào.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-yellow-300 border-b border-white/10">
                    <th className="p-3">ID</th>
                    <th className="p-3">Tên</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Số điện thoại</th>
<th className="p-3">Chủ đề</th>
                    <th className="p-3">Tin nhắn</th>
                    <th className="p-3">Ngày gửi</th>
                    <th className="p-3">Hành động</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="p-3">{contact.id}</td>
                      <td className="p-3 font-medium">{contact.name}</td>
                      <td className="p-3 text-yellow-300">{contact.email}</td>
                      <td className="p-3">{contact.phone || "N/A"}</td>
                      <td className="p-3">{contact.subject || "Không có"}</td>
                      <td className="p-3 max-w-xs">
                        <div className="truncate" title={contact.message}>
                          {contact.message}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-400">
                        {formatDate(contact.created_at)}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}