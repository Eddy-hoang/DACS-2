import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) window.location.href = "/admin/login";

    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    fetch("http://localhost/api/bookings.php")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleConfirm = (id) => {
    updateStatus(id, "CONFIRMED");
  };

  const handleReject = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn từ chối đơn đặt bàn này?")) {
      return;
    }
    updateStatus(id, "REJECTED");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn đặt bàn này?")) {
      return;
    }

    fetch("http://localhost/api/bookings.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          fetchBookings();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Có lỗi xảy ra khi xóa đơn đặt bàn!");
      });
  };

  const updateStatus = (id, status) => {
    fetch("http://localhost/api/bookings.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          fetchBookings();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Có lỗi xảy ra khi cập nhật trạng thái!");
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    
    if (statusUpper === "CONFIRMED") {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400 text-gray-900">
          CONFIRMED
        </span>
      );
    } else if (statusUpper === "REJECTED") {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
          REJECTED
        </span>
      );
    } else {
      return (
<span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white">
          PENDING
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0c1220] to-[#090d17] text-white">
      <AdminSidebar />

      <div className="ml-72 p-10">
        <div className="mb-4">
          <p className="text-sm text-gray-400">Admin Panel</p>
          <h1 className="text-4xl font-bold text-white mt-1">
            Bookings Management
          </h1>
        </div>

        {/* TABLE */}
        <div className="mt-8 bg-[#1b2234] p-6 rounded-2xl border border-yellow-500/20 shadow-xl">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Đang tải...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">Chưa có đơn đặt bàn nào.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2a3441] text-white">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Date & Time</th>
                    <th className="p-4 font-semibold">Guests</th>
                    <th className="p-4 font-semibold">Note</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="p-4 font-medium">{booking.name}</td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-yellow-300">{booking.email}</span>
                          <span className="text-sm text-gray-400">{booking.phone}</span>
                        </div>
                      </td>
                      <td className="p-4">{formatDate(booking.date)}</td>
                      <td className="p-4">{booking.persons || booking.guests || "-"}</td>
                      <td className="p-4 max-w-xs">
                        <div className="truncate" title={booking.note || "Không có"}>
                          {booking.note || "Không có"}
                        </div>
                      </td>
                      <td className="p-4">{getStatusBadge(booking.status)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
{booking.status?.toUpperCase() !== "CONFIRMED" && (
                            <button
                              onClick={() => handleConfirm(booking.id)}
                              className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                              title="Xác nhận"
                            >
                              ✓
                            </button>
                          )}
                          {booking.status?.toUpperCase() !== "REJECTED" && booking.status?.toUpperCase() !== "CONFIRMED" && (
                            <button
                              onClick={() => handleReject(booking.id)}
                              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                              title="Từ chối"
                            >
                              ✕
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                            title="Xóa"
                          >
                            🗑
                          </button>
                        </div>
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