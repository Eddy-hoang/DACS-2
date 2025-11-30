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

$food_id = isset($_GET['food_id']) ? intval($_GET['food_id']) : 0;

if ($food_id <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu food_id!",
        "comments" => []
    ]);
    exit;
}

$commentModel = new Comment($conn);
$comments = $commentModel->getByFoodId($food_id);

echo json_encode([
    "success" => true,
    "comments" => $comments
]);
?>
