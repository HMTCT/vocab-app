# Hướng Dẫn Thêm Bài Học Mới (VocabMaster)

Ứng dụng này được thiết kế để bạn có thể **dễ dàng thêm bài học mới** (Unit mới) mà không cần biết lập trình. Dữ liệu từ vựng được lưu trữ trong các file văn bản thuần túy.

## Các Bước Thêm 1 Unit Mới

1. **Mở thư mục chứa dữ liệu bài học:**
   Vào thư mục `src/data/lessons/` trong mã nguồn.

2. **Tạo file bài học mới từ Template:**
   - Bạn sẽ thấy một file tên là `_TEMPLATE.js`.
   - Copy file này và dán ra một bản sao.
   - Đổi tên bản sao đó thành tên bài học của bạn (Ví dụ: `unit_10_marketing.js`). Lưu ý: Tên file viết liền không dấu, không dùng khoảng trắng (nên dùng dấu gạch dưới `_`).

3. **Chỉnh sửa nội dung file mới:**
   - Mở file bạn vừa đổi tên (bằng Notepad, VS Code hoặc bất kỳ trình soạn thảo văn bản nào).
   - Làm theo các bước (STEP) đã được chú thích sẵn bằng tiếng Anh trong file:
     - **STEP 1 (`id`)**: Đổi thành số thứ tự tiếp theo (ví dụ: `10`).
     - **STEP 2 (`title`, `vietnameseTitle`)**: Đổi tên bài học bằng tiếng Anh và tiếng Việt.
     - **STEP 3 (`words`)**: Thay thế các từ vựng mẫu bằng từ vựng của bạn. Ghi rõ tiếng Anh (`en`), tiếng Việt (`vi`), và loại từ (`type`).
     - **STEP 4 (`sentences`)**: Có thể để trống `[]` nếu bạn muốn hệ thống tự tạo câu hỏi trắc nghiệm, HOẶC bạn tự viết câu hỏi điền vào chỗ trống như mẫu.
   - Lưu file lại.

4. **Đăng ký file mới vào hệ thống:**
   - Mở file `src/data/manifest.js`.
   - Tìm danh sách `LESSON_FILES`.
   - Thêm một dòng mới ở cuối danh sách, ghi đường dẫn tới file bạn vừa tạo (nhớ có dấu phẩy ở cuối). Ví dụ:
     ```javascript
     'src/data/lessons/unit_10_marketing.js',
     ```
   - Lưu file `manifest.js`.

5. **Hoàn thành!**
   - Mở lại file `index.html` trên trình duyệt web. Bài học mới của bạn sẽ xuất hiện ở cuối danh sách cột bên trái!

## Đưa Ứng Dụng Lên Mạng (GitHub Pages)

Ứng dụng này không cần cài đặt phức tạp. Để chia sẻ cho bạn bè:
1. Đăng nhập GitHub và tạo một Repository mới.
2. Tải toàn bộ thư mục của ứng dụng này lên Repository đó.
3. Vào tab **Settings** của Repository > Chọn mục **Pages** ở menu bên trái.
4. Ở phần **Source**, chọn nhánh `main` (hoặc `master`), rồi nhấn Save.
5. GitHub sẽ cấp cho bạn một đường link web (ví dụ: `https://ten-ban.github.io/vocab-app/`). Bạn có thể gửi link này cho bất kỳ ai!
