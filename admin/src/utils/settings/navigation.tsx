import { Building2, ClipboardList, Mail, type LucideIcon } from "lucide-react";

export type SettingsTab = "email" | "queries" | "business";
type NavigationItem = {
  id: SettingsTab;
  label: string;
  icon: LucideIcon;
};

const navigation: NavigationItem[] = [
  { id: "email", label: "Email & Notifications", icon: Mail },
  { id: "queries", label: "Query Management", icon: ClipboardList },
  { id: "business", label: "Business Profile", icon: Building2 },
];

export default navigation;
