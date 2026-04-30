import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Trash2, Search, Receipt } from "lucide-react";
import { formatINR } from "@/lib/currency";
import { notify } from "@/hooks/use-action";

export const Route = createFileRoute("/admin/pos")({
  head: () => ({ meta: [{ title: "POS — Spice Route" }] }),
  component: POSPage,
});

const categories = ["All", "Starters", "Mains", "Breads", "Drinks", "Desserts"];
const items = [
  { name: "Paneer Tikka", cat: "Starters", price: 320, color: "from-orange-400 to-red-500" },
  { name: "Chicken 65", cat: "Starters", price: 360, color: "from-red-400 to-pink-500" },
  { name: "Butter Chicken", cat: "Mains", price: 420, color: "from-amber-400 to-orange-500" },
  { name: "Paneer Butter Masala", cat: "Mains", price: 360, color: "from-yellow-400 to-orange-400" },
  { name: "Lamb Biryani", cat: "Mains", price: 480, color: "from-orange-500 to-red-600" },
  { name: "Veg Biryani", cat: "Mains", price: 280, color: "from-amber-300 to-yellow-500" },
  { name: "Garlic Naan", cat: "Breads", price: 80, color: "from-amber-200 to-amber-400" },
  { name: "Tandoori Roti", cat: "Breads", price: 40, color: "from-orange-300 to-amber-500" },
  { name: "Mango Lassi", cat: "Drinks", price: 120, color: "from-yellow-300 to-orange-400" },
  { name: "Masala Chai", cat: "Drinks", price: 60, color: "from-amber-500 to-orange-600" },
  { name: "Gulab Jamun", cat: "Desserts", price: 140, color: "from-amber-600 to-red-500" },
  { name: "Kulfi", cat: "Desserts", price: 120, color: "from-pink-300 to-orange-400" },
];

type Line = { name: string; price: number; qty: number };

function POSPage() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState<Line[]>([
    { name: "Butter Chicken", price: 420, qty: 1 },
    { name: "Garlic Naan", price: 80, qty: 2 },
  ]);

  const visible = items.filter((i) =>
    (cat === "All" || i.cat === cat) &&
    (search === "" || i.name.toLowerCase().includes(search.toLowerCase()))
  );
  const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const discounted = Math.max(0, subtotal - discount);
  const tax = discounted * 0.05;
  const total = discounted + tax;

  const add = (n: string, p: number) =>
    setCart((c) => {
      const f = c.find((l) => l.name === n);
      return f ? c.map((l) => (l.name === n ? { ...l, qty: l.qty + 1 } : l)) : [...c, { name: n, price: p, qty: 1 }];
    });
  const dec = (n: string) =>
    setCart((c) => c.flatMap((l) => (l.name === n ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])));
  const remove = (n: string) => setCart((c) => c.filter((l) => l.name !== n));

  const charge = () => {
    if (cart.length === 0) return notify("Cart is empty", "Add items to charge");
    notify(`Charged ${formatINR(total, { decimals: true })}`, `KOT #4521 · Table T-12`);
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-6 h-[calc(100vh-9rem)]">
      <div className="flex flex-col min-h-0">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
              placeholder="Search menu…"
              className="pl-8 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {categories.map((c) => (
            <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)} className="shrink-0">
              {c}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto pr-1">
          {visible.map((i) => (
            <button
              key={i.name}
              onClick={() => add(i.name, i.price)}
              className="text-left rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-[var(--shadow-soft)] transition-all overflow-hidden"
            >
              <div className={`h-20 bg-gradient-to-br ${i.color}`} />
              <div className="p-3">
                <div className="text-sm font-medium truncate">{i.name}</div>
                <div className="text-xs text-muted-foreground">{i.cat}</div>
                <div className="mt-1 text-sm font-semibold text-primary">{formatINR(i.price)}</div>
              </div>
            </button>
          ))}
          {visible.length === 0 && (
            <div className="col-span-full text-center text-sm text-muted-foreground py-12">
              No items match your search.
            </div>
          )}
        </div>
      </div>

      <Card className="p-4 border-border/60 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold">Current Order</div>
            <div className="text-xs text-muted-foreground">Table T-12 · Dine-in</div>
          </div>
          <Badge>KOT #4521</Badge>
        </div>

        <div className="flex-1 overflow-y-auto -mx-4 px-4 divide-y divide-border/60">
          {cart.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-12">Cart is empty — tap items to add</div>
          )}
          {cart.map((l) => (
            <div key={l.name} className="py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{l.name}</div>
                <div className="text-xs text-muted-foreground">{formatINR(l.price)}</div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => dec(l.name)}><Minus className="h-3 w-3"/></Button>
                <div className="w-6 text-center text-sm">{l.qty}</div>
                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => add(l.name, l.price)}><Plus className="h-3 w-3"/></Button>
              </div>
              <div className="w-20 text-right text-sm font-medium">{formatINR(l.price * l.qty)}</div>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => remove(l.name)}><Trash2 className="h-3.5 w-3.5"/></Button>
            </div>
          ))}
        </div>

        <div className="border-t border-border/60 pt-3 mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatINR(subtotal, { decimals: true })}</span></div>
          {discount > 0 && (
            <div className="flex justify-between text-success"><span>Discount</span><span>−{formatINR(discount, { decimals: true })}</span></div>
          )}
          <div className="flex justify-between text-muted-foreground"><span>GST (5%)</span><span>{formatINR(tax, { decimals: true })}</span></div>
          <div className="flex justify-between text-lg font-semibold pt-1"><span>Total</span><span className="text-primary">{formatINR(total, { decimals: true })}</span></div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button variant="outline" onClick={() => notify("KOT sent to kitchen", "Ticket #4521")}>Send KOT</Button>
          <Button
            variant="outline"
            onClick={() => {
              const d = Math.round(subtotal * 0.1);
              setDiscount(d);
              notify("10% discount applied", `−${formatINR(d)}`);
            }}
          >
            Discount
          </Button>
          <Button variant="outline" onClick={() => notify("Bill split into 2", "Equal halves")}>Split Bill</Button>
          <Button variant="outline" onClick={() => notify("Order put on hold", "Resume from Orders")}>Hold</Button>
        </div>
        <Button className="mt-2 shadow-[var(--shadow-warm)]" size="lg" onClick={charge}>
          <Receipt className="h-4 w-4 mr-2"/> Charge {formatINR(total, { decimals: true })}
        </Button>
      </Card>
    </div>
  );
}
