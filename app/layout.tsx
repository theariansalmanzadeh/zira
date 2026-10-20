import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/src/shared/context/AuthProvider";
import QueryProvider from "@/src/shared/context/QueryProvider";
import { Toaster } from "@/src/shared/components/ui/Sonner";
import {
    SITE_DESCRIPTION,
    SITE_NAME,
    SITE_URL,
} from "@/src/shared/constants/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className="antialiased"
      >
        <AuthProvider>
          <QueryProvider>
            <main>{children}</main>
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
