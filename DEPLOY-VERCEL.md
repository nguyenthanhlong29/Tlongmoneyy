# 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL

## Bước 1: Chuẩn bị tài khoản

1. Truy cập: https://vercel.com
2. Đăng ký/Đăng nhập bằng GitHub (khuyến nghị)
3. Xác nhận email nếu cần

## Bước 2: Push code lên GitHub

### 2.1. Tạo repository trên GitHub
1. Vào https://github.com/new
2. Đặt tên repository: `tlongmoney` (hoặc tên bạn muốn)
3. Chọn **Private** hoặc **Public**
4. **KHÔNG** chọn "Initialize with README"
5. Click **Create repository**

### 2.2. Push code từ máy local

Mở terminal trong thư mục dự án và chạy:

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial commit - Tlongmoney app"

# Thêm remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/tlongmoney.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

## Bước 3: Deploy trên Vercel

### 3.1. Import project
1. Vào https://vercel.com/new
2. Click **Import Git Repository**
3. Chọn repository `tlongmoney` vừa tạo
4. Click **Import**

### 3.2. Cấu hình project

**Framework Preset:** Next.js (tự động detect)

**Root Directory:** `./` (để mặc định)

**Build Command:** `next build` (mặc định)

**Output Directory:** `.next` (mặc định)

**Install Command:** `npm install` (mặc định)

### 3.3. Thêm Environment Variables

Click **Environment Variables** và thêm:

```
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
NEXT_PUBLIC_BUMX_API_URL=https://api.bumx.vn
NEXT_PUBLIC_GOLIKE_API_URL=https://api.golike.net
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Lưu ý:** `NEXT_PUBLIC_APP_URL` sẽ được cập nhật sau khi deploy xong

### 3.4. Deploy

1. Click **Deploy**
2. Đợi 2-3 phút để Vercel build và deploy
3. Sau khi xong, bạn sẽ có URL dạng: `https://tlongmoney.vercel.app`

## Bước 4: Cấu hình Facebook App

1. Vào https://developers.facebook.com
2. Chọn app của bạn
3. Vào **Settings** > **Basic**
4. Thêm domain Vercel vào **App Domains**: `tlongmoney.vercel.app`
5. Vào **Facebook Login** > **Settings**
6. Thêm vào **Valid OAuth Redirect URIs**:
   ```
   https://tlongmoney.vercel.app/api/auth/facebook/callback
   ```
7. Click **Save Changes**

## Bước 5: Cập nhật Environment Variables

1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project `tlongmoney`
3. Vào **Settings** > **Environment Variables**
4. Cập nhật `NEXT_PUBLIC_APP_URL`:
   ```
   NEXT_PUBLIC_APP_URL=https://tlongmoney.vercel.app
   ```
5. Click **Save**
6. Vào tab **Deployments**
7. Click **Redeploy** để áp dụng thay đổi

## Bước 6: Sử dụng Custom Domain (Tùy chọn)

### 6.1. Nếu bạn có domain riêng (ví dụ: tlongmoney.com)

1. Vào **Settings** > **Domains**
2. Click **Add Domain**
3. Nhập domain: `tlongmoney.com`
4. Vercel sẽ hướng dẫn cấu hình DNS:
   - Thêm A Record: `76.76.21.21`
   - Hoặc CNAME: `cname.vercel-dns.com`
5. Đợi DNS propagate (5-30 phút)
6. Vercel tự động cấp SSL certificate

### 6.2. Cập nhật lại Environment Variables với domain mới

```
NEXT_PUBLIC_APP_URL=https://tlongmoney.com
```

Và cập nhật Facebook OAuth callback:
```
https://tlongmoney.com/api/auth/facebook/callback
```

## Bước 7: Kiểm tra

1. Truy cập URL của bạn: `https://tlongmoney.vercel.app`
2. Test đăng nhập Facebook
3. Test các chức năng task

## 🔄 Update code sau này

Mỗi khi bạn thay đổi code:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push
```

Vercel sẽ **tự động deploy** sau mỗi lần push!

## ⚡ Lệnh hữu ích

```bash
# Xem trạng thái git
git status

# Xem lịch sử commit
git log --oneline

# Tạo branch mới để test
git checkout -b feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature

# Pull code mới nhất
git pull origin main
```

## 🐛 Troubleshooting

### Lỗi build trên Vercel
- Kiểm tra logs trong Vercel Dashboard
- Đảm bảo `npm run build` chạy thành công ở local
- Kiểm tra TypeScript errors

### Lỗi Facebook OAuth
- Kiểm tra callback URL đã đúng chưa
- Kiểm tra App Domain trong Facebook App
- Kiểm tra Environment Variables

### Lỗi API
- Kiểm tra CORS settings
- Kiểm tra API keys và tokens
- Xem logs trong Vercel Functions

## 📞 Hỗ trợ

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

---

**Chúc bạn deploy thành công! 🎉**
