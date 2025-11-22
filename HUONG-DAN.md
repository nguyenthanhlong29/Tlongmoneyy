# 🚀 HƯỚNG DẪN CHẠY WEB

## ✅ Bạn đã cài đặt dependencies rồi!

Tôi thấy bạn đã chạy lệnh cài đặt. Bây giờ chỉ cần làm theo các bước sau:

## 📝 Bước 1: Cấu hình Facebook App

### 1.1. Tạo Facebook App
1. Truy cập: https://developers.facebook.com/
2. Click **"My Apps"** → **"Create App"**
3. Chọn **"Consumer"** → Click **"Next"**
4. Điền tên app → Click **"Create App"**

### 1.2. Lấy App ID và App Secret
1. Vào **Settings** → **Basic**
2. Copy **App ID**
3. Click **"Show"** ở **App Secret** và copy

### 1.3. Cấu hình Facebook Login
1. Vào **Products** → Thêm **"Facebook Login"**
2. Chọn **"Web"**
3. Vào **Facebook Login** → **Settings**
4. Thêm vào **Valid OAuth Redirect URIs**:
   ```
   http://localhost:3000/api/auth/facebook/callback
   ```
5. Click **"Save Changes"**

## 🔧 Bước 2: Cấu hình file .env.local

Mở file `.env.local` và thay đổi:

```env
NEXT_PUBLIC_FACEBOOK_APP_ID=paste_app_id_here
FACEBOOK_APP_SECRET=paste_app_secret_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Ví dụ:**
```env
NEXT_PUBLIC_FACEBOOK_APP_ID=123456789012345
FACEBOOK_APP_SECRET=abcdef1234567890abcdef1234567890
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🎯 Bước 3: Chạy web

```bash
npm run dev
```

## 🌐 Bước 4: Mở trình duyệt

Truy cập: **http://localhost:3000**

## 🎨 Giao diện sẽ có:

### Trang đăng nhập:
- Nút "Đăng nhập Facebook" màu xanh
- Giao diện gradient đẹp mắt

### Sau khi đăng nhập:
- **Header**: Hiển thị tên và avatar Facebook của bạn
- **Sidebar**: Menu với 4 mục
  - 🏠 Trang chủ
  - 📋 Nhiệm vụ
  - 💰 Ví tiền
  - ⚙️ Cài đặt
- **Main content**: Danh sách nhiệm vụ dạng card
  - Mỗi card có: Tiêu đề, Platform, Type, Phần thưởng, Nút "Nhận nhiệm vụ"
  - Click "Nhận nhiệm vụ" → Hiện popup chi tiết

## 🔍 Kiểm tra

### Test đăng nhập:
1. Click nút "Đăng nhập Facebook"
2. Đăng nhập với tài khoản Facebook
3. Cho phép ứng dụng truy cập
4. Bạn sẽ được redirect về trang chủ và thấy dashboard

### Test nhiệm vụ:
1. Vào mục "Nhiệm vụ" ở sidebar
2. Xem danh sách nhiệm vụ từ BumX và Golike
3. Click "Nhận nhiệm vụ" để xem chi tiết
4. Popup sẽ hiện ra với thông tin đầy đủ

## ⚠️ Lưu ý quan trọng

### Nếu không thấy nhiệm vụ:
- API BumX và Golike cần token hợp lệ
- Nếu API không hoạt động, bạn sẽ thấy thông báo lỗi
- Đây là bình thường vì API thật có thể cần authentication riêng

### Để test với dữ liệu giả:
Bạn có thể sửa file `app/api/tasks/bumx/route.ts` và `app/api/tasks/golike/route.ts` để return dữ liệu mẫu:

```typescript
// Thay vì fetch API thật, return mock data:
const mockTasks = [
  {
    id: '1',
    platform: 'Facebook',
    type: 'reaction',
    title: 'Thả cảm xúc bài viết',
    source: 'bumx' as const,
  },
  {
    id: '2',
    platform: 'Facebook',
    type: 'comment',
    title: 'Bình luận bài viết',
    source: 'bumx' as const,
  },
];

return NextResponse.json(mockTasks);
```

## 🎉 Tính năng đã hoàn thành

✅ Đăng nhập Facebook OAuth
✅ Lưu token trong localStorage
✅ Auto login khi quay lại
✅ Sidebar responsive (mobile-friendly)
✅ Header với avatar và tên user
✅ Fetch tasks từ 2 API (BumX + Golike)
✅ Tính toán reward:
   - Reaction = 10đ
   - Comment = 30đ
   - Khác = 0đ
✅ Popup chi tiết nhiệm vụ
✅ Loading states
✅ Error handling
✅ Responsive design (desktop + mobile)

## 🐛 Troubleshooting

### Lỗi "Cannot find module"
```bash
npm install
```

### Lỗi TypeScript
```bash
npm run build
```

### Port 3000 đã được sử dụng
```bash
npm run dev -- -p 3001
```
Sau đó truy cập: http://localhost:3001

### Facebook OAuth không hoạt động
1. Kiểm tra App ID và Secret trong .env.local
2. Kiểm tra redirect URI trong Facebook App Settings
3. Đảm bảo Facebook App đang ở chế độ Development

## 📱 Responsive Design

- **Desktop**: Full sidebar + header + content
- **Tablet**: Sidebar có thể thu gọn
- **Mobile**: Sidebar overlay, có nút toggle

## 🎨 Màu sắc

- Primary: Blue (#2563eb)
- Success: Green (#16a34a)
- Danger: Red (#dc2626)
- Background: Gray (#f9fafb)

## 📞 Cần hỗ trợ?

Nếu gặp vấn đề, hãy:
1. Kiểm tra console log trong browser (F12)
2. Kiểm tra terminal có lỗi không
3. Đảm bảo .env.local đã được cấu hình đúng

---

**Chúc bạn code vui vẻ! 🚀**
