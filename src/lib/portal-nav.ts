import {
  LayoutDashboard, Building2, GitBranch, Users, CreditCard, TrendingUp,
  LifeBuoy, Settings, BarChart3, Shield, Megaphone,
  ShoppingCart, UtensilsCrossed, ClipboardList, LayoutGrid, ChefHat,
  Package, UserCog, Heart, Wallet, FileBarChart, Store,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: any;
  description?: string;
};

export const superAdminNav: NavItem[] = [
  { title: "Dashboard", url: "/super-admin", icon: LayoutDashboard, description: "Platform overview & KPIs" },
  { title: "Restaurants", url: "/super-admin/restaurants", icon: Building2, description: "Manage all restaurants" },
  { title: "Branches", url: "/super-admin/branches", icon: GitBranch, description: "Multi-branch control" },
  { title: "Users & Access", url: "/super-admin/users", icon: Users, description: "Users, roles, sessions" },
  { title: "Billing & Plans", url: "/super-admin/billing", icon: CreditCard, description: "Subscriptions & invoices" },
  { title: "Revenue", url: "/super-admin/revenue", icon: TrendingUp, description: "MRR, ARR, churn" },
  { title: "Support & CRM", url: "/super-admin/support", icon: LifeBuoy, description: "Tickets, leads, demos" },
  { title: "Marketing", url: "/super-admin/marketing", icon: Megaphone, description: "Coupons, referrals, affiliates" },
  { title: "Reports", url: "/super-admin/reports", icon: BarChart3, description: "Platform analytics" },
  { title: "Security", url: "/super-admin/security", icon: Shield, description: "Audit logs, 2FA, backups" },
  { title: "Global Settings", url: "/super-admin/settings", icon: Settings, description: "Taxes, currency, gateways" },
];

export const adminNav: NavItem[] = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, description: "Today at a glance" },
  { title: "POS / Billing", url: "/admin/pos", icon: ShoppingCart, description: "Take orders & bill" },
  { title: "Orders", url: "/admin/orders", icon: ClipboardList, description: "Dine-in, takeaway, delivery" },
  { title: "Menu", url: "/admin/menu", icon: UtensilsCrossed, description: "Items, combos, pricing" },
  { title: "Tables", url: "/admin/tables", icon: LayoutGrid, description: "Floor plan & reservations" },
  { title: "Kitchen (KDS)", url: "/admin/kitchen", icon: ChefHat, description: "Live kitchen display" },
  { title: "Inventory", url: "/admin/inventory", icon: Package, description: "Stock, vendors, waste" },
  { title: "Staff", url: "/admin/staff", icon: UserCog, description: "Employees, shifts, payroll" },
  { title: "Customers", url: "/admin/customers", icon: Heart, description: "CRM, loyalty, feedback" },
  { title: "Finance", url: "/admin/finance", icon: Wallet, description: "P&L, expenses, taxes" },
  { title: "Reports", url: "/admin/reports", icon: FileBarChart, description: "Sales & performance" },
  { title: "Branches", url: "/admin/branches", icon: Store, description: "Multi-outlet control" },
  { title: "Settings", url: "/admin/settings", icon: Settings, description: "Printer, taxes, profile" },
];
