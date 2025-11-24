<?php
class FoodsModel {
    private $conn;
    private $table = "foods";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllFoods() {
        $sql = "SELECT * FROM " . $this->table;
        $result = $this->conn->query($sql);

        $foods = [];

        while ($row = $result->fetch_assoc()) {
            $foods[] = $row;
        }

        return $foods;
    }

    // ------------------------
    // DELETE FOOD BY ID
    // ------------------------
    public function deleteFood($id) {
        $sql = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);

        return $stmt->execute();
    }
    // ------------------------
    // CREATE NEW FOOD
    // ------------------------
    public function createFood($name, $desc, $image, $price, $type) {

        $sql = "INSERT INTO " . $this->table . " 
                (name, description, image, price, type)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param("sssds", 
            $name,
            $desc,
            $image,
            $price,
            $type
        );

        return $stmt->execute();
    }
    // ------------------------
    // GET FOOD BY ID
    // ------------------------
    public function getFoodById($id) {
        $sql = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }
    // ------------------------
    // UPDATE FOOD
    // ------------------------
    public function updateFood($id, $name, $desc, $image, $price, $type) {

        $sql = "UPDATE " . $this->table . " 
                SET name = ?, description = ?, image = ?, price = ?, type = ?
                WHERE id = ?";

        $stmt = $this->conn->prepare($sql);

        $stmt->bind_param("sssdsi",
            $name,
            $desc,
            $image,
            $price,
            $type,
            $id
        );

        return $stmt->execute();
    }




}

