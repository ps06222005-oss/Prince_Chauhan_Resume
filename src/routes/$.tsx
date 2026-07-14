import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/$")({
  component: NotFound,
  head: () => ({
    meta: [
      { title: "Page not found — Prince Chauhan" },
      { name: "description", content: "The page you're looking for doesn't exist." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-[#050816] px-6 text-foreground">
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="text-center">
        <p className="font-display text-[8rem] leading-none font-bold text-gradient">404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">This page took a wrong turn.</h1>
        <p className="mt-3 max-w-md mx-auto text-muted-foreground">
          The URL you followed doesn't match any section of this portfolio.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-ring hover:scale-[1.03] transition-transform">
            <Home size={14} /> Back home
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover:bg-white/10"
          >
            <ArrowLeft size={14} /> Go back
          </button>
        </div>
      </div>
    </main>
  );
}
