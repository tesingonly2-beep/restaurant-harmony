import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";

export const Route = createFileRoute("/super-admin/reports")({
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Analytics" title="Reports & Analytics"
        description="Platform growth, signups, usage, failed payments and feature adoption." />
      <StatGrid stats={[
        { label: "New Signups (30d)", value: "284", tone: "success" },
        { label: "Active Restaurants", value: "1,284" },
        { label: "Feature Adoption", value: "76%", tone: "primary" },
        { label: "Failed Payments", value: "1.2%", tone: "warning" },
      ]}/>
      <SectionCard title="Available Reports">
        <FeatureList features={[
          "Platform growth charts",
          "New signups",
          "Usage reports",
          "Failed payments",
          "Feature usage stats",
          "Cohort retention",
          "Geographic distribution",
          "Plan distribution",
        ]}/>
      </SectionCard>
    </div>
  );
}
