import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Configuration" title="Settings" description="Business profile, printer setup, taxes, branding and hours."/>

      <div className="grid gap-6 md:grid-cols-2">
        <form
          onSubmit={(e) => { e.preventDefault(); notify("Profile saved"); }}
        >
          <Card className="p-6 border-border/60 space-y-4">
            <div className="font-medium">Business Profile</div>
            <div className="space-y-1.5"><Label>Restaurant Name</Label><Input defaultValue="The Spice Route"/></div>
            <div className="space-y-1.5"><Label>Cuisine</Label><Input defaultValue="North Indian · Mughlai"/></div>
            <div className="space-y-1.5"><Label>GST Number</Label><Input defaultValue="27ABCDE1234F1Z5"/></div>
            <Button type="submit">Save Profile</Button>
          </Card>
        </form>
        <form
          onSubmit={(e) => { e.preventDefault(); notify("Operations saved"); }}
        >
          <Card className="p-6 border-border/60 space-y-4">
            <div className="font-medium">Operations</div>
            <div className="space-y-1.5"><Label>Working Hours</Label><Input defaultValue="11:00 AM → 11:00 PM"/></div>
            <div className="space-y-1.5"><Label>Default Tax</Label><Input defaultValue="GST 5%"/></div>
            <div className="space-y-1.5"><Label>Receipt Printer</Label><Input defaultValue="Epson TM-T82 (Bluetooth)"/></div>
            <Button type="submit">Save</Button>
          </Card>
        </form>
      </div>

      <SectionCard title="Capabilities">
        <FeatureList features={["Printer setup", "Taxes", "Invoice branding", "Business profile", "Working hours", "Backup & restore"]}/>
      </SectionCard>
    </div>
  );
}

