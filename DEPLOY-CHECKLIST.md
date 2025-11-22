# ✅ CHECKLIST DEPLOY VERCEL

## Trước khi deploy

- [ ] Đã test app chạy tốt ở local (`npm run dev`)
- [ ] Đã test build thành công (`npm run build`)
- [ ] Đã có tài khoản GitHub
- [ ] Đã có tài khoản Vercel
- [ ] Đã có Facebook App ID và Secret

## Bước 1: GitHub

- [ ] Tạo repository mới trên GitHub
- [ ] Push code lên GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/tlongmoney.git
  git push -u origin main
  ```

## Bước 2: Vercel

- [ ] Vào https://vercel.com/new
- [ ] Import repository từ GitHub
- [ ] Thêm Environment Variables:
  - `NEXT_PUBLIC_FACEBOOK_APP_ID`
  - `FACEBOOK_APP_SECRET`
  - `NEXT_PUBLIC_BUMX_API_URL`
  - `NEXT_PUBLIC_GOLIKE_API_URL`
  - `NEXT_PUBLIC_APP_URL`
- [ ] Click Deploy
- [ ] Đợi deploy xong, copy URL

## Bước 3: Facebook App

- [ ] Vào https://developers.facebook.com
- [ ] Thêm domain Vercel vào App Domains
- [ ] Thêm callback URL: `https://your-app.vercel.app/api/auth/facebook/callback`
- [ ] Save changes

## Bước 4: Cập nhật Vercel

- [ ] Cập nhật `NEXT_PUBLIC_APP_URL` với URL thật
- [ ] Redeploy

## Bước 5: Test

- [ ] Truy cập URL
- [ ] Test đăng nhập Facebook
- [ ] Test lấy tasks
- [ ] Test các chức năng khác

## Hoàn thành! 🎉

URL của bạn: `https://_____________________.vercel.app`
