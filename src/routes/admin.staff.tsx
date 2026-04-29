import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, SectionCard, FeatureList } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/staff")({
  component: StaffPage,
});

const staff = [
  { name: "Ravi Kumar", role: "Head Chef", shift: "10:00 → 22:00", attendance: "Present", salary: "$2,400/mo" },
  { name: "Anita Joshi", role: "Waiter", shift: "12:00 → 22:00", attendance: "Present", salary: "$1,200/mo" },
  { name: "Suresh M.", role: "Cashier", shift: "08:00 → 16:00", attendance: "Break", salary: "$1,400/mo" },
  { name: "Neha Verma", role: "Manager", shift: "09:00 → 21:00", attendance: "Present", salary: "$2,800/mo" },
  { name: "Karan Patel", role: "Chef", shift: "10:00 → 22:00", attendance: "Off", salary: "$1,800/mo" },
  { name: "Deepa Rao", role: "Waiter", shift: "16:00 → 23:00", attendance: "Present", salary: "$1,200/mo" },
];

function StaffPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="People" title="Staff" description="Employees, roles, attendance, shifts and payroll."
        primaryAction={{ label: "Add Employee" }}/>
      <StatGrid stats={[
        { label: "Total Staff", value: "32" },
        { label: "On Shift Now", value: "14", tone: "success" },
        { label: "On Leave", value: "2", tone: "warning" },
        { label: "Payroll (month)", value: "$48.2K", tone: "primary" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">Employee</th>
                <th className="py-2 px-3 font-medium">Role</th>
                <th className="py-2 px-3 font-medium">Shift</th>
                <th className="py-2 px-3 font-medium">Attendance</th>
                <th className="py-2 px-3 font-medium">Salary</th>
                <th className="py-2 px-3"/>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.name} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/15 text-primary text-xs">{s.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3"><Badge variant="secondary">{s.role}</Badge></td>
                  <td className="py-2 px-3 text-muted-foreground">{s.shift}</td>
                  <td className="py-2 px-3">
                    <Badge className={
                      s.attendance === "Present" ? "bg-success text-success-foreground"
                      : s.attendance === "Off" ? "bg-muted text-muted-foreground"
                      : "bg-warning text-warning-foreground"
                    }>{s.attendance}</Badge>
                  </td>
                  <td className="py-2 px-3">{s.salary}</td>
                  <td className="py-2 px-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Add employees",
          "Roles (Cashier, Waiter, Chef)",
          "Attendance",
          "Salary records",
          "Shift scheduling",
          "Performance ratings",
        ]}/>
      </SectionCard>
    </div>
  );
}
