<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once "../config/database.php";
include_once "../controllers/BookingController.php";

$database = new Database();
$conn = $database->connect();

// Lấy user_id và email từ query parameters
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
$email = isset($_GET['email']) ? $_GET['email'] : null;

if ($user_id <= 0 && !$email) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu user_id hoặc email!",
        "bookings" => []
    ]);
    exit;
}

$controller = new BookingController();
$bookings = $controller->getUserBookings($conn, $user_id, $email);

echo json_encode([
    "success" => true,
    "bookings" => $bookings,
    "count" => count($bookings)
]);
?>



