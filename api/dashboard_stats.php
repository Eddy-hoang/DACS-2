<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

$db = new Database();
$conn = $db->connect(); 

// Tổng món ăn
$result = $conn->query("SELECT COUNT(*) AS total FROM foods");
$foods = $result->fetch_assoc()['total'];

// Tổng đặt bàn
$result2 = $conn->query("SELECT COUNT(*) AS total FROM bookings");
$bookings = $result2->fetch_assoc()['total'];

// Tổng liên hệ
$result3 = $conn->query("SELECT COUNT(*) AS total FROM contacts");
$contacts = $result3 ? $result3->fetch_assoc()['total'] : 0;

// Doanh thu (tạm thời)
$revenue = 0;

echo json_encode([
    "foods" => $foods,
    "bookings" => $bookings,
    "contacts" => $contacts,
    "revenue" => $revenue
]);