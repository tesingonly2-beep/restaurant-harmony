import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { formatINR } from "@/lib/currency";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

const top = [
  { name: "Butter Chicken", sold: 184, rev: 213440 },
  { name: "Lamb Biryani", sold: 142, rev: 181760 },
  { name: "Garlic Naan", sold: 412, rev: 98880 },
  { name: "Veg Biryani", sold: 98, rev: 90160 },
  { name: "Mango Lassi", sold: 156, rev: 56160 },
];

const hours = [10, 14, 22, 38, 64, 82, 71, 58, 92, 124, 138, 96];
const labels = ["11a","12p","1p","2p","3p","4p","5p","6p","7p","8p","9p","10p"];

function ReportsPage() {
  const max = Math.max(...hours);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Insights" title="Reports" description="Sales, performance, inventory usage and peak hours."/>
      <StatGrid stats={[
        { label: "Sales (week)", value: formatINR(2113600) },
        { label: "Orders (week)", value: "1,284", tone: "primary" },
        { label: "Avg Ticket", value: formatINR(1646), tone: "success" },
        { label: "Peak Hour", value: "8:00 PM" },
      ]}/>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5 border-border/60">
          <div className="font-medium mb-4">Peak Hours · Today</div>
          <div className="flex items-end gap-2 h-40">
            {hours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md" style={{ height: `${(h / max) * 100}%`, background: "var(--gradient-warm)" }}/>
                <div className="text-[10px] text-muted-foreground">{labels[i]}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 border-border/60">
          <div className="font-medium mb-4">Best Selling Items</div>
          <div className="space-y-3">
            {top.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-sm">
                <span>{t.name}</span>
                <span className="text-muted-foreground">{t.sold} sold · <span className="font-medium text-foreground">{formatINR(t.rev)}</span></span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <SectionCard title="All Reports">
        <FeatureList features={[
          "Best selling items",
          "Sales by date",
          "Staff performance",
          "Inventory usage",
          "Peak hours analysis",
          "Channel mix",
          "Discount impact",
          "Refund analysis",
        ]}/>
      </SectionCard>
    </div>
  );
}
