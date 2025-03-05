// next
import type { Metadata } from "next";

// shadcn-ui
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// widgets
import WhabotInfoCard from "@/components/widgets/WhabotInfoCard";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col justify-center items-center min-h-screen">
            <WhabotInfoCard />

            {children}
          </div>
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
