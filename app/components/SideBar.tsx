import { ChevronLast, ChevronFirst } from "lucide-react";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useGraphData } from "./GraphDataContext";
import buildAddressHashMap from "../utils/buildAddressHashmap";
import { ICardProps as CardType } from "../types";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: { children: ReactNode }) {
  const graphData = useGraphData();
  const [expanded, setExpanded] = useState(false);
  const [addressHashMap, setAddressHashMap] = useState<Map<string, CardType>>(
    new Map(),
  );

  useEffect(() => {
    const fetchData = async () => {
      if (graphData) {
        const newAddresses = await buildAddressHashMap(graphData);

        setAddressHashMap(newAddresses);
      }
    };

    fetchData();
  }, [graphData]);

  return (
    <aside className="h-screen z-10">
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
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
      className={`z-10
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
