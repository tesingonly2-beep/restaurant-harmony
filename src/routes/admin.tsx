import { createFileRoute } from "@tanstack/react-router";
import { PortalLayout } from "@/components/PortalLayout";
import { adminNav } from "@/lib/portal-nav";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <PortalLayout
      brand="Saffron ERP"
      subtitle="Restaurant Admin"
      nav={adminNav}
      user={{ name: "Priya Sharma", role: "Manager · Spice Route", initials: "PS" }}
    />
  );
}
