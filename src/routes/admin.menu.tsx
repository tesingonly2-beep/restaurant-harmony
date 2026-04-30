import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatGrid, FeatureList, SectionCard } from "@/components/PageScaffold";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatINR } from "@/lib/currency";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/admin/menu")({
  component: MenuPage,
});

type Item = { name: string; cat: string; price: number; available: boolean };

const initialMenu: Item[] = [
  { name: "Paneer Tikka", cat: "Starters", price: 320, available: true },
  { name: "Chicken 65", cat: "Starters", price: 360, available: true },
  { name: "Butter Chicken", cat: "Mains", price: 420, available: true },
  { name: "Lamb Biryani", cat: "Mains", price: 480, available: true },
  { name: "Veg Biryani", cat: "Mains", price: 280, available: true },
  { name: "Garlic Naan", cat: "Breads", price: 80, available: true },
  { name: "Mango Lassi", cat: "Drinks", price: 120, available: false },
  { name: "Gulab Jamun", cat: "Desserts", price: 140, available: true },
];

function MenuPage() {
  const [menu, setMenu] = useState(initialMenu);

  const toggle = (name: string) =>
    setMenu((m) =>
      m.map((it) => {
        if (it.name !== name) return it;
        notify(`${it.name} ${!it.available ? "available" : "unavailable"}`);
        return { ...it, available: !it.available };
      })
    );

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Catalog" title="Menu" description="Add items, build combos, manage categories and pricing."
        primaryAction={{ label: "Add Item" }}/>
      <StatGrid stats={[
        { label: "Items", value: String(menu.length) },
        { label: "Categories", value: "9" },
        { label: "Combos", value: "6", tone: "primary" },
        { label: "Out of stock", value: String(menu.filter((m) => !m.available).length), tone: "warning" },
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
              {menu.map((m) => (
                <tr key={m.name} className="border-b border-border/40 hover:bg-muted/40">
                  <td className="py-2 px-3 font-medium">{m.name}</td>
                  <td className="py-2 px-3"><Badge variant="secondary">{m.cat}</Badge></td>
                  <td className="py-2 px-3">{formatINR(m.price)}</td>
                  <td className="py-2 px-3">
                    <Switch checked={m.available} onCheckedChange={() => toggle(m.name)} />
                  </td>
                  <td className="py-2 px-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => notify(`Editing ${m.name}`)}>Edit</Button>
                  </td>
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
