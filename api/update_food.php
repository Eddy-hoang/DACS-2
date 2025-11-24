<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";
include_once "../controllers/FoodsController.php";

$controller = new FoodsController();
$controller->updateFood();
