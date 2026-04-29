import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/inventory")({
  component: InventoryPage,
});

const stock = [
  { name: "Basmati Rice", unit: "kg", current: 4, min: 10, vendor: "Patel Foods", status: "Low" },
  { name: "Paneer", unit: "kg", current: 1.2, min: 3, vendor: "Dairy Direct", status: "Low" },
  { name: "Chicken Breast", unit: "kg", current: 2.5, min: 5, vendor: "Fresh Meats", status: "Low" },
  { name: "Onions", unit: "kg", current: 22, min: 10, vendor: "Local Mandi", status: "OK" },
  { name: "Tomatoes", unit: "kg", current: 18, min: 8, vendor: "Local Mandi", status: "OK" },
  { name: "Garam Masala", unit: "kg", current: 0.8, min: 0.5, vendor: "Spice Co.", status: "OK" },
  { name: "Cooking Oil", unit: "L", current: 14, min: 10, vendor: "Patel Foods", status: "OK" },
];

function InventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Stock" title="Inventory" description="Raw materials, vendors, auto deduction and waste tracking."
        primaryAction={{ label: "New Purchase" }}/>
      <StatGrid stats={[
        { label: "SKUs Tracked", value: "142" },
        { label: "Low Stock", value: "8", tone: "warning" },
        { label: "Active Vendors", value: "24" },
        { label: "Waste (week)", value: "$184", tone: "warning" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">Item</th>
                <th className="py-2 px-3 font-medium">Current</th>
                <th className="py-2 px-3 font-medium">Min</th>
                <th className="py-2 px-3 font-medium">Vendor</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3"/>
              </tr>
            </thead>
            <tbody>
              {stock.map(s => (
                <tr key={s.name} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3 font-medium">{s.name}</td>
                  <td className="py-2 px-3">{s.current} {s.unit}</td>
                  <td className="py-2 px-3 text-muted-foreground">{s.min} {s.unit}</td>
                  <td className="py-2 px-3">{s.vendor}</td>
                  <td className="py-2 px-3">
                    <Badge className={s.status === "Low" ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"}>{s.status}</Badge>
                  </td>
                  <td className="py-2 px-3 text-right"><Button variant="ghost" size="sm">Reorder</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Raw materials stock",
          "Purchase entries",
          "Vendor management",
          "Auto stock deduction",
          "Low stock alerts",
          "Waste tracking",
        ]}/>
      </SectionCard>
    </div>
  );
}
