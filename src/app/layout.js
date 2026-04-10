import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";

import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HomeNest",
  description: "Real Estate Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <NavBar />
          {children}
          <Toaster position="top-center" />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
