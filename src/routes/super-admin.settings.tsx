import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/super-admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Configuration" title="Global Settings"
        description="Defaults that apply across every restaurant on the platform."/>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 border-border/60 space-y-4">
          <div className="font-medium">Defaults</div>
          <div className="space-y-1.5"><Label>Default Currency</Label><Input defaultValue="USD ($)"/></div>
          <div className="space-y-1.5"><Label>Default Tax Rate</Label><Input defaultValue="8.5%"/></div>
          <div className="space-y-1.5"><Label>Default Language</Label><Input defaultValue="English"/></div>
          <Button>Save Defaults</Button>
        </Card>
        <Card className="p-6 border-border/60 space-y-4">
          <div className="font-medium">Integrations</div>
          <div className="space-y-1.5"><Label>Stripe Public Key</Label><Input defaultValue="pk_live_••••••••" /></div>
          <div className="space-y-1.5"><Label>Email Service (SMTP)</Label><Input defaultValue="smtp.sendgrid.net"/></div>
          <div className="space-y-1.5"><Label>SMS Provider</Label><Input defaultValue="Twilio"/></div>
          <Button>Save Integrations</Button>
        </Card>
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
