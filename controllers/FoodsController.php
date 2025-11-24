<?php
include_once "../config/database.php";
include_once "../models/FoodsModel.php";

class FoodsController {

    // GET all foods
    public function index() {
        $database = new Database();
        $db = $database->connect();
        $foodModel = new FoodsModel($db);
        $foods = $foodModel->getAllFoods();

        echo json_encode($foods);
    }

    // ---------------------------------------
    // DELETE FOOD theo ID
    // ---------------------------------------
    public function delete($id) {

        if (!$id) {
            echo json_encode([
                "success" => false,
                "message" => "Thiếu ID!"
            ]);
            return;
        }

        $database = new Database();
        $db = $database->connect();
        $foodModel = new FoodsModel($db);

        $result = $foodModel->deleteFood($id);

        if ($result) {
            echo json_encode([
                "success" => true,
                "message" => "Xóa món ăn thành công!"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Không thể xóa món ăn!"
            ]);
        }
    }
   // ---------------------------------------
    // CREATE NEW FOOD
    // ---------------------------------------
    public function createFood() {

        // 1. Kiểm tra dữ liệu gửi lên
        if (
            empty($_POST['name']) ||
            empty($_POST['description']) ||
            empty($_POST['price']) ||
            empty($_POST['type']) ||
            !isset($_FILES['image']) ||
            $_FILES['image']['error'] !== UPLOAD_ERR_OK
        ) {
            echo json_encode([
                "success" => false,
                "message" => "Thiếu dữ liệu hoặc file upload lỗi!"
            ]);
            return;
        }

        // 2. Xử lý upload ảnh vào folder trung gian /uploads
        $originalName = basename($_FILES['image']['name']);
        $imageName = time() . "_" . $originalName; // tránh trùng tên

        // Đường dẫn tính từ file api/add_food.php
        $uploadDir   = "../uploads/";
        $publicDir   = "../frontend/public/images/";

        // Tạo thư mục nếu chưa có
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        if (!is_dir($publicDir)) {
            mkdir($publicDir, 0777, true);
        }

        $uploadPath  = $uploadDir . $imageName;
        $publicPath  = $publicDir . $imageName;

        // Move file vào uploads
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
            echo json_encode([
                "success" => false,
                "message" => "Không thể upload ảnh lên server!"
            ]);
            return;
        }

        // Copy sang frontend/public/images cho React dùng
        if (!copy($uploadPath, $publicPath)) {
            echo json_encode([
                "success" => false,
                "message" => "Upload xong nhưng không copy được sang frontend/public/images!"
            ]);
            return;
        }

        // 3. Lấy dữ liệu từ form
        $name  = $_POST['name'];
        $desc  = $_POST['description'];
        $price = $_POST['price'];
        $type  = $_POST['type'];

        // 4. Gọi model để lưu DB
        $database  = new Database();
        $db        = $database->connect();
        $foodModel = new FoodsModel($db);

        $result = $foodModel->createFood($name, $desc, $imageName, $price, $type);

        echo json_encode([
            "success" => $result,
            "message" => $result ? "Thêm món thành công!" : "Không thể thêm món!"
        ]);
    }
    // ---------------------------------------
    // UPDATE FOOD
    // ---------------------------------------
    public function updateFood() {

        // Kiểm tra ID
        if (empty($_POST['id'])) {
            echo json_encode([
                "success" => false,
                "message" => "Thiếu ID món ăn!"
            ]);
            return;
        }

        $id = $_POST['id'];
        $name = $_POST['name'];
        $desc = $_POST['description'];
        $price = $_POST['price'];
        $type = $_POST['type'];
        $oldImage = $_POST['oldImage'];
        $imageName = $oldImage; // mặc định giữ ảnh cũ

        // Nếu có ảnh mới → upload ảnh
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {

            $originalName = basename($_FILES['image']['name']);
            $imageName = time() . "_" . $originalName;

            $uploadDir = "../uploads/";
            $publicDir = "../frontend/public/images/";

            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
            if (!is_dir($publicDir)) mkdir($publicDir, 0777, true);

            $uploadPath = $uploadDir . $imageName;
            $publicPath = $publicDir . $imageName;

            // Move file vào uploads
            if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể upload ảnh mới!"
                ]);
                return;
            }

            // Copy sang FE public/images
            copy($uploadPath, $publicPath);
        }

        // UPDATE DB
        $database = new Database();
        $db = $database->connect();
        $foodModel = new FoodsModel($db);

        $result = $foodModel->updateFood($id, $name, $desc, $imageName, $price, $type);

        echo json_encode([
            "success" => $result,
            "message" => $result ? "Cập nhật món thành công!" : "Không thể cập nhật món!"
        ]);
    }




}

// Chỉ chạy action index khi gọi foods.php
if (basename($_SERVER['PHP_SELF']) == "foods.php") {
    $controller = new FoodsController();
    $controller->index();
}
