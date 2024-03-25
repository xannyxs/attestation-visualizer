"use client";

import { Card } from "@/components/ui/card";
import { Boxes, Split } from "lucide-react";
import Link from "next/link";

interface INode {
  title: string;
  icon: JSX.Element;
  href: string;
}

const Pages: INode[] = [
  {
    title: "See Attestation Visualiser",
    icon: <Boxes />,
    href: "/graph?graph=3d&round=3",
  },
  {
    title: "Badgeholder Distribution",
    icon: <Split />,
    href: "/distribution",
  },
];

const InformativeGrid = () => {
  return (
    <div className="grid gap-2">
      {Pages.map((page, index) => (
        <Link key={index} href={page.href}>
          <Card className="flex justify-between items-center p-4 font-semibold bg-gray-300 transition hover:bg-red-200">
            {page.icon}
            {page.title}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default InformativeGrid;
