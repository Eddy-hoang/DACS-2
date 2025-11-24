<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../controllers/BookingController.php";

$database = new Database();
$conn = $database->connect();

$data = json_decode(file_get_contents("php://input"), true);

$controller = new BookingController();
echo json_encode($controller->createBooking($conn, $data));
?>
