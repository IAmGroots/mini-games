import { Github, Heart, Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40 backdrop-blur-sm py-8 mt-16">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Gamepad2 className="h-4 w-4 text-primary" />
          <span>ArcadeHub &copy; {new Date().getFullYear()}</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            Crafted with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline animate-pulse" /> for gamers
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="hidden sm:inline-block">React 18 &bull; Vite &bull; Tailwind CSS &bull; TypeScript</span>
          <a
            href="https://github.com/IAmGroots/mini-games"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/70 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all hover:bg-accent/50"
          >
            <Github className="h-4 w-4" />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
