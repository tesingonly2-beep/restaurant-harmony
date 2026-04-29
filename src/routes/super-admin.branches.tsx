import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, FeatureList, SectionCard } from "@/components/PageScaffold";

export const Route = createFileRoute("/super-admin/branches")({
  component: BranchesPage,
});

function BranchesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Multi-Branch"
        title="Branches Across All Restaurants"
        description="Oversee every outlet, enable the multi-branch module, or transfer ownership."
        primaryAction={{ label: "Enable Branch Module" }}
      />
      <StatGrid stats={[
        { label: "Total Branches", value: "3,486" },
        { label: "Multi-branch Restaurants", value: "412", tone: "primary" },
        { label: "Ownership Transfers (30d)", value: "7" },
        { label: "Newly Onboarded", value: "58", tone: "success" },
      ]}/>
      <SectionCard title="Branch Management Capabilities">
        <FeatureList features={[
          "View all branches of any restaurant",
          "Enable / disable branch module per tenant",
          "Transfer branch ownership",
          "Centralised branch reporting",
          "Per-branch usage limits",
          "Branch-level activity logs",
        ]} />
      </SectionCard>
    </div>
  );
}
