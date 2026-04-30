import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, FeatureList, SectionCard } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/super-admin/users")({
  component: UsersPage,
});

const users = [
  { name: "Rohit Mehta", email: "rohit@spiceroute.com", restaurant: "The Spice Route", role: "Owner", status: "Online" },
  { name: "Sara Iyer", email: "sara@bombaybistro.in", restaurant: "Bombay Bistro", role: "Admin", status: "Online" },
  { name: "Amir Khan", email: "amir@currykitchen.com", restaurant: "Curry Kitchen", role: "Manager", status: "Offline" },
  { name: "Priya Singh", email: "priya@tandoor.com", restaurant: "Tandoor Nights", role: "Cashier", status: "Online" },
  { name: "Manoj Das", email: "manoj@naanstop.in", restaurant: "Naan Stop", role: "Owner", status: "Suspended" },
];

function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Identity"
        title="Users & Access"
        description="Every user across every restaurant. Reset passwords, force logout, manage role templates."
      />
      <StatGrid stats={[
        { label: "Total Users", value: "18,422" },
        { label: "Online Now", value: "2,341", tone: "success" },
        { label: "Suspended", value: "47", tone: "warning" },
        { label: "Role Templates", value: "12" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-3 px-3 font-medium">User</th>
                <th className="py-3 px-3 font-medium">Restaurant</th>
                <th className="py-3 px-3 font-medium">Role</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/15 text-primary text-xs">{u.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">{u.restaurant}</td>
                  <td className="py-3 px-3"><Badge variant="secondary">{u.role}</Badge></td>
                  <td className="py-3 px-3">
                    <Badge className={u.status === "Online" ? "bg-success text-success-foreground" : u.status === "Suspended" ? "bg-destructive text-destructive-foreground" : ""}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => notify(`Password reset link sent to ${u.email}`)}>Reset</Button>
                    <Button variant="ghost" size="sm" onClick={() => notify(`Logged out ${u.name}`)}>Force logout</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "View all users under restaurants",
          "Reset passwords",
          "Force logout sessions",
          "Manage roles templates",
          "Bulk import / export",
          "User activity audit",
        ]}/>
      </SectionCard>
    </div>
  );
}
