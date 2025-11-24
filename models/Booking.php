<?php
class Booking {
    private $conn;
    private $table = "bookings";

    public $id;
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
        $sql = "INSERT INTO " . $this->table . " 
                (name, phone, email, persons, note, date, status)
                VALUES (?, ?, ?, ?, ?, ?, 'PENDING')";

        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            return false;
        }

        // 👉 6 tham số: s s s i s s
        $stmt->bind_param(
            "sssiss",
            $this->name,
            $this->phone,
            $this->email,
            $this->persons,
            $this->note,
            $this->date
        );

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