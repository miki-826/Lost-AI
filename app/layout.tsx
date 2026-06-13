import type { Metadata } from "next";
import { Orbitron, Noto_Sans_JP, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-title",
});

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LostAI",
  description:
    "記憶を失ったAIに5回だけ質問し、そのAIがかつて何のAIだったのかを推理するWebゲーム。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body
        className={`${orbitron.variable} ${notoSansJp.variable} ${shareTechMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
