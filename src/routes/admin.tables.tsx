import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/tables")({
  component: TablesPage,
});

const tables = Array.from({ length: 16 }).map((_, i) => {
  const r = (i * 37) % 4;
  const status = ["Free", "Occupied", "Reserved", "Bill"][r];
  return { id: `T-${String(i + 1).padStart(2, "0")}`, status, seats: [2, 4, 4, 6, 8][i % 5] };
});

const colorFor = (s: string) =>
  s === "Free" ? "bg-success/15 border-success/40 text-success"
  : s === "Occupied" ? "bg-primary/15 border-primary/40 text-primary"
  : s === "Reserved" ? "bg-warning/15 border-warning/40 text-warning"
  : "bg-accent/30 border-accent text-accent-foreground";

function TablesPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Floor" title="Tables" description="Live floor layout, reservations, merge & split."
        primaryAction={{ label: "Reserve Table" }}/>
      <StatGrid stats={[
        { label: "Occupied", value: "9 / 16", tone: "primary" },
        { label: "Reservations Today", value: "14" },
        { label: "Avg Turn Time", value: "52m", tone: "success" },
        { label: "Walk-in Wait", value: "8m" },
      ]}/>

      <SectionCard title="Floor Layout · Ground Level">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {tables.map(t => (
            <div key={t.id} className={cn(
              "aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer hover:scale-[1.03] transition-transform",
              colorFor(t.status)
            )}>
              <div className="text-sm font-semibold">{t.id}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">{t.status}</div>
              <div className="text-[10px] mt-0.5">{t.seats} seats</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-success/60"/>Free</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-primary/60"/>Occupied</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-warning/60"/>Reserved</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-accent"/>Bill requested</span>
        </div>
      </SectionCard>

      <SectionCard title="Capabilities">
        <FeatureList features={["Floor layout", "Reserve tables", "Merge / split tables", "Live occupancy", "Waitlist", "Section assignment"]}/>
      </SectionCard>
    </div>
  );
}
