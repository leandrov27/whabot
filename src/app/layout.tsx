// next
import type { Metadata } from "next";

// shadcn-ui
import { Toaster } from "@/components/ui/sonner";

// styles
import "@/styles/globals.css";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "WhaBot | Astro Labs",
  description: "Developed by @leandro_valdz",
};

// ----------------------------------------------------------------------

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
