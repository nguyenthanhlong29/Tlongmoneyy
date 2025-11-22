# 🚀 HƯỚNG DẪN DEPLOY WEB TLONGMONEY

## Bước 1: Tạo Repository trên GitHub

1. Vào: https://github.com/new
2. Repository name: `tlongmoney`
3. Chọn **Public** hoặc **Private**
4. **KHÔNG** tick "Add a README file"
5. Click **Create repository**

## Bước 2: Push code lên GitHub

Mở Command Prompt trong thư mục dự án và chạy từng lệnh:

```bash
git add .
```

```bash
git commit -m "Initial commit - Tlongmoney app"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/nguyenthanhlong29/tlongmoney.git
```

```bash
git push -u origin main
```

**Nếu GitHub yêu cầu đăng nhập:**
- Username: `nguyenthanhlong29`
- Password: Dùng **Personal Access Token** (không phải password thường)

### Cách tạo Personal Access Token:
1. Vào: https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Chọn quyền: `repo` (full control)
4. Click **Generate token**
5. Copy token và dùng làm password

## Bước 3: Deploy lên Vercel

### 3.1. Đăng ký Vercel
1. Vào: https://vercel.com/signup
2. Click **Continue with GitHub**
3. Đăng nhập GitHub và cho phép Vercel truy cập

### 3.2. Import Project
1. Vào: https://vercel.com/new
2. Click **Import Git Repository**
3. Tìm và chọn repository `tlongmoney`
4. Click **Import**

### 3.3. Cấu hình Project
- **Framework Preset:** Next.js (tự động)
- **Root Directory:** `./`
- **Build Command:** `next build`
- **Output Directory:** `.next`

### 3.4. Thêm Environment Variables
Click **Environment Variables** và thêm:

```
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id_here
FACEBOOK_APP_SECRET=your_app_secret_here
NEXT_PUBLIC_BUMX_API_URL=https://api.bumx.vn
NEXT_PUBLIC_GOLIKE_API_URL=https://api.golike.net
NEXT_PUBLIC_APP_URL=https://tlongmoney.vercel.app
```

**Lưu ý:** Bạn cần có Facebook App ID và Secret từ https://developers.facebook.com

### 3.5. Deploy
1. Click **Deploy**
2. Đợi 2-3 phút
3. Xong! URL của bạn: `https://tlongmoney.vercel.app`

## Bước 4: Cấu hình Facebook App

1. Vào: https://developers.facebook.com
2. Chọn app của bạn
3. **Settings** > **Basic**
   - Thêm domain: `tlongmoney.vercel.app`
4. **Facebook Login** > **Settings**
   - Thêm callback URL: `https://tlongmoney.vercel.app/api/auth/facebook/callback`
5. Click **Save Changes**

## Bước 5: Test

1. Truy cập: `https://tlongmoney.vercel.app`
2. Test đăng nhập Facebook
3. Test các chức năng

## 🔄 Cập nhật code sau này

Mỗi khi thay đổi code:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

Vercel sẽ **tự động deploy** sau mỗi lần push!

## ❓ Troubleshooting

### Lỗi: "git is not recognized"
- Cài Git: https://git-scm.com/download/win
- Khởi động lại Command Prompt

### Lỗi: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/nguyenthanhlong29/tlongmoney.git
```

### Lỗi: "failed to push"
```bash
git pull origin main --rebase
git push -u origin main
```

### Lỗi build trên Vercel
- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo `npm run build` chạy OK ở local

---

**Chúc bạn deploy thành công! 🎉**

GitHub: https://github.com/nguyenthanhlong29/tlongmoney
Vercel: https://tlongmoney.vercel.app
