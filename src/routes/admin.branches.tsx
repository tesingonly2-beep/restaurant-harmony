import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store } from "lucide-react";
import { formatINR } from "@/lib/currency";

export const Route = createFileRoute("/admin/branches")({
  component: BranchesPage,
});

const branches = [
  { name: "Spice Route — Downtown", city: "Mumbai", sales: 307360, orders: 184, status: "Open" },
  { name: "Spice Route — Bandra", city: "Mumbai", sales: 233120, orders: 132, status: "Open" },
  { name: "Spice Route — Andheri", city: "Mumbai", sales: 131200, orders: 78, status: "Open" },
];

function BranchesPage() {
  const total = branches.reduce((s, b) => s + b.sales, 0);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Multi-outlet" title="Branches" description="Compare branches, centralize reports, transfer stock."
        primaryAction={{ label: "Add Branch" }}/>
      <StatGrid stats={[
        { label: "Active Branches", value: String(branches.length) },
        { label: "Total Sales (today)", value: formatINR(total), tone: "primary" },
        { label: "Top Branch", value: "Downtown", tone: "success" },
        { label: "Stock Transfers (week)", value: "12" },
      ]}/>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((b) => (
          <Card key={b.name} className="p-5 border-border/60">
            <div className="flex items-start justify-between">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-warm)" }}>
                <Store className="h-5 w-5"/>
              </div>
              <Badge className="bg-success text-success-foreground">{b.status}</Badge>
            </div>
            <div className="mt-3 font-semibold">{b.name}</div>
            <div className="text-xs text-muted-foreground">{b.city}</div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border/60">
              <div>
                <div className="text-xs text-muted-foreground">Today's Sales</div>
                <div className="font-semibold">{formatINR(b.sales)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Orders</div>
                <div className="font-semibold">{b.orders}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <SectionCard title="Capabilities">
        <FeatureList features={["Compare branches", "Centralized reports", "Transfer stock", "Per-branch staff", "Per-branch menu", "Consolidated billing"]}/>
      </SectionCard>
    </div>
  );
}
