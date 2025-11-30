<?php
include_once "../models/Contact.php";

class ContactController {

    // Tạo liên hệ mới
    public function createContact($conn, $data) {
        if (!$data || empty($data["name"]) || empty($data["email"]) || empty($data["message"])) {
            return [
                "success" => false,
                "message" => "❌ Thiếu dữ liệu bắt buộc!"
            ];
        }

        $contact = new Contact($conn);

        // Thêm user_id nếu có
        if (isset($data["user_id"]) && $data["user_id"] > 0) {
            $contact->user_id = intval($data["user_id"]);
        } else {
            $contact->user_id = null;
        }

        $contact->name = $data["name"];
        $contact->email = $data["email"];
        $contact->phone = $data["phone"] ?? "";
        $contact->subject = $data["subject"] ?? "";
        $contact->message = $data["message"];

        if ($contact->create()) {
            return [
                "success" => true,
                "message" => "✔️ Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất có thể."
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Lỗi khi gửi liên hệ!"
        ];
    }

    // Lấy tất cả liên hệ
    public function getAllContacts($conn) {
        $contact = new Contact($conn);
        $contacts = $contact->getAll();
        
        return $contacts;
    }

    // Xóa liên hệ
    public function deleteContact($conn, $id) {
        $contact = new Contact($conn);
        
        if ($contact->delete($id)) {
            return [
                "success" => true,
                "message" => "✔️ Xóa liên hệ thành công!"
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Lỗi khi xóa liên hệ!"
        ];
    }

    // Đánh dấu đã đọc/chưa đọc
    public function updateReadStatus($conn, $id, $isRead) {
        $contact = new Contact($conn);
        
        if ($contact->updateReadStatus($id, $isRead)) {
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
}
?>
