import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/super-admin/billing")({
  component: BillingPage,
});

const plans = [
  { name: "Basic", price: "$49", subs: 642, features: ["1 branch", "5 users", "1k orders/mo", "Email support"] },
  { name: "Pro", price: "$249", subs: 528, features: ["5 branches", "30 users", "Unlimited orders", "KDS + Inventory", "Priority support"], featured: true },
  { name: "Enterprise", price: "$899", subs: 114, features: ["Unlimited branches", "Unlimited users", "Custom integrations", "SLA + Dedicated CSM"] },
];

const invoices = [
  { id: "INV-10482", restaurant: "Bombay Bistro", amount: "$899.00", status: "Paid", date: "Apr 28, 2026" },
  { id: "INV-10481", restaurant: "The Spice Route", amount: "$249.00", status: "Paid", date: "Apr 27, 2026" },
  { id: "INV-10480", restaurant: "Naan Stop", amount: "$49.00", status: "Failed", date: "Apr 27, 2026" },
  { id: "INV-10479", restaurant: "Royal Thali", amount: "$249.00", status: "Paid", date: "Apr 26, 2026" },
  { id: "INV-10478", restaurant: "Curry Kitchen", amount: "$0.00", status: "Trial", date: "Apr 25, 2026" },
];

function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subscriptions"
        title="Billing & Plans"
        description="Manage subscription tiers, invoices, trials, and auto-renew settings."
        primaryAction={{ label: "Create Plan" }}
      />

      <StatGrid stats={[
        { label: "MRR", value: "$148,920", tone: "primary" },
        { label: "Active Subscribers", value: "1,284", tone: "success" },
        { label: "Trials", value: "92" },
        { label: "Failed Payments (24h)", value: "12", tone: "warning" },
      ]}/>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name} className={`p-6 border-border/60 ${p.featured ? "ring-2 ring-primary shadow-[var(--shadow-warm)]" : ""}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{p.name}</div>
              {p.featured && <Badge>Most Popular</Badge>}
            </div>
            <div className="text-3xl font-semibold tracking-tight">{p.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <div className="text-xs text-muted-foreground mt-1">{p.subs} subscribers</div>
            <ul className="mt-4 space-y-2 text-sm">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-success"/>{f}</li>
              ))}
            </ul>
            <Button variant={p.featured ? "default" : "outline"} className="w-full mt-5">Edit Plan</Button>
          </Card>
        ))}
      </div>

      <SectionCard title="Recent Invoices" description="Last billing activity">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">Invoice</th>
                <th className="py-2 px-3 font-medium">Restaurant</th>
                <th className="py-2 px-3 font-medium">Amount</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(i => (
                <tr key={i.id} className="border-b border-border/40">
                  <td className="py-2 px-3 font-mono text-xs">{i.id}</td>
                  <td className="py-2 px-3">{i.restaurant}</td>
                  <td className="py-2 px-3 font-medium">{i.amount}</td>
                  <td className="py-2 px-3">
                    <Badge className={
                      i.status === "Paid" ? "bg-success text-success-foreground"
                      : i.status === "Failed" ? "bg-destructive text-destructive-foreground"
                      : "bg-warning text-warning-foreground"
                    }>{i.status}</Badge>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">{i.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Billing Capabilities">
        <FeatureList features={[
          "Create plans (Basic / Pro / Enterprise)",
          "Monthly / yearly billing",
          "Invoice generation",
          "Payment history",
          "Trial activation",
          "Upgrade / downgrade plans",
          "Auto-renew controls",
          "Tax & VAT handling",
        ]}/>
      </SectionCard>
    </div>
  );
}
