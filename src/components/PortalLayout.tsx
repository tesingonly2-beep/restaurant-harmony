import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { ChefHat, LogOut, Search, Bell, ChevronRight } from "lucide-react";
import type { NavItem } from "@/lib/portal-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Props = {
  brand: string;
  subtitle: string;
  nav: NavItem[];
  user: { name: string; role: string; initials: string };
};

export function PortalLayout({ brand, subtitle, nav, user }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const current = nav.find((n) => n.url === pathname) ?? nav[0];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className="hidden md:flex w-64 flex-col text-sidebar-foreground"
        style={{ background: "var(--gradient-sidebar)" }}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ChefHat className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">{brand}</div>
            <div className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">
              {subtitle}
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.url;
            const Icon = item.icon;
            return (
              <Link
                key={item.url}
                to={item.url}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{item.title}</span>
                {active && <ChevronRight className="h-3.5 w-3.5" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-[11px] text-sidebar-foreground/60 truncate">{user.role}</div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => navigate({ to: "/" })}
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-card/80 backdrop-blur px-6 py-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{current.title}</h1>
            {current.description && (
              <p className="text-xs text-muted-foreground">{current.description}</p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <form
              className="relative hidden lg:block"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const q = String(fd.get("q") ?? "").trim();
                if (q) import("sonner").then(({ toast }) => toast(`Searching for "${q}"…`));
              }}
            >
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input name="q" placeholder="Search…" className="pl-8 w-64 bg-background" />
            </form>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() =>
                import("sonner").then(({ toast }) =>
                  toast("3 new notifications", { description: "2 orders pending · 1 low stock alert" })
                )
              }
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
