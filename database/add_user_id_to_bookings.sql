-- ============================================
-- Script: Thêm cột user_id vào bảng bookings
-- ============================================

-- Bước 1: Kiểm tra xem cột user_id đã tồn tại chưa
-- Nếu chưa có, thêm cột user_id

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS user_id INT NULL;

-- Bước 2: Thêm foreign key constraint (nếu cần)
-- Lưu ý: Chỉ chạy nếu bảng users đã tồn tại và có cột id

-- ALTER TABLE bookings 
-- ADD CONSTRAINT fk_bookings_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) 
-- ON DELETE SET NULL;

-- Bước 3: (Tùy chọn) Cập nhật user_id cho các booking cũ dựa trên email
-- Nếu bạn muốn liên kết các booking cũ với user hiện có:
-- UPDATE bookings b
-- INNER JOIN users u ON b.email = u.email
-- SET b.user_id = u.id
-- WHERE b.user_id IS NULL;

-- Kiểm tra kết quả
-- SELECT id, user_id, name, email, date, status FROM bookings LIMIT 10;



