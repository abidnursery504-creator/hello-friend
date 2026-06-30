import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition hover:bg-accent",
        className,
      )}
    >
      <Sun className={cn("size-4 transition-all", theme === "dark" ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")} />
      <Moon className={cn("absolute size-4 transition-all", theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0")} />
    </button>
  );
}
