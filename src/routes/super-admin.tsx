import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PortalLayout } from "@/components/PortalLayout";
import { superAdminNav } from "@/lib/portal-nav";

export const Route = createFileRoute("/super-admin")({
  component: SuperAdminLayout,
});

function SuperAdminLayout() {
  return (
    <PortalLayout
      brand="Saffron ERP"
      subtitle="Super Admin"
      nav={superAdminNav}
      user={{ name: "Aarav Kapoor", role: "Platform Owner", initials: "AK" }}
    />
  );
}
