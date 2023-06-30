import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "material-icons/iconfont/material-icons.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Booked",
  description: "Discover and Book Exciting Events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
