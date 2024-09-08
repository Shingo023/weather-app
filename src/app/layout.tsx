import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar";
import { Metadata } from "next";
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
