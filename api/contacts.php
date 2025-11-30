<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once "../config/database.php";
include_once "../controllers/ContactController.php";

$database = new Database();
$conn = $database->connect();
$controller = new ContactController();

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    // Lấy tất cả liên hệ
    $contacts = $controller->getAllContacts($conn);
    echo json_encode($contacts);

} elseif ($method === "POST") {
    // Tạo liên hệ mới
    $data = json_decode(file_get_contents("php://input"), true);
    echo json_encode($controller->createContact($conn, $data));

} elseif ($method === "PUT") {
    // Cập nhật trạng thái đọc
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"] ?? null;
    $isRead = $data["is_read"] ?? false;
    
    echo json_encode($controller->updateReadStatus($conn, $id, $isRead));

} elseif ($method === "DELETE") {
    // Xóa liên hệ
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"] ?? null;
    
    echo json_encode($controller->deleteContact($conn, $id));

} else {
    echo json_encode([
        "success" => false,
        "message" => "❌ Phương thức không được hỗ trợ!"
    ]);
}
?>
