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
include_once "../controllers/CartController.php";

$database = new Database();
$conn = $database->connect();
$controller = new CartController();

// Nhận JSON từ React
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode([
        "success" => false,
        "message" => "❌ Dữ liệu không hợp lệ!"
    ]);
    exit;
}

$result = $controller->addToCart($conn, $input);
echo json_encode($result);
?>

