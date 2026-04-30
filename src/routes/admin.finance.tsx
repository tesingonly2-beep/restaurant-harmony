import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { formatINR } from "@/lib/currency";

export const Route = createFileRoute("/admin/finance")({
  component: FinancePage,
});

const expenses = [
  { cat: "Raw Materials", amount: 1473600, pct: 42 },
  { cat: "Salaries", amount: 1024000, pct: 29 },
  { cat: "Rent", amount: 360000, pct: 10 },
  { cat: "Utilities", amount: 168000, pct: 5 },
  { cat: "Marketing", amount: 144000, pct: 4 },
  { cat: "Other", amount: 350400, pct: 10 },
];

function FinancePage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Money" title="Finance" description="Profit & loss, expenses, taxes and daily closings."/>
      <StatGrid stats={[
        { label: "Revenue (month)", value: formatINR(6736800), tone: "primary" },
        { label: "Expenses (month)", value: formatINR(3520000), tone: "warning" },
        { label: "Net Profit", value: formatINR(3216800), tone: "success" },
        { label: "GST Liability", value: formatINR(572800) },
      ]}/>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5 border-border/60">
          <div className="font-medium mb-4">Expense Breakdown</div>
          <div className="space-y-3">
            {expenses.map((e) => (
              <div key={e.cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{e.cat}</span>
                  <span className="font-medium">{formatINR(e.amount)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full" style={{ width: `${e.pct * 2}%`, background: "var(--gradient-warm)" }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 border-border/60">
          <div className="font-medium mb-4">Daily Closing</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Cash sales</span><span>{formatINR(113600)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Card sales</span><span>{formatINR(164000)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">UPI / Wallet</span><span>{formatINR(29760)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Refunds</span><span>−{formatINR(3840)}</span></div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-border/60"><span>Total</span><span className="text-primary">{formatINR(303520)}</span></div>
          </div>
        </Card>
      </div>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Expenses",
          "Profit & loss",
          "GST / Tax reports",
          "Daily closing report",
          "Cash flow",
          "Vendor payouts",
        ]}/>
      </SectionCard>
    </div>
  );
}
