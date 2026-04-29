import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  TrendingUp, TrendingDown, ShoppingBag, DollarSign, Users, Clock,
  AlertTriangle, ChefHat, Utensils, ArrowUpRight, Flame,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Spice Route" }] }),
  component: AdminDashboard,
});

const salesData = [
  { h: "10a", sales: 120, orders: 8 },
  { h: "11a", sales: 240, orders: 14 },
  { h: "12p", sales: 480, orders: 28 },
  { h: "1p", sales: 620, orders: 36 },
  { h: "2p", sales: 410, orders: 22 },
  { h: "3p", sales: 280, orders: 16 },
  { h: "4p", sales: 220, orders: 12 },
  { h: "5p", sales: 360, orders: 19 },
  { h: "6p", sales: 540, orders: 30 },
  { h: "7p", sales: 720, orders: 42 },
  { h: "8p", sales: 680, orders: 38 },
  { h: "9p", sales: 380, orders: 21 },
];

const channelData = [
  { name: "Dine-in", value: 48, color: "var(--color-primary)" },
  { name: "Takeaway", value: 28, color: "var(--color-accent)" },
  { name: "Delivery", value: 24, color: "var(--color-warning)" },
];

const topItems = [
  { name: "Butter Chicken", qty: 64, revenue: 832 },
  { name: "Veg Biryani", qty: 52, revenue: 624 },
  { name: "Paneer Tikka", qty: 41, revenue: 492 },
  { name: "Garlic Naan", qty: 38, revenue: 152 },
  { name: "Mango Lassi", qty: 36, revenue: 180 },
];

const orders = [
  { id: "#A-2041", table: "T-12", items: 4, total: "$48.20", status: "Preparing", time: "2m ago" },
  { id: "#A-2040", table: "T-04", items: 2, total: "$22.50", status: "Served", time: "5m ago" },
  { id: "#A-2039", table: "Take", items: 6, total: "$71.10", status: "Ready", time: "6m ago" },
  { id: "#A-2038", table: "T-08", items: 3, total: "$34.00", status: "Preparing", time: "8m ago" },
  { id: "#A-2037", table: "Delivery", items: 5, total: "$62.40", status: "Out", time: "11m ago" },
];

const statusColor = (s: string) =>
  s === "Served" ? "bg-success text-success-foreground"
  : s === "Ready" ? "bg-primary text-primary-foreground"
  : s === "Out" ? "bg-accent text-accent-foreground"
  : "bg-warning text-warning-foreground";

function AdminDashboard() {
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
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-lg">
              <Utensils className="h-4 w-4 mr-1.5" /> Open POS
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              View Reports <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* KPI cards with mini-trends */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Today's Sales", value: "$3,842", delta: "+18.2%", up: true, icon: DollarSign, tone: "primary" },
          { label: "Orders", value: "184", delta: "+24", up: true, icon: ShoppingBag, tone: "accent" },
          { label: "Avg Order", value: "$20.88", delta: "+4.1%", up: true, icon: TrendingUp, tone: "success" },
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
              <div className="h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id={`g-${k.label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2} fill={`url(#g-${k.label})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Sales chart + Channel breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold">Sales Today</h3>
              <p className="text-xs text-muted-foreground">Hourly revenue & orders</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">Today</Badge>
              <Badge variant="outline">7d</Badge>
              <Badge variant="outline">30d</Badge>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ left: -10, right: 5, top: 5, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="h" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <h3 className="font-semibold">Order Channels</h3>
          <p className="text-xs text-muted-foreground mb-2">Mix across today</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelData} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3} stroke="none">
                  {channelData.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {channelData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                  <span>{c.name}</span>
                </div>
                <span className="font-semibold">{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Live orders + top items + alerts */}
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
                <div className="text-sm font-semibold">{o.total}</div>
                <Badge className={statusColor(o.status)}>{o.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-border/60 p-5">
          <h3 className="font-semibold">Top Items</h3>
          <p className="text-xs text-muted-foreground mb-3">Best sellers today</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topItems} layout="vertical" margin={{ left: 0, right: 10 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={90} stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="qty" radius={[0, 6, 6, 0]} fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Inventory alerts strip */}
      <Card className="border-border/60 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Inventory Alerts
            </h3>
            <p className="text-xs text-muted-foreground">Items running low — reorder soon</p>
          </div>
          <Button variant="outline" size="sm">View Inventory</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { item: "Basmati Rice", left: 4, min: 10, unit: "kg" },
            { item: "Paneer", left: 1.2, min: 3, unit: "kg" },
            { item: "Chicken Breast", left: 2.5, min: 5, unit: "kg" },
            { item: "Mango Lassi", left: 0.8, min: 2, unit: "L" },
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
  );
}
