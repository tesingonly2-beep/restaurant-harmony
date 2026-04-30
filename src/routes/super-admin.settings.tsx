import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/super-admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Configuration" title="Global Settings"
        description="Defaults that apply across every restaurant on the platform."/>

      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); notify("Defaults saved"); }}>
          <Card className="p-6 border-border/60 space-y-4">
            <div className="font-medium">Defaults</div>
            <div className="space-y-1.5"><Label>Default Currency</Label><Input defaultValue="INR (₹)"/></div>
            <div className="space-y-1.5"><Label>Default Tax Rate</Label><Input defaultValue="GST 5%"/></div>
            <div className="space-y-1.5"><Label>Default Language</Label><Input defaultValue="English"/></div>
            <Button type="submit">Save Defaults</Button>
          </Card>
        </form>
        <form onSubmit={(e) => { e.preventDefault(); notify("Integrations saved"); }}>
          <Card className="p-6 border-border/60 space-y-4">
            <div className="font-medium">Integrations</div>
            <div className="space-y-1.5"><Label>Razorpay Key</Label><Input defaultValue="rzp_live_••••••••" /></div>
            <div className="space-y-1.5"><Label>Email Service (SMTP)</Label><Input defaultValue="smtp.sendgrid.net"/></div>
            <div className="space-y-1.5"><Label>SMS Provider</Label><Input defaultValue="MSG91"/></div>
            <Button type="submit">Save Integrations</Button>
          </Card>
        </form>
      </div>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Tax defaults",
          "Currency options",
          "Language settings",
          "Notification templates",
          "Email / SMS API config",
          "Payment gateway config",
        ]}/>
      </SectionCard>
    </div>
  );
}

