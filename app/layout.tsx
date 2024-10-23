import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LoginButton from "./_components/LoginButton"; // ログインボタンのクライアントコンポーネントをインポート

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SUPPONPON",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-yellow-500 text-gray-600 body-font">
          <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img 
                src="/images/header_suppon.png" 
                alt="SUPPONPON logo" 
                className="w-[60px] h-[60px] bg-yellow-500 rounded-full"
              />
              <span className="ml-3 text-3xl text-white">SUPPONPON</span>
            </a>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
              <a className="mr-5 text-2xl text-white">出席確認お役立ちサイト</a>
            </nav>
            <LoginButton /> {/* クライアントサイドのログインボタンを使用 */}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
