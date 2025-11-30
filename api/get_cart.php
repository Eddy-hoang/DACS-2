<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

// Lấy user_id từ query parameter hoặc từ body
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;

// Nếu không có trong GET, thử lấy từ POST body
if ($user_id <= 0) {
    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = isset($input['user_id']) ? intval($input['user_id']) : 0;
}

$result = $controller->getCart($conn, $user_id);
echo json_encode($result);
?>

