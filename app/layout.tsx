import "./globals.css";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { ItemProvider } from "./context/appContext";
import Head from "next/head";

export const metadata = {
  title: "Genesis",
  description: "an offline shopping list manager app",
  manifest: "./manifest.json",
  icons: {
    // Primary favicon
    icon: [
      {
        url: "/favicon.ico", // Standard ICO file
        sizes: "32x32",
      },
      {
        url: "/favicon.svg", // Modern SVG file
        type: "image/svg+xml",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffb343" />
      </Head>
      <body className="w-svw h-svh m-0">
        <ItemProvider>
          <div className="flex items-center justify-between mb-10 sticky inset-0 z-20 bg-background-white ">
            <Navbar />
            <Link href={"/"} className="m-auto">
              <h1 className="font-open-sans text-[38px] font-extrabold text-brand text-center block w-fit m-auto">
                Genesis
              </h1>
            </Link>
          </div>
          <main className="w-full max-w-[1200px] m-auto pl-3 pr-3">
            {children}
          </main>
        </ItemProvider>
      </body>
    </html>
  );
}
