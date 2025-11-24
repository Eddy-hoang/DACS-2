<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include_once "../config/database.php";

$database = new Database();
$conn = $database->connect();

// Lấy dữ liệu POST
$username = $_POST['username'] ?? null;
$email    = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

// Kiểm tra dữ liệu rỗng
if (!$username || !$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu dữ liệu!"
    ]);
    exit;
}

// Kiểm tra email đã tồn tại chưa
$check = $conn->prepare("SELECT id FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();
// Nếu tồn tại, trả về lỗi
if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email đã được sử dụng!"
    ]);
    exit;
}

// Hash mật khẩu
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Thêm user vào DB
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashedPassword);
// Thực thi và trả về kết quả
if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Đăng ký thành công!"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Không thể đăng ký, lỗi server!"
    ]);
}
?>
