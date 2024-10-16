import ReactQueryProvider from "@/app/QueryProvider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <Toaster></Toaster>
            {<Header />}
            {children}
            <Analytics />
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
