<?php
class Booking {
    private $conn;
    private $table = "bookings";

    public $id;
    public $user_id;
    public $name;
    public $phone;
    public $email;
    public $persons;
    public $date;
    public $note;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        // Nếu có user_id, thêm vào INSERT
        if (isset($this->user_id) && $this->user_id > 0) {
            $sql = "INSERT INTO " . $this->table . " 
                    (user_id, name, phone, email, persons, note, date, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING')";

            $stmt = $this->conn->prepare($sql);

            if (!$stmt) {
                return false;
            }

            // 7 tham số: i s s s i s s
            $stmt->bind_param(
                "isssiss",
                $this->user_id,
                $this->name,
                $this->phone,
                $this->email,
                $this->persons,
                $this->note,
                $this->date
            );
        } else {
            // Nếu không có user_id, INSERT như cũ (tương thích với dữ liệu cũ)
            $sql = "INSERT INTO " . $this->table . " 
                    (name, phone, email, persons, note, date, status)
                    VALUES (?, ?, ?, ?, ?, ?, 'PENDING')";

            $stmt = $this->conn->prepare($sql);

            if (!$stmt) {
                return false;
            }

            // 6 tham số: s s s i s s
            $stmt->bind_param(
                "sssiss",
                $this->name,
                $this->phone,
                $this->email,
                $this->persons,
                $this->note,
                $this->date
            );
        }

        return $stmt->execute();
    }

    // Lấy tất cả bookings
    public function getAll() {
        $sql = "SELECT * FROM " . $this->table . " ORDER BY date DESC, id DESC";
        $result = $this->conn->query($sql);
        
        $bookings = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bookings[] = $row;
            }
        }
        return $bookings;
    }

    // Cập nhật status
    public function updateStatus($id, $status) {
        $sql = "UPDATE " . $this->table . " SET status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("si", $status, $id);
        return $stmt->execute();
    }

    // Lấy bookings của một user (theo user_id hoặc email)
    public function getByUserId($user_id) {
        $sql = "SELECT * FROM " . $this->table . " 
                WHERE user_id = ? 
                ORDER BY date DESC, id DESC";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $bookings = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bookings[] = $row;
            }
        }
        
        return $bookings;
    }

    // Lấy bookings của user theo email (fallback nếu chưa có user_id)
    public function getByEmail($email) {
        $sql = "SELECT * FROM " . $this->table . " 
                WHERE email = ? 
                ORDER BY date DESC, id DESC";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $bookings = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $bookings[] = $row;
            }
        }
        
        return $bookings;
    }

    // Xóa booking
    public function delete($id) {
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>