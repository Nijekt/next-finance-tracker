import Header from "@/components/Header";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Finance Tracker",
  description: "Finance Tracker created by Nikita Snizhko",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
