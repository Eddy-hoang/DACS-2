<?php
include_once "../models/Booking.php";

class BookingController {

    public function createBooking($conn, $data) {

        if (!$data || empty($data["name"]) || empty($data["phone"]) 
            || empty($data["email"]) || empty($data["date"])) {

            return [
                "success" => false,
                "message" => "❌ Thiếu dữ liệu!"
            ];
        }

        $booking = new Booking($conn);

        // Thêm user_id nếu có
        if (isset($data["user_id"]) && $data["user_id"] > 0) {
            $booking->user_id = intval($data["user_id"]);
        }
        
        $booking->name    = $data["name"];
        $booking->phone   = $data["phone"];
        $booking->email   = $data["email"];
        $booking->persons = intval($data["guests"]);
        $booking->note    = $data["note"];
        $booking->date    = $data["date"];

        if ($booking->create()) {
            return [
                "success" => true,
                "message" => "✔️ Đặt bàn thành công!"
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Lỗi SQL khi thêm dữ liệu!"
        ];
    }

    // Lấy tất cả bookings
    public function getAllBookings($conn) {
        $booking = new Booking($conn);
        $bookings = $booking->getAll();
        
        return $bookings;
    }

    // Cập nhật status
    public function updateStatus($conn, $id, $status) {
        $booking = new Booking($conn);
        
        if ($booking->updateStatus($id, $status)) {
            return [
                "success" => true,
                "message" => "✔️ Cập nhật trạng thái thành công!"
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Lỗi khi cập nhật trạng thái!"
        ];
    }

    // Xóa booking
    public function deleteBooking($conn, $id) {
        $booking = new Booking($conn);
        
        if ($booking->delete($id)) {
            return [
                "success" => true,
                "message" => "✔️ Xóa đơn đặt bàn thành công!"
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Lỗi khi xóa đơn đặt bàn!"
        ];
    }

    // Lấy bookings của user
    public function getUserBookings($conn, $user_id, $email = null) {
        $booking = new Booking($conn);
        
        // Ưu tiên lấy theo user_id
        if ($user_id && $user_id > 0) {
            $bookings = $booking->getByUserId($user_id);
        } else if ($email) {
            // Fallback: lấy theo email nếu chưa có user_id
            $bookings = $booking->getByEmail($email);
        } else {
            $bookings = [];
        }
        
        return $bookings;
    }
}
?>