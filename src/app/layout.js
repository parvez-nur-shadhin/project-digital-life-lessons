import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../Component/Navbar";
import Footer from "@/Component/Footer";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digital Life Lesson",
  description: "Created By Parvez Nur Shadhin",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />

        <ToastContainer />
        <Toaster />
      </body>
    </html>
  );
}
