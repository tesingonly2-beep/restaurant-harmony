import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChefHat, ShieldCheck, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Saffron Restaurant ERP" },
      { name: "description", content: "Restaurant ERP platform — Super Admin and Restaurant Admin portals." },
    ],
  }),
  component: LoginPage,
});

type Role = "super" | "admin";

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: role === "super" ? "/super-admin" : "/admin" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div
        className="relative hidden lg:flex flex-col justify-between p-12 text-primary-foreground overflow-hidden"
        style={{ background: "var(--gradient-warm)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <ChefHat className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold text-xl tracking-tight">Saffron ERP</div>
            <div className="text-xs uppercase tracking-widest opacity-80">Restaurant Operating System</div>
          </div>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Run every table, ticket and outlet — from one warm dashboard.
          </h1>
          <p className="mt-4 text-primary-foreground/85">
            POS, KDS, inventory, staff, CRM and finance — built for restaurants that want to grow without the chaos.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-4 text-center text-sm">
          {[
            { v: "12K+", l: "Restaurants" },
            { v: "98.9%", l: "Uptime" },
            { v: "24/7", l: "Support" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-white/10 backdrop-blur p-3">
              <div className="text-lg font-semibold">{s.v}</div>
              <div className="text-[11px] uppercase tracking-wider opacity-80">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <Card className="w-full max-w-md p-8 border-border/60 shadow-[var(--shadow-soft)]">
          <div className="text-xs uppercase tracking-widest text-primary font-medium">Welcome back</div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">Sign in to your portal</h2>
          <p className="mt-1 text-sm text-muted-foreground">Choose your role to continue (mock login).</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <RoleCard
              active={role === "super"}
              onClick={() => setRole("super")}
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Super Admin"
              subtitle="Platform owner"
            />
            <RoleCard
              active={role === "admin"}
              onClick={() => setRole("admin")}
              icon={<Store className="h-5 w-5" />}
              title="Restaurant Admin"
              subtitle="Owner / Manager"
            />
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={role === "super" ? "owner@saffron.app" : "manager@restaurant.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" defaultValue="demo1234" />
            </div>
            <Button type="submit" className="w-full shadow-[var(--shadow-warm)]" size="lg">
              Continue to {role === "super" ? "Super Admin" : "Admin"} Portal
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Demo build · No authentication backend yet
          </p>
        </Card>
      </div>
    </div>
  );
}

function RoleCard({
  active, onClick, icon, title, subtitle,
}: {
  active: boolean; onClick: () => void; icon: React.ReactNode; title: string; subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left rounded-xl border p-4 transition-all",
        active
          ? "border-primary bg-primary/5 shadow-[var(--shadow-warm)]"
          : "border-border hover:border-primary/40 bg-card"
      )}
    >
      <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center mb-2",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        {icon}
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
    </button>
  );
}
