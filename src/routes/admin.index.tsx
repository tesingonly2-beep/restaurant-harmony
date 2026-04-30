import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, TrendingDown, ShoppingBag, IndianRupee, Users, Clock,
  AlertTriangle, ChefHat, Utensils, ArrowUpRight, Flame, Star, Trophy,
} from "lucide-react";
import { formatINR } from "@/lib/currency";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Spice Route" }] }),
  component: AdminDashboard,
});

const channelData = [
  { name: "Dine-in", value: 48, color: "bg-primary" },
  { name: "Takeaway", value: 28, color: "bg-accent" },
  { name: "Delivery", value: 24, color: "bg-warning" },
];

const topItems = [
  { name: "Butter Chicken", qty: 64, revenue: 66560, emoji: "🍛" },
  { name: "Veg Biryani", qty: 52, revenue: 49920, emoji: "🍚" },
  { name: "Paneer Tikka", qty: 41, revenue: 39360, emoji: "🧀" },
  { name: "Garlic Naan", qty: 38, revenue: 12160, emoji: "🥖" },
  { name: "Mango Lassi", qty: 36, revenue: 14400, emoji: "🥤" },
];

const orders = [
  { id: "#A-2041", table: "T-12", items: 4, total: 3856, status: "Preparing", time: "2m ago" },
  { id: "#A-2040", table: "T-04", items: 2, total: 1800, status: "Served", time: "5m ago" },
  { id: "#A-2039", table: "Take", items: 6, total: 5688, status: "Ready", time: "6m ago" },
  { id: "#A-2038", table: "T-08", items: 3, total: 2720, status: "Preparing", time: "8m ago" },
  { id: "#A-2037", table: "Delivery", items: 5, total: 4992, status: "Out", time: "11m ago" },
];

const statusColor = (s: string) =>
  s === "Served" ? "bg-success text-success-foreground"
  : s === "Ready" ? "bg-primary text-primary-foreground"
  : s === "Out" ? "bg-accent text-accent-foreground"
  : "bg-warning text-warning-foreground";

function AdminDashboard() {
  const navigate = useNavigate();
  const maxQty = Math.max(...topItems.map((t) => t.qty));

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground p-6 sm:p-8 shadow-[var(--shadow-warm)]">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-warning/30 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium mb-3">
              <Flame className="h-3.5 w-3.5" /> Spice Route · Today
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Good evening, Priya 👋</h1>
            <p className="mt-2 text-sm opacity-90 max-w-lg">
              Sales are tracking <span className="font-semibold">+18%</span> ahead of yesterday. 12 orders in the queue, kitchen running smooth.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              onClick={() => navigate({ to: "/admin/pos" })}
            >
              <Utensils className="h-4 w-4 mr-1.5" /> Open POS
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
              onClick={() => navigate({ to: "/admin/reports" })}
            >
              View Reports <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's Sales", value: formatINR(307360), delta: "+18.2%", up: true, icon: IndianRupee, tone: "primary" },
          { label: "Orders", value: "184", delta: "+24", up: true, icon: ShoppingBag, tone: "accent" },
          { label: "Avg Order", value: formatINR(1670), delta: "+4.1%", up: true, icon: TrendingUp, tone: "success" },
          { label: "Profit Margin", value: "29.6%", delta: "-1.2%", up: false, icon: Users, tone: "warning" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="relative overflow-hidden border-border/60 hover:shadow-[var(--shadow-warm)] transition-all">
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center bg-${k.tone}/15 text-${k.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className={`text-xs ${k.up ? "text-success" : "text-destructive"}`}>
                    {k.up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {k.delta}
                  </Badge>
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</div>
                <div className="mt-1 text-3xl font-bold tracking-tight">{k.value}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Visual highlights row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order channel mix */}
        <Card className="border-border/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Order Channels</h3>
              <p className="text-xs text-muted-foreground">Mix across today</p>
            </div>
            <Badge variant="secondary">Today</Badge>
          </div>
          <div className="space-y-4">
            {channelData.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top items leaderboard */}
        <Card className="lg:col-span-2 border-border/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" /> Top Items Today
              </h3>
              <p className="text-xs text-muted-foreground">Best sellers driving revenue</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/admin/menu" })}>
              View Menu
            </Button>
          </div>
          <div className="space-y-3">
            {topItems.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <div className="text-2xl">{t.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium truncate">{t.name}</span>
                      {i === 0 && <Star className="h-3.5 w-3.5 text-warning fill-warning shrink-0" />}
                    </div>
                    <span className="text-sm font-semibold text-primary shrink-0">{formatINR(t.revenue)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(t.qty / maxQty) * 100}%`, background: "var(--gradient-warm)" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 w-14 text-right">{t.qty} sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Live orders + Inventory alerts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Live Orders</h3>
              <p className="text-xs text-muted-foreground">Current queue across channels</p>
            </div>
            <Badge variant="secondary">{orders.length} active</Badge>
          </div>
          <div className="divide-y divide-border/60">
            {orders.map((o) => (
              <div key={o.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ChefHat className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                    <span className="text-sm font-medium">{o.table}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{o.items} items · {o.time}</div>
                </div>
                <div className="text-sm font-semibold">{formatINR(o.total)}</div>
                <Badge className={statusColor(o.status)}>{o.status}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => notify(`Opened ${o.id}`, `${o.table} · ${o.items} items`)}
                >
                  Open
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" /> Low Stock
              </h3>
              <p className="text-xs text-muted-foreground">Reorder soon</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/admin/inventory" })}>
              Inventory
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { item: "Basmati Rice", left: 4, min: 10, unit: "kg" },
              { item: "Paneer", left: 1.2, min: 3, unit: "kg" },
              { item: "Chicken Breast", left: 2.5, min: 5, unit: "kg" },
              { item: "Mango Pulp", left: 0.8, min: 2, unit: "L" },
            ].map((i) => {
              const pct = Math.min(100, (i.left / i.min) * 100);
              return (
                <div key={i.item} className="rounded-xl border border-border/60 p-3 bg-gradient-to-br from-warning/5 to-transparent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{i.item}</span>
                    <Clock className="h-3.5 w-3.5 text-warning" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{i.left}{i.unit} left · min {i.min}{i.unit}</div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
