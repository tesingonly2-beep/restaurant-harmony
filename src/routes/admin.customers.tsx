import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersPage,
});

const customers = [
  { name: "Meera Patel", visits: 28, spent: "$1,420", points: 420, tier: "Gold" },
  { name: "Sahil Khan", visits: 19, spent: "$980", points: 290, tier: "Silver" },
  { name: "Lakshmi P.", visits: 41, spent: "$2,180", points: 640, tier: "Platinum" },
  { name: "Arjun Mehta", visits: 8, spent: "$310", points: 95, tier: "Bronze" },
  { name: "Riya Singh", visits: 22, spent: "$1,140", points: 340, tier: "Silver" },
];

const tierColor = (t: string) =>
  t === "Platinum" ? "bg-foreground text-background"
  : t === "Gold" ? "bg-warning text-warning-foreground"
  : t === "Silver" ? "bg-muted text-foreground"
  : "bg-secondary text-secondary-foreground";

function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="CRM" title="Customers" description="Database, loyalty points, memberships and feedback."
        primaryAction={{ label: "Add Customer" }}/>
      <StatGrid stats={[
        { label: "Total Customers", value: "2,841" },
        { label: "Loyalty Members", value: "1,240", tone: "primary" },
        { label: "Avg LTV", value: "$284", tone: "success" },
        { label: "NPS", value: "62", tone: "success" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">Customer</th>
                <th className="py-2 px-3 font-medium">Visits</th>
                <th className="py-2 px-3 font-medium">Total Spent</th>
                <th className="py-2 px-3 font-medium">Loyalty Points</th>
                <th className="py-2 px-3 font-medium">Tier</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.name} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3 font-medium">{c.name}</td>
                  <td className="py-2 px-3">{c.visits}</td>
                  <td className="py-2 px-3">{c.spent}</td>
                  <td className="py-2 px-3">{c.points}</td>
                  <td className="py-2 px-3"><Badge className={tierColor(c.tier)}>{c.tier}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Customer database",
          "Loyalty points",
          "Memberships",
          "Feedback",
          "Birthday offers",
          "Segments & campaigns",
        ]}/>
      </SectionCard>
    </div>
  );
}
