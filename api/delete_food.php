<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../controllers/FoodsController.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;

$controller = new FoodsController();
$controller->delete($id);
?>
