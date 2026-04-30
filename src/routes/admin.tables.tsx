import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChefHat, Soup, AlertTriangle, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/admin/tables")({
  component: TablesPage,
});

const initialTables = Array.from({ length: 16 }).map((_, i) => {
  const r = (i * 37) % 4;
  const status = ["Free", "Occupied", "Reserved", "Bill"][r];
  return { id: `T-${String(i + 1).padStart(2, "0")}`, status, seats: [2, 4, 4, 6, 8][i % 5] };
});

const colorFor = (s: string) =>
  s === "Free" ? "bg-success/15 border-success/40 text-success"
  : s === "Occupied" ? "bg-primary/15 border-primary/40 text-primary"
  : s === "Reserved" ? "bg-warning/15 border-warning/40 text-warning"
  : "bg-accent/30 border-accent text-accent-foreground";

const STATUS_CYCLE = ["Free", "Occupied", "Reserved", "Bill"] as const;

type Culinary = {
  name: string;
  category: "Spices" | "Sauces" | "Marinade" | "Garnish" | "Stock";
  current: number;
  capacity: number;
  unit: string;
};

const initialCulinaries: Culinary[] = [
  { name: "Tandoori Marinade", category: "Marinade", current: 3.2, capacity: 8, unit: "L" },
  { name: "Butter Masala Gravy", category: "Sauces", current: 1.4, capacity: 6, unit: "L" },
  { name: "Mint Chutney", category: "Garnish", current: 0.4, capacity: 2, unit: "L" },
  { name: "Garam Masala", category: "Spices", current: 0.8, capacity: 1.5, unit: "kg" },
  { name: "Chicken Stock", category: "Stock", current: 4.5, capacity: 10, unit: "L" },
  { name: "Tamarind Paste", category: "Sauces", current: 0.6, capacity: 3, unit: "kg" },
  { name: "Saffron Threads", category: "Spices", current: 0.012, capacity: 0.05, unit: "kg" },
  { name: "Fried Onions", category: "Garnish", current: 1.1, capacity: 2.5, unit: "kg" },
];

function TablesPage() {
  const [tables, setTables] = useState(initialTables);
  const [culinaries, setCulinaries] = useState(initialCulinaries);

  const cycle = (id: string) =>
    setTables((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t;
        const idx = STATUS_CYCLE.indexOf(t.status as typeof STATUS_CYCLE[number]);
        const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
        notify(`${t.id} → ${next}`);
        return { ...t, status: next };
      })
    );

  const adjust = (name: string, delta: number) =>
    setCulinaries((cs) =>
      cs.map((c) =>
        c.name === name
          ? { ...c, current: Math.max(0, Math.min(c.capacity, +(c.current + delta).toFixed(2))) }
          : c
      )
    );

  const occupied = tables.filter((t) => t.status === "Occupied").length;
  const lowCount = culinaries.filter((c) => c.current / c.capacity < 0.3).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Floor"
        title="Tables & Kitchen"
        description="Live floor layout, reservations and a real-time tracker for kitchen culinaries."
        primaryAction={{ label: "Reserve Table" }}
      />
      <StatGrid stats={[
        { label: "Occupied", value: `${occupied} / ${tables.length}`, tone: "primary" },
        { label: "Reservations Today", value: "14" },
        { label: "Avg Turn Time", value: "52m", tone: "success" },
        { label: "Low Culinaries", value: String(lowCount), tone: lowCount > 0 ? "warning" : "success" },
      ]}/>

      <SectionCard title="Floor Layout · Ground Level" description="Click a table to cycle its status">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {tables.map((t) => (
            <button
              key={t.id}
              onClick={() => cycle(t.id)}
              className={cn(
                "aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer hover:scale-[1.03] transition-transform",
                colorFor(t.status)
              )}
            >
              <div className="text-sm font-semibold">{t.id}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">{t.status}</div>
              <div className="text-[10px] mt-0.5">{t.seats} seats</div>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-success/60"/>Free</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-primary/60"/>Occupied</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-warning/60"/>Reserved</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-accent"/>Bill requested</span>
        </div>
      </SectionCard>

      {/* Kitchen Culinaries tracker */}
      <Card className="p-5 border-border/60">
        <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center text-primary-foreground"
              style={{ background: "var(--gradient-warm)" }}
            >
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                Kitchen Culinaries
                {lowCount > 0 && (
                  <Badge className="bg-warning text-warning-foreground gap-1">
                    <AlertTriangle className="h-3 w-3" /> {lowCount} low
                  </Badge>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                In-kitchen prep stock — gravies, marinades, garnishes & spices
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => notify("Prep batch logged", "Refilled all low-stock culinaries")}
          >
            <Soup className="h-4 w-4 mr-1.5" /> Log Prep Batch
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {culinaries.map((c) => {
            const pct = Math.round((c.current / c.capacity) * 100);
            const low = pct < 30;
            return (
              <div
                key={c.name}
                className={cn(
                  "rounded-xl border p-4 transition-colors",
                  low
                    ? "border-warning/50 bg-gradient-to-br from-warning/10 to-transparent"
                    : "border-border/60 bg-card hover:border-primary/40"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{c.name}</div>
                    <Badge variant="secondary" className="mt-1 text-[10px]">{c.category}</Badge>
                  </div>
                  <div className={cn("text-sm font-semibold", low ? "text-warning" : "text-primary")}>
                    {pct}%
                  </div>
                </div>
                <Progress value={pct} className="h-1.5" />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {c.current}{c.unit} / {c.capacity}{c.unit}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => adjust(c.name, -0.2)}
                      aria-label="Use"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => adjust(c.name, +0.5)}
                      aria-label="Refill"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Floor layout",
          "Reserve tables",
          "Merge / split tables",
          "Live occupancy",
          "Kitchen culinary tracker",
          "Prep batch logging",
        ]}/>
      </SectionCard>
    </div>
  );
}
