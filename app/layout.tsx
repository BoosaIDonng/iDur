import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "杜泽民 | Java 后端开发 · AI Agent",
  description: "杜泽民的个人作品集，专注 Java 后端开发与 AI Agent 工程实践，展示券流优惠券发行与履约引擎、码序终端编程 Agent、技术能力与竞赛荣誉。"
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
