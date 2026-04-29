import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";

export const Route = createFileRoute("/super-admin/marketing")({
  component: MarketingPage,
});

function MarketingPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Growth" title="Marketing Tools"
        description="Coupons, referral programs, promo campaigns and affiliate partners."
        primaryAction={{ label: "Create Campaign" }}/>
      <StatGrid stats={[
        { label: "Active Coupons", value: "24", tone: "primary" },
        { label: "Referral Signups", value: "318", tone: "success" },
        { label: "Affiliate Partners", value: "47" },
        { label: "Campaign ROI", value: "4.2×", tone: "success" },
      ]}/>
      <SectionCard title="Marketing Capabilities">
        <FeatureList features={[
          "Coupons & promo codes",
          "Referral system",
          "Promo campaigns",
          "Affiliate partners",
          "Email blasts",
          "Conversion tracking",
        ]}/>
      </SectionCard>
    </div>
  );
}
