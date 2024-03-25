import { ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import { useContext, createContext, useState, ReactNode } from "react";

const SidebarContext = createContext<{ expanded: boolean } | undefined>(
  undefined,
);

export const SidebarUI = ({ children }: { children: ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  const dimension = 50;

  return (
    <aside className="h-screen flex flex-col bg-white border-r">
      <div className="flex justify-between items-center p-4 pb-2">
        <div
          className={`flex items-center overflow-hidden transition-all ${expanded ? "w-36" : "w-0"
            }`}
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={dimension}
            height={dimension}
          />
          <span className="ml-3 font-bold">RetroPGF Visualizer</span>
        </div>
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-1.5 bg-gray-50 rounded-lg hover:bg-gray-100"
        >
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>

      <hr className="mx-3 border border-gray-400" />
      <SidebarContext.Provider value={{ expanded }}>
        <ul className="flex-1 px-3">{children}</ul>
      </SidebarContext.Provider>
    </aside>
  );
};

export const SidebarItem = ({
  icon,
  text,
  active = false,
  onClick,
}: {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}) => {
  const { expanded } = useContext(SidebarContext) ?? { expanded: false };

  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${active
          ? "bg-gradient-to-tr from-red-200 to-red-100 text-red-800"
          : "hover:bg-red-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>

      {!expanded && (
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
};
