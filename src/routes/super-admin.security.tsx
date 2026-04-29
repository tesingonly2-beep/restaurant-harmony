import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/super-admin/security")({
  component: SecurityPage,
});

const audits = [
  { who: "Aarav Kapoor", action: "Suspended restaurant 'Naan Stop'", when: "12 min ago", ip: "203.0.113.4" },
  { who: "System", action: "Daily backup completed", when: "2h ago", ip: "internal" },
  { who: "Sara Iyer", action: "Force-logged out 4 sessions", when: "5h ago", ip: "198.51.100.21" },
  { who: "System", action: "Detected 3 failed login bursts", when: "1d ago", ip: "203.0.113.99" },
];

function SecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Trust" title="Security"
        description="Audit logs, IP restrictions, 2FA enforcement and backup management."/>
      <StatGrid stats={[
        { label: "2FA Coverage", value: "84%", tone: "success" },
        { label: "Audit Events (24h)", value: "1,204" },
        { label: "Blocked IPs", value: "32", tone: "warning" },
        { label: "Last Backup", value: "2h ago", tone: "success" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="font-medium mb-3">Audit Log</div>
        <div className="space-y-3">
          {audits.map((a, i) => (
            <div key={i} className="flex items-start justify-between gap-4 border-b border-border/40 pb-2 last:border-0 last:pb-0">
              <div>
                <div className="text-sm">{a.action}</div>
                <div className="text-xs text-muted-foreground">{a.who} · {a.ip}</div>
              </div>
              <Badge variant="secondary">{a.when}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Audit logs",
          "IP restrictions",
          "2FA enforcement",
          "Data backup management",
          "Session management",
          "Compliance exports",
        ]}/>
      </SectionCard>
    </div>
  );
}
