import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { notify } from "@/hooks/use-action";

type Stat = { label: string; value: string; hint?: string; tone?: "default" | "primary" | "success" | "warning" };

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="border-border/60">
          <CardContent className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</div>
            {s.hint && (
              <div
                className={
                  s.tone === "success"
                    ? "mt-1 text-xs text-success"
                    : s.tone === "warning"
                    ? "mt-1 text-xs text-warning"
                    : s.tone === "primary"
                    ? "mt-1 text-xs text-primary"
                    : "mt-1 text-xs text-muted-foreground"
                }
              >
                {s.hint}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {features.map((f) => (
        <div
          key={f}
          className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3 hover:border-primary/40 hover:shadow-[var(--shadow-soft)] transition-all"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm">{f}</span>
          <Badge variant="secondary" className="ml-auto text-[10px]">Ready</Badge>
        </div>
      ))}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  primaryAction,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: { label: string; onClick?: () => void };
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
            {eyebrow}
          </div>
        )}
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {primaryAction && (
        <Button
          onClick={primaryAction.onClick ?? (() => notify(primaryAction.label, "Action triggered (demo)"))}
          className="shadow-[var(--shadow-warm)]"
        >
          <Plus className="h-4 w-4 mr-1" /> {primaryAction.label}
        </Button>
      )}
    </div>
  );
}
