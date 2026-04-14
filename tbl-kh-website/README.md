# The Becoming Learners + Knowledge Horizon
## Hướng dẫn deploy lên GitHub Pages (miễn phí)

---

## Cấu trúc thư mục

```
tbl-kh-website/
├── index.html        → The Becoming Learners (EN)  → vy-phan.github.io/tbl-kh-website/
├── kh/
│   └── index.html   → Knowledge Horizon (VI)       → vy-phan.github.io/tbl-kh-website/kh/
└── README.md
```

---

## Bước 1: Tạo tài khoản GitHub

1. Vào https://github.com → Sign up
2. Username gợi ý: `vy-phan` hoặc `knowledge-horizon`
3. Xác nhận email

---

## Bước 2: Tạo Repository

1. Đăng nhập GitHub → nhấn nút **+** góc trên phải → **New repository**
2. Repository name: `tbl-kh-website`
3. Chọn **Public** (bắt buộc cho GitHub Pages miễn phí)
4. Nhấn **Create repository**

---

## Bước 3: Upload files

**Cách đơn giản nhất (kéo thả, không cần biết code):**

1. Trong trang repo vừa tạo, nhấn **uploading an existing file**
2. Kéo thả file `index.html` vào
3. Kéo thả folder `kh/` vào (hoặc upload `kh/index.html` riêng)
4. Kéo thả file `README.md` vào
5. Nhấn **Commit changes**

**Lưu ý khi upload folder `kh/`:**
- GitHub không nhận folder trực tiếp bằng kéo thả
- Tạo folder bằng cách: nhấn **Add file** → **Create new file** → gõ `kh/index.html` (gõ `kh/` sẽ tự tạo folder)
- Paste toàn bộ nội dung file `kh/index.html` vào → Commit

---

## Bước 4: Bật GitHub Pages

1. Vào **Settings** của repo
2. Kéo xuống mục **Pages** (menu bên trái)
3. Source: chọn **Deploy from a branch**
4. Branch: chọn **main** → folder **/ (root)**
5. Nhấn **Save**
6. Chờ ~2 phút → GitHub sẽ hiện link: `https://vy-phan.github.io/tbl-kh-website/`

---

## Bước 5: Kiểm tra

- TBL homepage: `https://vy-phan.github.io/tbl-kh-website/`
- KH homepage:  `https://vy-phan.github.io/tbl-kh-website/kh/`
- Nút toggle EN/VI trên TBL hoạt động
- Nút "Knowledge Horizon (VI) →" trên TBL dẫn sang KH
- Nút "The Becoming Learners (EN) →" trên KH dẫn về TBL

---

## Thêm bài viết mới

Mỗi lần có bài mới, chỉ cần:
1. Vào repo trên GitHub
2. Mở `index.html` (hoặc `kh/index.html`)
3. Nhấn biểu tượng bút chì (Edit)
4. Sao chép một khối `<article class="article">...</article>` đã có
5. Thay nội dung (badge, ngày, tiêu đề, excerpt)
6. Nhấn **Commit changes**
7. Site tự cập nhật sau ~1 phút

---

## Cập nhật thông tin

| Cần thay đổi | Chỉnh ở đâu |
|---|---|
| Tên, bio | `index.html` → tìm "About" section |
| Link YouTube | Tìm `href="https://youtube.com"` → thay bằng link thật |
| Link LinkedIn | Tìm `href="https://linkedin.com"` → thay bằng link thật |
| Sự kiện / Events | Tìm `<div class="event-item">` |
| Video nổi bật | Tìm `<div class="video-card">` |

---

## Màu sắc thương hiệu

| Kênh | Màu chủ | Hex |
|---|---|---|
| The Becoming Learners | Orange | `#C4611A` |
| Knowledge Horizon | Teal | `#1A5C5C` |

---

## Hỗ trợ thêm

Khi cần thêm tính năng (trang bài viết riêng, form đăng ký newsletter, trang podcast...), hỏi Claude để tạo tiếp. Paste file HTML hiện tại vào chat + mô tả cần gì.
