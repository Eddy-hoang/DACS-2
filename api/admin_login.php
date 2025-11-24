<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

// Kết nối database
$database = new Database();
$conn = $database->connect();

// Truy vấn admin theo email
$sql = "SELECT * FROM admins WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Nếu email không tồn tại
if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email không tồn tại!"
    ]);
    exit;
}

$admin = $result->fetch_assoc();

// Kiểm tra mật khẩu (không mã hoá)
if ($password !== $admin["password"]) {
    echo json_encode([
        "success" => false,
        "message" => "Sai mật khẩu!"
    ]);
    exit;
}

// Đăng nhập thành công
echo json_encode([
    "success" => true,
    "message" => "Đăng nhập thành công!",
    "admin" => [
        "id" => $admin["id"],
        "name" => $admin["name"],
        "email" => $admin["email"]
    ]
]);
?>
