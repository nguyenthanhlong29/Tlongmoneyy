# Social Task Manager - Hướng dẫn cài đặt

## Yêu cầu
- Node.js 18+ 
- npm hoặc yarn
- Tài khoản Facebook Developer

## Bước 1: Cài đặt dependencies

Bạn đã cài đặt rồi, nhưng nếu cần cài lại:

```bash
npm install
```

## Bước 2: Cấu hình Facebook OAuth

1. Truy cập [Facebook Developers](https://developers.facebook.com/)
2. Tạo ứng dụng mới hoặc sử dụng ứng dụng hiện có
3. Vào **Settings > Basic** để lấy:
   - App ID
   - App Secret

4. Vào **Facebook Login > Settings** và thêm:
   - Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/facebook/callback`

## Bước 3: Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc:

```bash
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id_here
FACEBOOK_APP_SECRET=your_app_secret_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Thay `your_app_id_here` và `your_app_secret_here` bằng thông tin từ Facebook Developer.

## Bước 4: Chạy ứng dụng

```bash
npm run dev
```

Mở trình duyệt và truy cập: `http://localhost:3000`

## Cấu trúc dự án

```
├── app/
│   ├── api/
│   │   ├── auth/facebook/callback/  # OAuth callback
│   │   └── tasks/                   # API routes cho tasks
│   ├── layout.tsx                   # Layout chính
│   └── page.tsx                     # Trang chủ
├── components/
│   ├── Dashboard.tsx                # Giao diện chính
│   ├── Header.tsx                   # Header với user info
│   ├── LoginPage.tsx                # Trang đăng nhập
│   ├── Sidebar.tsx                  # Menu điều hướng
│   ├── TaskCard.tsx                 # Card nhiệm vụ
│   └── TaskModal.tsx                # Popup chi tiết
├── contexts/
│   ├── AuthContext.tsx              # Quản lý authentication
│   └── TaskContext.tsx              # Quản lý tasks
├── lib/
│   ├── facebook-auth.ts             # Facebook OAuth logic
│   ├── rewards.ts                   # Tính toán phần thưởng
│   └── storage.ts                   # LocalStorage utilities
└── types/
    ├── auth.ts                      # Types cho auth
    └── task.ts                      # Types cho tasks
```

## Tính năng

✅ Đăng nhập Facebook OAuth
✅ Lưu token trong localStorage
✅ Sidebar responsive với menu
✅ Header hiển thị user info
✅ Lấy tasks từ BumX và Golike API
✅ Tính toán reward (reaction: 10đ, comment: 30đ)
✅ Popup chi tiết nhiệm vụ
✅ Loading states
✅ Error handling

## Lưu ý

- API BumX và Golike cần token hợp lệ để hoạt động
- Nếu API không khả dụng, ứng dụng sẽ hiển thị thông báo lỗi
- Để test mà không có API thật, bạn có thể mock data trong API routes

## Troubleshooting

### Lỗi "Token không hợp lệ"
- Kiểm tra Facebook App ID và Secret trong .env.local
- Đảm bảo redirect URI đã được cấu hình đúng

### Không lấy được tasks
- Kiểm tra API BumX/Golike có hoạt động không
- Xem console log để debug

### Lỗi build
```bash
npm run build
```
Nếu có lỗi TypeScript, kiểm tra các import paths
