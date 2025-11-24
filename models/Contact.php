<?php
class Contact {
    private $conn;
    private $table = "contacts";

    public $id;
    public $name;
    public $email;
    public $phone;
    public $subject;
    public $message;
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
        $sql = "INSERT INTO " . $this->table . " 
                (name, email, phone, subject, message)
                VALUES (?, ?, ?, ?, ?)";

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
}
?>