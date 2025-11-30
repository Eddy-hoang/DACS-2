<?php
class Contact {
    private $conn;
    private $table = "contacts";

    public $id;
    public $user_id;
    public $name;
    public $email;
    public $phone;
    public $subject;
    public $message;
    public $is_read;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Lấy tất cả liên hệ
    public function getAll() {
        $sql = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $result = $this->conn->query($sql);
        
        $contacts = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $contacts[] = $row;
            }
        }
        return $contacts;
    }

    // Tạo liên hệ mới
    public function create() {
        // Nếu có user_id, thêm vào INSERT
        if (isset($this->user_id) && $this->user_id > 0) {
            $sql = "INSERT INTO " . $this->table . " 
                    (user_id, name, email, phone, subject, message, is_read)
                    VALUES (?, ?, ?, ?, ?, ?, 0)";

            $stmt = $this->conn->prepare($sql);

            if (!$stmt) {
                return false;
            }

            $stmt->bind_param(
                "isssss",
                $this->user_id,
                $this->name,
                $this->email,
                $this->phone,
                $this->subject,
                $this->message
            );
        } else {
            // Nếu không có user_id, INSERT như cũ
            $sql = "INSERT INTO " . $this->table . " 
                    (name, email, phone, subject, message, is_read)
                    VALUES (?, ?, ?, ?, ?, 0)";

            $stmt = $this->conn->prepare($sql);

            if (!$stmt) {
                return false;
            }

            $stmt->bind_param(
                "sssss",
                $this->name,
                $this->email,
                $this->phone,
                $this->subject,
                $this->message
            );
        }

        return $stmt->execute();
    }

    // Xóa liên hệ
    public function delete($id) {
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    // Đếm tổng số liên hệ
    public function count() {
        $sql = "SELECT COUNT(*) AS total FROM " . $this->table;
        $result = $this->conn->query($sql);
        
        if ($result) {
            $row = $result->fetch_assoc();
            return $row['total'];
        }
        
        return 0;
    }

    // Đánh dấu đã đọc/chưa đọc
    public function markAsRead($id, $is_read = 1) {
        $sql = "UPDATE " . $this->table . " SET is_read = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("ii", $is_read, $id);
        return $stmt->execute();
    }

    // Cập nhật trạng thái đọc (alias)
    public function updateReadStatus($id, $isRead) {
        return $this->markAsRead($id, $isRead ? 1 : 0);
    }

    // Đếm số liên hệ chưa đọc
    public function countUnread() {
        $sql = "SELECT COUNT(*) AS total FROM " . $this->table . " WHERE is_read = 0";
        $result = $this->conn->query($sql);
        
        if ($result) {
            $row = $result->fetch_assoc();
            return $row['total'];
        }
        
        return 0;
    }
}
?>