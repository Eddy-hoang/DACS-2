<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
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

// Nhận user_id từ JSON
$input = json_decode(file_get_contents("php://input"), true);
$user_id = isset($input['user_id']) ? intval($input['user_id']) : 0;

$result = $controller->clearCart($conn, $user_id);
echo json_encode($result);
?>

