<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../config/database.php";

$db = new Database();
$conn = $db->connect();

$activities = [];


$foodResult = $conn->query("SELECT id, name FROM foods ORDER BY id DESC LIMIT 10");
while ($row = $foodResult->fetch_assoc()) {
    $activities[] = [
        "type" => "food",
        "message" => "Món ăn mới được thêm: " . $row['name'],
        "time" => "ID #" . $row['id']  // dùng id thay created_at
    ];
}


$bookingResult = $conn->query("SELECT id, name FROM bookings ORDER BY id DESC LIMIT 10");
while ($row = $bookingResult->fetch_assoc()) {
    $activities[] = [
        "type" => "booking",
        "message" => $row['name'] . " đã đặt bàn.",
        "time" => "ID #" . $row['id']
    ];
}

/* Sắp xếp hoạt động theo id giảm dần */
usort($activities, function($a, $b) {
    // Sắp theo ID số
    return intval(filter_var($b['time'], FILTER_SANITIZE_NUMBER_INT)) - 
           intval(filter_var($a['time'], FILTER_SANITIZE_NUMBER_INT));
});

/* Giới hạn 10 hoạt động */
echo json_encode(array_slice($activities, 0, 10));