import { signal } from "@preact/signals-react";
import { ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const expanded = signal(false);

export default function Sidebar({ children }: { children: ReactNode }) {
  const dimension = 150;

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded.value ? "w-32" : "w-0"
            }`}
            alt="logo"
            width={dimension}
            height={dimension}
          />
          <button
            onClick={() => (expanded.value = !expanded.value)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded.value ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  active = false,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-red-200 to-red-100 text-red-800"
            : "hover:bg-red-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded.value ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded.value && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-red-100 text-red-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
