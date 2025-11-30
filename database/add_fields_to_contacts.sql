-- ============================================
-- Script: Thêm cột user_id và is_read vào bảng contacts
-- ============================================

-- Bước 1: Thêm cột user_id
-- Lưu ý: Nếu cột đã tồn tại, sẽ báo lỗi nhưng không ảnh hưởng
ALTER TABLE contacts 
ADD COLUMN user_id INT NULL AFTER id;

-- Bước 2: Thêm foreign key constraint (tùy chọn - bỏ comment nếu muốn)
-- ALTER TABLE contacts 
-- ADD CONSTRAINT fk_contacts_user 
-- FOREIGN KEY (user_id) REFERENCES users(id) 
-- ON DELETE SET NULL;

-- Bước 3: Thêm cột is_read
-- Lưu ý: Nếu cột đã tồn tại, sẽ báo lỗi nhưng không ảnh hưởng
ALTER TABLE contacts 
ADD COLUMN is_read TINYINT(1) DEFAULT 0 AFTER message;

-- Bước 4: Cập nhật các liên hệ cũ thành chưa đọc (nếu có)
UPDATE contacts SET is_read = 0 WHERE is_read IS NULL;

-- Kiểm tra kết quả (chạy để xem các cột đã được thêm chưa)
SELECT id, user_id, name, email, is_read, created_at FROM contacts LIMIT 10;

