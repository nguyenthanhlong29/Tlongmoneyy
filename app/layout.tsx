import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tlongmoney - Kiếm tiền từ nhiệm vụ",
  description: "Nền tảng kiếm tiền online từ các nhiệm vụ mạng xã hội",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
