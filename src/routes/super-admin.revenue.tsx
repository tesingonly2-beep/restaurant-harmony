import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";

export const Route = createFileRoute("/super-admin/revenue")({
  component: RevenuePage,
});

const bars = [42, 55, 48, 62, 71, 68, 79, 85, 88, 92, 98, 112];
const months = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"];

function RevenuePage() {
  const max = Math.max(...bars);
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Finance" title="Revenue Dashboard"
        description="MRR, ARR, churn, and the customers driving your platform's growth." />
      <StatGrid stats={[
        { label: "MRR", value: "$148.9K", hint: "+12.4% MoM", tone: "success" },
        { label: "ARR", value: "$1.78M", hint: "+38% YoY", tone: "primary" },
        { label: "Churn (30d)", value: "1.8%", hint: "−0.4 pts", tone: "success" },
        { label: "ARPU", value: "$116", hint: "+$4 MoM" },
      ]}/>

      <SectionCard title="Revenue trend" description="MRR by month (last 12)">
        <div className="flex items-end gap-2 h-48">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full rounded-t-md transition-all hover:opacity-80"
                style={{ height: `${(b / max) * 100}%`, background: "var(--gradient-warm)" }}/>
              <div className="text-[10px] text-muted-foreground">{months[i]}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Top Paying Clients">
          <div className="space-y-3">
            {[
              { n: "Bombay Bistro", v: "$10,788/yr" },
              { n: "Coastal Catch", v: "$10,788/yr" },
              { n: "Royal Thali Group", v: "$8,964/yr" },
              { n: "The Spice Route", v: "$2,988/yr" },
            ].map(c => (
              <div key={c.n} className="flex justify-between text-sm">
                <span>{c.n}</span><span className="font-medium">{c.v}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Insights">
          <FeatureList features={[
            "Total MRR / ARR",
            "Active restaurants",
            "Churned customers",
            "Top paying clients",
            "Total orders processed",
            "Failed payment recovery",
          ]}/>
        </SectionCard>
      </div>
    </div>
  );
}
