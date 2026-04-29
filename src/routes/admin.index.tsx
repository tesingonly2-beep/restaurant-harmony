import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard } from "@/components/PageScaffold";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Spice Route" }] }),
  component: AdminDashboard,
});

const orders = [
  { id: "#A-2041", table: "T-12", items: 4, total: "$48.20", status: "Preparing" },
  { id: "#A-2040", table: "T-04", items: 2, total: "$22.50", status: "Served" },
  { id: "#A-2039", table: "Take", items: 6, total: "$71.10", status: "Ready" },
  { id: "#A-2038", table: "T-08", items: 3, total: "$34.00", status: "Preparing" },
  { id: "#A-2037", table: "Delivery", items: 5, total: "$62.40", status: "Out for delivery" },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Today · Spice Route"
        title="Good evening, Priya"
        description="Here's how your restaurant is performing today."
      />

      <StatGrid stats={[
        { label: "Today's Sales", value: "$3,842", hint: "+18% vs yesterday", tone: "success" },
        { label: "Orders", value: "184", hint: "12 pending", tone: "primary" },
        { label: "Avg Order Value", value: "$20.88" },
        { label: "Profit Snapshot", value: "$1,140", hint: "29.6% margin", tone: "success" },
      ]}/>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Live Orders" description="Current queue across channels"
          action={<Badge variant="secondary">{orders.length} active</Badge>}>
          <div className="divide-y divide-border/60">
            {orders.map(o => (
              <div key={o.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="text-sm font-mono text-muted-foreground w-16">{o.id}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{o.table}</div>
                  <div className="text-xs text-muted-foreground">{o.items} items · {o.total}</div>
                </div>
                <Badge className={
                  o.status === "Served" ? "bg-success text-success-foreground"
                  : o.status === "Ready" ? "bg-primary text-primary-foreground"
                  : "bg-warning text-warning-foreground"
                }>{o.status}</Badge>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Inventory Alerts" description="Items running low">
          <div className="space-y-3">
            {[
              { item: "Basmati Rice", left: "4 kg", min: "10 kg" },
              { item: "Paneer", left: "1.2 kg", min: "3 kg" },
              { item: "Chicken Breast", left: "2.5 kg", min: "5 kg" },
              { item: "Mango Lassi mix", left: "0.8 L", min: "2 L" },
            ].map(i => (
              <div key={i.item} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-warning/15 text-warning flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4"/>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{i.item}</div>
                  <div className="text-xs text-muted-foreground">Min {i.min}</div>
                </div>
                <div className="text-sm font-medium text-warning">{i.left}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Staff Today" description="Attendance & shift">
          <div className="space-y-3">
            {[
              { name: "Ravi (Chef)", status: "On shift", time: "10:00 → 22:00" },
              { name: "Anita (Waiter)", status: "On shift", time: "12:00 → 22:00" },
              { name: "Suresh (Cashier)", status: "On break", time: "08:00 → 16:00" },
              { name: "Neha (Manager)", status: "On shift", time: "09:00 → 21:00" },
            ].map(s => (
              <div key={s.name} className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground"/>
                <div className="flex-1">
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.time}</div>
                </div>
                <Badge variant={s.status === "On shift" ? "default" : "secondary"}
                  className={s.status === "On shift" ? "bg-success text-success-foreground" : ""}>
                  {s.status}
                </Badge>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
