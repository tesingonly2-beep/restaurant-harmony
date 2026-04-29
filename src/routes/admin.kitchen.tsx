import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/kitchen")({
  component: KitchenPage,
});

const tickets = [
  { id: "KOT-4521", table: "T-12", items: ["Butter Chicken", "Garlic Naan x2", "Mango Lassi"], elapsed: "4:12", status: "preparing" },
  { id: "KOT-4520", table: "T-04", items: ["Paneer Tikka", "Veg Biryani"], elapsed: "8:45", status: "preparing" },
  { id: "KOT-4519", table: "Take", items: ["Chicken 65", "Lamb Biryani x2", "Tandoori Roti x4"], elapsed: "11:20", status: "ready" },
  { id: "KOT-4518", table: "T-08", items: ["Veg Biryani", "Gulab Jamun"], elapsed: "2:05", status: "new" },
  { id: "KOT-4517", table: "Delivery", items: ["Butter Chicken", "Naan x3"], elapsed: "14:38", status: "ready" },
  { id: "KOT-4516", table: "T-02", items: ["Masala Chai x4"], elapsed: "1:22", status: "new" },
];

const tone = (s: string) => s === "ready" ? "border-success/50 bg-success/5" : s === "preparing" ? "border-primary/50 bg-primary/5" : "border-warning/50 bg-warning/5";
const badgeClass = (s: string) => s === "ready" ? "bg-success text-success-foreground" : s === "preparing" ? "bg-primary text-primary-foreground" : "bg-warning text-warning-foreground";

function KitchenPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="KDS" title="Kitchen Display" description="Live ticket queue with prep time tracking."/>
      <StatGrid stats={[
        { label: "Active Tickets", value: "12", tone: "primary" },
        { label: "Avg Prep", value: "14m", tone: "success" },
        { label: "Late (>20m)", value: "1", tone: "warning" },
        { label: "Completed Today", value: "168" },
      ]}/>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map(t => (
          <Card key={t.id} className={`p-4 border-2 ${tone(t.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold font-mono text-sm">{t.id}</div>
                <div className="text-xs text-muted-foreground">{t.table}</div>
              </div>
              <Badge className={badgeClass(t.status)}>{t.elapsed}</Badge>
            </div>
            <ul className="space-y-1.5 text-sm">
              {t.items.map((it, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"/>{it}
                </li>
              ))}
            </ul>
            <Button size="sm" className="w-full mt-3" variant={t.status === "ready" ? "default" : "outline"}>
              {t.status === "ready" ? "Mark Served" : "Mark Ready"}
            </Button>
          </Card>
        ))}
      </div>

      <SectionCard title="Capabilities">
        <FeatureList features={["KDS screen", "Order queue", "Ready status", "Preparation time tracking", "Course-wise firing", "Recall ticket"]}/>
      </SectionCard>
    </div>
  );
}
