<?php
class Comment {
    private $conn;
    private $table = "comments";

    public $id;
    public $food_id;
    public $user_id;
    public $username;
    public $comment;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Lấy tất cả bình luận của một món ăn
    public function getByFoodId($food_id) {
        $sql = "SELECT * FROM " . $this->table . " 
                WHERE food_id = ? 
                ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("i", $food_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $comments = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }
        }
        
        return $comments;
    }

    // Thêm bình luận mới
    public function create() {
        $sql = "INSERT INTO " . $this->table . " 
                (food_id, user_id, username, comment) 
                VALUES (?, ?, ?, ?)";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param(
            "iiss",
            $this->food_id,
            $this->user_id,
            $this->username,
            $this->comment
        );
        
        if ($stmt->execute()) {
            $this->id = $this->conn->insert_id;
            return true;
        }
        
        return false;
    }

    // Xóa bình luận (chỉ user hoặc admin mới được xóa)
    public function delete($id, $user_id = null) {
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";
        
        // Nếu có user_id, chỉ cho phép xóa bình luận của chính user đó
        if ($user_id !== null) {
            $sql .= " AND user_id = ?";
        }
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        if ($user_id !== null) {
            $stmt->bind_param("ii", $id, $user_id);
        } else {
            $stmt->bind_param("i", $id);
        }
        
        return $stmt->execute();
    }

    // Đếm số bình luận của một món ăn
    public function countByFoodId($food_id) {
        $sql = "SELECT COUNT(*) AS total FROM " . $this->table . " WHERE food_id = ?";
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return 0;
        }
        
        $stmt->bind_param("i", $food_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result) {
            $row = $result->fetch_assoc();
            return $row['total'];
        }
        
        return 0;
    }
}
?>

