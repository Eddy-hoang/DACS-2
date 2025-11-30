<?php
class Cart {
    private $conn;
    private $table = "carts";

    public $id;
    public $user_id;
    public $food_id;
    public $quantity;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // =========================
    // LẤY GIỎ HÀNG CỦA USER
    // =========================
    public function getCartByUserId($user_id) {
        $sql = "SELECT c.*, f.name, f.price, f.image, f.description, f.type 
                FROM " . $this->table . " c
                INNER JOIN foods f ON c.food_id = f.id
                WHERE c.user_id = ?
                ORDER BY c.created_at DESC";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return [];
        }
        
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $cartItems = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $cartItems[] = $row;
            }
        }
        
        return $cartItems;
    }

    // =========================
    // THÊM SẢN PHẨM VÀO GIỎ
    // =========================
    public function addItem($user_id, $food_id, $quantity = 1) {
        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        $existingItem = $this->getItem($user_id, $food_id);
        
        if ($existingItem) {
            // Nếu đã có, cập nhật số lượng
            $newQuantity = $existingItem['quantity'] + $quantity;
            return $this->updateQuantity($user_id, $food_id, $newQuantity);
        } else {
            // Nếu chưa có, thêm mới
            $sql = "INSERT INTO " . $this->table . " (user_id, food_id, quantity) 
                    VALUES (?, ?, ?)";
            
            $stmt = $this->conn->prepare($sql);
            
            if (!$stmt) {
                return false;
            }
            
            $stmt->bind_param("iii", $user_id, $food_id, $quantity);
            
            if ($stmt->execute()) {
                $this->id = $this->conn->insert_id;
                return true;
            }
            
            return false;
        }
    }

    // =========================
    // LẤY MỘT SẢN PHẨM TRONG GIỎ
    // =========================
    public function getItem($user_id, $food_id) {
        $sql = "SELECT * FROM " . $this->table . " 
                WHERE user_id = ? AND food_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return null;
        }
        
        $stmt->bind_param("ii", $user_id, $food_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }
        
        return null;
    }

    // =========================
    // CẬP NHẬT SỐ LƯỢNG
    // =========================
    public function updateQuantity($user_id, $food_id, $quantity) {
        if ($quantity <= 0) {
            // Nếu số lượng <= 0, xóa sản phẩm
            return $this->removeItem($user_id, $food_id);
        }
        
        $sql = "UPDATE " . $this->table . " 
                SET quantity = ?, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ? AND food_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("iii", $quantity, $user_id, $food_id);
        return $stmt->execute();
    }

    // =========================
    // XÓA SẢN PHẨM KHỎI GIỎ
    // =========================
    public function removeItem($user_id, $food_id) {
        $sql = "DELETE FROM " . $this->table . " 
                WHERE user_id = ? AND food_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("ii", $user_id, $food_id);
        return $stmt->execute();
    }

    // =========================
    // XÓA TOÀN BỘ GIỎ HÀNG
    // =========================
    public function clearCart($user_id) {
        $sql = "DELETE FROM " . $this->table . " WHERE user_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return false;
        }
        
        $stmt->bind_param("i", $user_id);
        return $stmt->execute();
    }

    // =========================
    // ĐẾM SỐ LƯỢNG SẢN PHẨM TRONG GIỎ
    // =========================
    public function getTotalItems($user_id) {
        $sql = "SELECT SUM(quantity) AS total FROM " . $this->table . " WHERE user_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return 0;
        }
        
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result) {
            $row = $result->fetch_assoc();
            return intval($row['total'] ?? 0);
        }
        
        return 0;
    }

    // =========================
    // TÍNH TỔNG TIỀN
    // =========================
    public function getTotalPrice($user_id) {
        $sql = "SELECT SUM(c.quantity * f.price) AS total 
                FROM " . $this->table . " c
                INNER JOIN foods f ON c.food_id = f.id
                WHERE c.user_id = ?";
        
        $stmt = $this->conn->prepare($sql);
        
        if (!$stmt) {
            return 0;
        }
        
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result) {
            $row = $result->fetch_assoc();
            return floatval($row['total'] ?? 0);
        }
        
        return 0;
    }
}
?>

