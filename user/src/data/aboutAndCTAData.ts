import { BadgeCheck, Handshake, type LucideIcon, ShieldCheck, Truck, Wallet } from 'lucide-react';

export type Card = {
  id: number;
  title: string;
  description: string;
  position: string;
  index: number;
  icon?: LucideIcon;
}; 

  export const whyChooseUs: Card[] = [
    {
      id: 1,
      title: "Quality Assurance",
      description:
        "We prioritise carefully selected vehicles and transparent vehicle information.",
      position: "top-5 left-15",
      index: 1,
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Trust and Transparency",
      description:
        "We keep our clients informed throughout the importation process.",
      position: "top-35 left-60",
      index: 1,
      icon: Handshake,
    },
    {
      id: 3,
      title: "Customer-Centred Service",
      description:
        "Your needs, preferences and budget guide our recommendations.",
      position: "bottom-5 right-150",
      index: 1,
      icon: BadgeCheck,
    },
    {
      id: 4,
      title: "Value for Money",
      description:
        "We work towards securing quality vehicles at competitive prices.",
      position: "top-60 left-20",
      index: 1,
      icon: Wallet,
    },
    {
      id: 5,
      title: "End-to-End Support",
      description:
        "We coordinate the importation journey to make owning your dream car a rewarding experience.",
      position: "top-10 left-130",
      index: 1,
      icon: Truck,
    },
  ];
