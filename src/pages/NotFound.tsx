import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Gamepad2, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden selection:bg-primary/20">
      {/* Background ambient glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-violet-500/30 mb-5 animate-bounce-subtle">
          <Gamepad2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
          <span>Error 404 &bull; Stage Missing</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-3">
          Game <span className="text-gradient">Not Found</span>
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Looks like you took a wrong warp pipe! The mini-game or page you are searching for does not exist in this arcade.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1">
            <Button className="w-full rounded-xl font-bold gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full rounded-xl font-bold gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>All Games</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
