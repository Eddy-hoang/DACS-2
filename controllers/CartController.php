<?php
include_once "../models/Cart.php";

class CartController {

    // =========================
    // LẤY GIỎ HÀNG CỦA USER
    // =========================
    public function getCart($conn, $user_id) {
        if (!$user_id || $user_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Bạn cần đăng nhập!",
                "cart" => []
            ];
        }

        $cart = new Cart($conn);
        $cartItems = $cart->getCartByUserId($user_id);

        return [
            "success" => true,
            "message" => "✔️ Lấy giỏ hàng thành công!",
            "cart" => $cartItems,
            "totalItems" => $cart->getTotalItems($user_id),
            "totalPrice" => $cart->getTotalPrice($user_id)
        ];
    }

    // =========================
    // THÊM SẢN PHẨM VÀO GIỎ
    // =========================
    public function addToCart($conn, $data) {
        $user_id = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
        $food_id = isset($data["food_id"]) ? intval($data["food_id"]) : 0;
        $quantity = isset($data["quantity"]) ? intval($data["quantity"]) : 1;

        if ($user_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Bạn cần đăng nhập để thêm vào giỏ hàng!"
            ];
        }

        if ($food_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Món ăn không hợp lệ!"
            ];
        }

        if ($quantity <= 0) {
            return [
                "success" => false,
                "message" => "❌ Số lượng phải lớn hơn 0!"
            ];
        }

        $cart = new Cart($conn);
        
        if ($cart->addItem($user_id, $food_id, $quantity)) {
            return [
                "success" => true,
                "message" => "✔️ Đã thêm vào giỏ hàng!",
                "cart" => $cart->getCartByUserId($user_id),
                "totalItems" => $cart->getTotalItems($user_id),
                "totalPrice" => $cart->getTotalPrice($user_id)
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Không thể thêm vào giỏ hàng!"
        ];
    }

    // =========================
    // CẬP NHẬT SỐ LƯỢNG
    // =========================
    public function updateCart($conn, $data) {
        $user_id = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
        $food_id = isset($data["food_id"]) ? intval($data["food_id"]) : 0;
        $quantity = isset($data["quantity"]) ? intval($data["quantity"]) : 0;

        if ($user_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Bạn cần đăng nhập!"
            ];
        }

        if ($food_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Món ăn không hợp lệ!"
            ];
        }

        $cart = new Cart($conn);
        
        if ($cart->updateQuantity($user_id, $food_id, $quantity)) {
            return [
                "success" => true,
                "message" => "✔️ Đã cập nhật giỏ hàng!",
                "cart" => $cart->getCartByUserId($user_id),
                "totalItems" => $cart->getTotalItems($user_id),
                "totalPrice" => $cart->getTotalPrice($user_id)
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Không thể cập nhật giỏ hàng!"
        ];
    }

    // =========================
    // XÓA SẢN PHẨM KHỎI GIỎ
    // =========================
    public function removeFromCart($conn, $data) {
        $user_id = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
        $food_id = isset($data["food_id"]) ? intval($data["food_id"]) : 0;

        if ($user_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Bạn cần đăng nhập!"
            ];
        }

        if ($food_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Món ăn không hợp lệ!"
            ];
        }

        $cart = new Cart($conn);
        
        if ($cart->removeItem($user_id, $food_id)) {
            return [
                "success" => true,
                "message" => "✔️ Đã xóa khỏi giỏ hàng!",
                "cart" => $cart->getCartByUserId($user_id),
                "totalItems" => $cart->getTotalItems($user_id),
                "totalPrice" => $cart->getTotalPrice($user_id)
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Không thể xóa khỏi giỏ hàng!"
        ];
    }

    // =========================
    // XÓA TOÀN BỘ GIỎ HÀNG
    // =========================
    public function clearCart($conn, $user_id) {
        if ($user_id <= 0) {
            return [
                "success" => false,
                "message" => "❌ Bạn cần đăng nhập!"
            ];
        }

        $cart = new Cart($conn);
        
        if ($cart->clearCart($user_id)) {
            return [
                "success" => true,
                "message" => "✔️ Đã xóa toàn bộ giỏ hàng!",
                "cart" => [],
                "totalItems" => 0,
                "totalPrice" => 0
            ];
        }

        return [
            "success" => false,
            "message" => "❌ Không thể xóa giỏ hàng!"
        ];
    }
}
?>

