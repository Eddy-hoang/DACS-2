<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include_once "../config/database.php";

$database = new Database();
$conn = $database->connect();

// 🔥 NHẬN JSON TỪ REACT
$input = json_decode(file_get_contents("php://input"), true);

$email    = $input['email'] ?? null;
$password = $input['password'] ?? null;

// Kiểm tra dữ liệu
if (!$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu email hoặc mật khẩu!"
    ]);
    exit;
}

// Lấy user theo email
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email không tồn tại!"
    ]);
    exit;
}

$user = $result->fetch_assoc();

// Kiểm tra mật khẩu
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        "success" => false,
        "message" => "Mật khẩu không đúng!"
    ]);
    exit;
}

// Đăng nhập thành công
echo json_encode([
    "success" => true,
    "message" => "Đăng nhập thành công!",
    "user" => [
        "id"       => $user['id'],
        "username" => $user['username'],
        "email"    => $user['email'],
        "avatar"   => $user['avatar']
    ]
]);
?>
