import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/super-admin/support")({
  component: SupportPage,
});

const tickets = [
  { id: "TCK-2041", subject: "POS not printing receipts", restaurant: "The Spice Route", priority: "High", status: "Open", age: "2h" },
  { id: "TCK-2040", subject: "Need help with KDS setup", restaurant: "Tandoor Nights", priority: "Medium", status: "In Progress", age: "5h" },
  { id: "TCK-2039", subject: "Invoice didn't generate", restaurant: "Naan Stop", priority: "High", status: "Open", age: "8h" },
  { id: "TCK-2038", subject: "Add custom tax rule", restaurant: "Bombay Bistro", priority: "Low", status: "Waiting", age: "1d" },
];

const leads = [
  { name: "Saffron Dine", source: "Website", stage: "Demo Booked", value: "$249/mo" },
  { name: "Curry Express", source: "Referral", stage: "Negotiation", value: "$899/mo" },
  { name: "Tandoor Hub", source: "Cold Outreach", stage: "Trial", value: "$249/mo" },
];

function SupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Customer Success" title="Support & CRM"
        description="Tickets, chat, leads, and demo requests in one place."
        primaryAction={{ label: "New Ticket" }}/>
      <StatGrid stats={[
        { label: "Open Tickets", value: "37", tone: "warning" },
        { label: "Avg First Response", value: "1h 12m", tone: "success" },
        { label: "Active Leads", value: "84", tone: "primary" },
        { label: "Demos Booked", value: "26" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="font-medium mb-3">Recent Tickets</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">ID</th>
                <th className="py-2 px-3 font-medium">Subject</th>
                <th className="py-2 px-3 font-medium">Restaurant</th>
                <th className="py-2 px-3 font-medium">Priority</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Age</th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3 font-mono text-xs">{t.id}</td>
                  <td className="py-2 px-3">{t.subject}</td>
                  <td className="py-2 px-3 text-muted-foreground">{t.restaurant}</td>
                  <td className="py-2 px-3">
                    <Badge className={t.priority === "High" ? "bg-destructive text-destructive-foreground" : t.priority === "Medium" ? "bg-warning text-warning-foreground" : ""} variant={t.priority === "Low" ? "secondary" : "default"}>
                      {t.priority}
                    </Badge>
                  </td>
                  <td className="py-2 px-3"><Badge variant="secondary">{t.status}</Badge></td>
                  <td className="py-2 px-3 text-muted-foreground">{t.age}</td>
                  <td className="py-2 px-3 text-right"><Button variant="ghost" size="sm">Open</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Lead Pipeline">
          <div className="space-y-3">
            {leads.map(l => (
              <div key={l.name} className="flex items-center justify-between text-sm border-b border-border/40 pb-2 last:border-0 last:pb-0">
                <div>
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.source}</div>
                </div>
                <Badge variant="secondary">{l.stage}</Badge>
                <div className="text-sm font-medium">{l.value}</div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Capabilities">
          <FeatureList features={[
            "Ticket system",
            "Chat with restaurant admins",
            "View issue logs",
            "Demo requests",
            "Lead pipeline",
            "Knowledge base",
          ]}/>
        </SectionCard>
      </div>
    </div>
  );
}
