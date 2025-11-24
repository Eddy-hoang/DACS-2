<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require_once "../config/database.php";
include_once "../controllers/BookingController.php";

$database = new Database();
$conn = $database->connect();
$controller = new BookingController();

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "OPTIONS") {
    exit; // xử lý preflight request
}

if ($method === "GET") {

    $bookings = $controller->getAllBookings($conn);
    echo json_encode($bookings);

} elseif ($method === "PUT") {

    $raw = file_get_contents("php://input");
    parse_str($raw, $data); // FIX LỖI PUT JSON

    $id = $data["id"] ?? null;
    $status = $data["status"] ?? null;

    echo json_encode($controller->updateStatus($conn, $id, $status));

} elseif ($method === "DELETE") {

    $raw = file_get_contents("php://input");
    parse_str($raw, $data); // FIX DELETE JSON

    $id = $data["id"] ?? null;

    echo json_encode($controller->deleteBooking($conn, $id));

} else {
    echo json_encode([
        "success" => false,
        "message" => "❌ Phương thức không được hỗ trợ!"
    ]);
}
?>
