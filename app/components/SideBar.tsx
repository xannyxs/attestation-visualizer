import {
  ChevronLast,
  ChevronFirst,
  Filter,
  CircleEllipsis,
} from "lucide-react";
import Image from "next/image";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import GraphDataProvider from "./context/GraphDataContext";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [round, setRound] = useState(3);
  const dimension = 150;

  const handleSelectRound = useCallback((selectedRound: number) => {
    setRound(selectedRound);
  }, []);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
            width={dimension}
            height={dimension}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>

          <div className="px-3 border-t">
            <SidebarItem
              icon={<Filter size={20} />}
              text="Filter"
              onClick={() => setExpanded((curr) => !curr)}
            />

            <SidebarItem
              icon={<CircleEllipsis size={20} />}
              text="Filter round"
              onClick={() => handleSelectRound(round === 2 ? 3 : 2)}
            />
          </div>
        </SidebarContext.Provider>
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
  const { expanded } = useContext(SidebarContext) ?? { expanded: false };

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
          expanded ? "w-52 ml-3" : "w-0"
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
}
