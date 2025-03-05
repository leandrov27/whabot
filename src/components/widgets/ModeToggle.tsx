"use client"

// next
import { useTheme } from "next-themes"

// shadcn-ui
import { Button } from "../ui/button";

// ----------------------------------------------------------------------

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeMode = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <Button suppressHydrationWarning className="absolute -top-9 right-3" variant="outline" size="icon" onClick={handleThemeMode}>
      {theme === "light" ? "☀️" : "🌙"}
    </Button>
  )
}
