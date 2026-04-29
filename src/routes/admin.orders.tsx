import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersPage,
});

const orders = [
  { id: "#A-2041", channel: "Dine-in", table: "T-12", customer: "Walk-in", items: 4, total: "$48.20", status: "Preparing", time: "5 min" },
  { id: "#A-2040", channel: "Dine-in", table: "T-04", customer: "Walk-in", items: 2, total: "$22.50", status: "Served", time: "12 min" },
  { id: "#A-2039", channel: "Takeaway", table: "—", customer: "M. Patel", items: 6, total: "$71.10", status: "Ready", time: "8 min" },
  { id: "#A-2038", channel: "Dine-in", table: "T-08", customer: "Walk-in", items: 3, total: "$34.00", status: "Preparing", time: "3 min" },
  { id: "#A-2037", channel: "Delivery", table: "—", customer: "S. Khan", items: 5, total: "$62.40", status: "Out for delivery", time: "20 min" },
  { id: "#A-2036", channel: "Online", table: "—", customer: "via UberEats", items: 2, total: "$28.50", status: "Confirmed", time: "1 min" },
];

const channels = ["All", "Dine-in", "Takeaway", "Delivery", "Online"];

function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Operations" title="Orders" description="All orders across dine-in, takeaway, delivery and online channels."/>
      <StatGrid stats={[
        { label: "Today", value: "184" },
        { label: "Pending", value: "12", tone: "warning" },
        { label: "Avg Prep Time", value: "14m", tone: "primary" },
        { label: "Cancellations", value: "3" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {channels.map(c => <Button key={c} size="sm" variant={c === "All" ? "default" : "outline"}>{c}</Button>)}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">Order</th>
                <th className="py-2 px-3 font-medium">Channel</th>
                <th className="py-2 px-3 font-medium">Table / Customer</th>
                <th className="py-2 px-3 font-medium">Items</th>
                <th className="py-2 px-3 font-medium">Total</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Time</th>
                <th className="py-2 px-3"/>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3 font-mono text-xs">{o.id}</td>
                  <td className="py-2 px-3"><Badge variant="secondary">{o.channel}</Badge></td>
                  <td className="py-2 px-3">{o.table !== "—" ? o.table : o.customer}</td>
                  <td className="py-2 px-3">{o.items}</td>
                  <td className="py-2 px-3 font-medium">{o.total}</td>
                  <td className="py-2 px-3">
                    <Badge className={
                      o.status === "Served" ? "bg-success text-success-foreground"
                      : o.status === "Ready" ? "bg-primary text-primary-foreground"
                      : "bg-warning text-warning-foreground"
                    }>{o.status}</Badge>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{o.time}</td>
                  <td className="py-2 px-3 text-right"><Button variant="ghost" size="sm">View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionCard title="Includes">
        <div className="text-sm text-muted-foreground">
          Dine-in · Takeaway · Delivery · Online order sync · Status tracking · Cancellation & refund flow
        </div>
      </SectionCard>
    </div>
  );
}
