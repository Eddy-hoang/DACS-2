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
include_once "../models/Comment.php";

$database = new Database();
$conn = $database->connect();

// Lấy user_id từ query parameter
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
$email = isset($_GET['email']) ? trim($_GET['email']) : '';

if ($user_id <= 0 && empty($email)) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu user_id hoặc email!",
        "stats" => [
            "orders" => 0,
            "bookings" => 0,
            "comments" => 0,
            "recent_activities" => []
        ]
    ]);
    exit;
}

$stats = [
    "orders" => 0,
    "bookings" => 0,
    "comments" => 0,
    "recent_activities" => []
];

// Đếm số bình luận của user
if ($user_id > 0) {
    $sql = "SELECT COUNT(*) AS total FROM comments WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result) {
            $row = $result->fetch_assoc();
            $stats["comments"] = intval($row['total']);
        }
    }
}

// Đếm số đơn đặt bàn của user (theo email)
if (!empty($email)) {
    $sql = "SELECT COUNT(*) AS total FROM bookings WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result) {
            $row = $result->fetch_assoc();
            $stats["bookings"] = intval($row['total']);
        }
    }
}

// Lấy hoạt động gần đây (bình luận + đặt bàn)
$activities = [];

// Lấy bình luận gần đây (5 bình luận mới nhất)
if ($user_id > 0) {
    $sql = "SELECT c.*, f.name as food_name, f.image as food_image 
            FROM comments c 
            LEFT JOIN foods f ON c.food_id = f.id 
            WHERE c.user_id = ? 
            ORDER BY c.created_at DESC 
            LIMIT 5";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $activities[] = [
                "type" => "comment",
                "id" => $row['id'],
                "title" => "Đã bình luận về " . ($row['food_name'] ?? "món ăn"),
                "description" => substr($row['comment'], 0, 50) . "...",
                "food_id" => $row['food_id'],
                "food_image" => $row['food_image'],
                "created_at" => $row['created_at']
            ];
        }
    }
}

// Lấy đặt bàn gần đây (5 đặt bàn mới nhất)
if (!empty($email)) {
    $sql = "SELECT * FROM bookings 
            WHERE email = ? 
            ORDER BY date DESC, created_at DESC 
            LIMIT 5";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $activities[] = [
                "type" => "booking",
                "id" => $row['id'],
                "title" => "Đã đặt bàn",
                "description" => "Ngày: " . date("d/m/Y", strtotime($row['date'])) . " - " . $row['persons'] . " người",
                "status" => $row['status'] ?? "PENDING",
                "created_at" => $row['created_at'] ?? $row['date']
            ];
        }
    }
}

// Sắp xếp hoạt động theo thời gian (mới nhất trước)
usort($activities, function($a, $b) {
    return strtotime($b['created_at']) - strtotime($a['created_at']);
});

// Chỉ lấy 5 hoạt động mới nhất
$stats["recent_activities"] = array_slice($activities, 0, 5);

// Trả về kết quả
echo json_encode([
    "success" => true,
    "stats" => $stats
]);
?>

