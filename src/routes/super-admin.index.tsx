import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard } from "@/components/PageScaffold";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/super-admin/")({
  head: () => ({ meta: [{ title: "Super Admin Dashboard — Saffron ERP" }] }),
  component: SuperAdminDashboard,
});

const recentSignups = [
  { name: "The Spice Route", plan: "Pro", branches: 3, status: "Active", mrr: "$249" },
  { name: "Bombay Bistro", plan: "Enterprise", branches: 12, status: "Active", mrr: "$899" },
  { name: "Curry Kitchen", plan: "Basic", branches: 1, status: "Trial", mrr: "$0" },
  { name: "Tandoor Nights", plan: "Pro", branches: 2, status: "Active", mrr: "$249" },
  { name: "Naan Stop", plan: "Basic", branches: 1, status: "Suspended", mrr: "$49" },
];

function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform Overview"
        title="Welcome back, Aarav"
        description="Here's how Saffron ERP is performing across all restaurants today."
      />

      <StatGrid
        stats={[
          { label: "Active Restaurants", value: "1,284", hint: "+42 this week", tone: "success" },
          { label: "Monthly Recurring Revenue", value: "$148,920", hint: "+12.4% MoM", tone: "primary" },
          { label: "Orders Processed (24h)", value: "92,471", hint: "Across all tenants" },
          { label: "Open Support Tickets", value: "37", hint: "8 high priority", tone: "warning" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Recent Restaurants"
          description="Latest signups and status changes"
          action={<Badge variant="secondary">Last 7 days</Badge>}
        >
          <div className="divide-y divide-border/60">
            {recentSignups.map((r) => (
              <div key={r.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.plan} · {r.branches} branch{r.branches > 1 ? "es" : ""}</div>
                </div>
                <div className="text-sm font-medium">{r.mrr}</div>
                <Badge
                  variant={r.status === "Active" ? "default" : r.status === "Trial" ? "secondary" : "destructive"}
                  className={r.status === "Active" ? "bg-success text-success-foreground" : ""}
                >
                  {r.status}
                </Badge>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Growth" description="New signups vs churn">
          <div className="space-y-4">
            {[
              { label: "New signups", value: 142, max: 200, tone: "bg-primary" },
              { label: "Upgrades", value: 38, max: 200, tone: "bg-accent" },
              { label: "Churn", value: 9, max: 200, tone: "bg-destructive" },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="font-medium">{b.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={b.tone} style={{ width: `${(b.value / b.max) * 100}%`, height: "100%" }} />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-border/60 flex items-center gap-2 text-sm text-success">
              <TrendingUp className="h-4 w-4" /> Net growth +133 this month
            </div>
          </div>
        </SectionCard>

        <SectionCard title="System Health" description="Platform status">
          <div className="space-y-3">
            {[
              { label: "API uptime", value: "99.98%", ok: true },
              { label: "Avg POS latency", value: "84ms", ok: true },
              { label: "Failed payments (24h)", value: "12", ok: false },
              { label: "Backup status", value: "Healthy", ok: true },
            ].map((h) => (
              <div key={h.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  {!h.ok && <AlertCircle className="h-3.5 w-3.5 text-warning" />}
                  {h.label}
                </span>
                <span className="font-medium">{h.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
