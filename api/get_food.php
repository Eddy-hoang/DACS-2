<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../models/FoodsModel.php";

if (!isset($_GET['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "Thiếu ID!"
    ]);
    exit;
}

$id = intval($_GET['id']);

$database = new Database();
$db = $database->connect();
$foodModel = new FoodsModel($db);

$food = $foodModel->getFoodById($id);

if ($food) {
    echo json_encode($food);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Không tìm thấy món ăn!"
    ]);
}
