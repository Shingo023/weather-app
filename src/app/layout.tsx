import { Inter } from "next/font/google";
import { Metadata } from "next";
import Sidebar from "./components/layouts/sideBar/Sidebar";
import SessionLayout from "./SessionLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionLayout>
          <Sidebar />
          {children}
        </SessionLayout>
      </body>
    </html>
  );
}
