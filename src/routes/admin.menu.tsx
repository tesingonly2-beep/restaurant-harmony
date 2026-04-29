import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatGrid, FeatureList, SectionCard } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/menu")({
  component: MenuPage,
});

const menu = [
  { name: "Paneer Tikka", cat: "Starters", price: "$8.50", available: true },
  { name: "Chicken 65", cat: "Starters", price: "$9.00", available: true },
  { name: "Butter Chicken", cat: "Mains", price: "$14.50", available: true },
  { name: "Lamb Biryani", cat: "Mains", price: "$16.00", available: true },
  { name: "Veg Biryani", cat: "Mains", price: "$11.50", available: true },
  { name: "Garlic Naan", cat: "Breads", price: "$3.00", available: true },
  { name: "Mango Lassi", cat: "Drinks", price: "$4.50", available: false },
  { name: "Gulab Jamun", cat: "Desserts", price: "$5.00", available: true },
];

function MenuPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Catalog" title="Menu" description="Add items, build combos, manage categories and pricing."
        primaryAction={{ label: "Add Item" }}/>
      <StatGrid stats={[
        { label: "Items", value: "84" },
        { label: "Categories", value: "9" },
        { label: "Combos", value: "6", tone: "primary" },
        { label: "Out of stock", value: "3", tone: "warning" },
      ]}/>

      <Card className="p-4 border-border/60">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                <th className="py-2 px-3 font-medium">Item</th>
                <th className="py-2 px-3 font-medium">Category</th>
                <th className="py-2 px-3 font-medium">Price</th>
                <th className="py-2 px-3 font-medium">Available</th>
                <th className="py-2 px-3"/>
              </tr>
            </thead>
            <tbody>
              {menu.map(m => (
                <tr key={m.name} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3 font-medium">{m.name}</td>
                  <td className="py-2 px-3"><Badge variant="secondary">{m.cat}</Badge></td>
                  <td className="py-2 px-3">{m.price}</td>
                  <td className="py-2 px-3"><Switch defaultChecked={m.available}/></td>
                  <td className="py-2 px-3 text-right"><Button variant="ghost" size="sm">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionCard title="Capabilities">
        <FeatureList features={[
          "Add / edit food items",
          "Categories",
          "Combo meals",
          "Pricing",
          "Happy hour pricing",
          "Availability toggle",
        ]}/>
      </SectionCard>
    </div>
  );
}
