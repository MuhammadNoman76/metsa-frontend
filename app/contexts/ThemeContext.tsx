"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark"); // Default to dark
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Get system theme
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Set theme and save to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);

      // Apply theme logic moved here
      const root = document.documentElement;
      const resolved = newTheme === "system" ? getSystemTheme() : newTheme;

      // Remove both classes first
      root.classList.remove("light", "dark");
      // Add the resolved theme class
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      // Update resolved theme state
      setResolvedTheme(resolved);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Apply theme to document (moved inside useEffect)
    const applyTheme = (themeToApply: Theme) => {
      const root = document.documentElement;
      const resolved =
        themeToApply === "system" ? getSystemTheme() : themeToApply;

      // Remove both classes first
      root.classList.remove("light", "dark");
      // Add the resolved theme class
      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      // Update resolved theme state
      setResolvedTheme(resolved);
    };

    // Get saved theme or default to dark
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    setThemeState(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);

    // Add mounted class for transitions
    document.documentElement.classList.add("mounted");

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = localStorage.getItem("theme") as Theme;
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!mounted) {
    // Return null during SSR to avoid hydration mismatch
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
