<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once "../config/database.php";
include_once "../models/Comment.php";

$database = new Database();
$conn = $database->connect();

// Nhận JSON từ React
$input = json_decode(file_get_contents("php://input"), true);

$food_id = isset($input['food_id']) ? intval($input['food_id']) : 0;
$user_id = isset($input['user_id']) ? intval($input['user_id']) : 0;
$username = isset($input['username']) ? trim($input['username']) : '';
$comment = isset($input['comment']) ? trim($input['comment']) : '';

// Kiểm tra dữ liệu
if ($food_id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu food_id!"
    ]);
    exit;
}

if ($user_id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Bạn cần đăng nhập để bình luận!"
    ]);
    exit;
}

if (empty($username)) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu tên người dùng!"
    ]);
    exit;
}

if (empty($comment)) {
    echo json_encode([
        "success" => false,
        "message" => "Bình luận không được để trống!"
    ]);
    exit;
}

// Kiểm tra độ dài bình luận
if (strlen($comment) > 1000) {
    echo json_encode([
        "success" => false,
        "message" => "Bình luận không được vượt quá 1000 ký tự!"
    ]);
    exit;
}

// Tạo bình luận
$commentModel = new Comment($conn);
$commentModel->food_id = $food_id;
$commentModel->user_id = $user_id;
$commentModel->username = $username;
$commentModel->comment = $comment;

if ($commentModel->create()) {
    echo json_encode([
        "success" => true,
        "message" => "Bình luận đã được thêm thành công!",
        "comment" => [
            "id" => $commentModel->id,
            "food_id" => $food_id,
            "user_id" => $user_id,
            "username" => $username,
            "comment" => $comment,
            "created_at" => date("Y-m-d H:i:s")
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Không thể thêm bình luận!"
    ]);
}
?>

