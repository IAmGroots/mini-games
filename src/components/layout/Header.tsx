import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 shadow-md shadow-violet-500/25 group-hover:shadow-glow transition-all duration-300">
            <Gamepad2 className="h-5 w-5 text-white animate-float" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg md:text-xl tracking-tight flex items-center gap-1.5">
              <span className="text-foreground">Arcade</span>
              <span className="text-gradient">Hub</span>
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest -mt-1 hidden sm:inline">
              Mini Games
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {!isHome && (
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex rounded-xl font-medium text-muted-foreground hover:text-foreground"
              >
                All Games
              </Button>
            </Link>
          )}

          <Badge variant="arcade" className="hidden sm:flex items-center gap-1 py-1 px-3">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>6 Games Ready</span>
          </Badge>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-xl border-border/80 hover:border-primary/50 relative overflow-hidden transition-all duration-300 shadow-sm"
            title="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 text-amber-500 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 text-violet-400 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
