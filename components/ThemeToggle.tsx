"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const initial = stored || "dark";
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Activate ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
};

export default ThemeToggle;
