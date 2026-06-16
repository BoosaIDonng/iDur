import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "iDu | 杜泽民",
  description: "杜泽民的个人网站，聚焦 Java 后端开发、Spring Boot、MySQL、Redis 与项目实践经历。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
