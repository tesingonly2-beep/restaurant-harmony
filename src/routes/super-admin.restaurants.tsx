import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, Building2 } from "lucide-react";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/super-admin/restaurants")({
  component: RestaurantsPage,
});

const restaurants = [
  { name: "The Spice Route", owner: "R. Mehta", plan: "Pro", branches: 3, users: 24, orders: "12.4k", status: "Active", since: "Jan 2024" },
  { name: "Bombay Bistro", owner: "S. Iyer", plan: "Enterprise", branches: 12, users: 142, orders: "98.2k", status: "Active", since: "Mar 2023" },
  { name: "Curry Kitchen", owner: "A. Khan", plan: "Basic", branches: 1, users: 6, orders: "1.1k", status: "Trial", since: "Apr 2026" },
  { name: "Tandoor Nights", owner: "P. Singh", plan: "Pro", branches: 2, users: 18, orders: "8.9k", status: "Active", since: "Sep 2024" },
  { name: "Naan Stop", owner: "M. Das", plan: "Basic", branches: 1, users: 4, orders: "0.8k", status: "Suspended", since: "Nov 2025" },
  { name: "Royal Thali", owner: "V. Rao", plan: "Pro", branches: 4, users: 32, orders: "21.6k", status: "Active", since: "Jul 2024" },
  { name: "Coastal Catch", owner: "L. Pillai", plan: "Enterprise", branches: 8, users: 96, orders: "54.3k", status: "Active", since: "Feb 2024" },
];

function RestaurantsPage() {
  const [q, setQ] = useState("");
  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      r.owner.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Tenants"
        title="All Restaurants"
        description="Approve, suspend, or manage subscriptions for every restaurant on the platform."
        primaryAction={{ label: "Add Restaurant" }}
      />

      <Card className="p-4 border-border/60">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, owner or city…"
              className="pl-8"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => notify("Filter: All Plans")}>All Plans</Button>
            <Button variant="outline" size="sm" onClick={() => notify("Filter: All Status")}>All Status</Button>
            <Button variant="outline" size="sm" onClick={() => notify("Export started", "CSV will download shortly")}>Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-3 px-3 font-medium">Restaurant</th>
                <th className="py-3 px-3 font-medium">Plan</th>
                <th className="py-3 px-3 font-medium">Branches</th>
                <th className="py-3 px-3 font-medium">Users</th>
                <th className="py-3 px-3 font-medium">Orders</th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 font-medium">Since</th>
                <th className="py-3 px-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.name} className="border-b border-border/40 hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={r.plan === "Enterprise" ? "default" : "secondary"}>{r.plan}</Badge>
                  </td>
                  <td className="py-3 px-3">{r.branches}</td>
                  <td className="py-3 px-3">{r.users}</td>
                  <td className="py-3 px-3">{r.orders}</td>
                  <td className="py-3 px-3">
                    <Badge
                      className={
                        r.status === "Active" ? "bg-success text-success-foreground"
                          : r.status === "Trial" ? "bg-warning text-warning-foreground"
                          : "bg-destructive text-destructive-foreground"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{r.since}</td>
                  <td className="py-3 px-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => notify(`Manage ${r.name}`, `Owner: ${r.owner}`)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
