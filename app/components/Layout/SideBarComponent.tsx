import SideBar, { SidebarItem } from "@/app/components/SideBar";
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-react";
import { ActiveView } from "@/app/types";
import { useCallback } from "react";
import { signal } from "@preact/signals-react";

export const activeView = signal<ActiveView>(ActiveView.None);

const SidebarComponent = () => {
  const handleRoute = useCallback((href: string) => {
    window.open(href, "_blank");
  }, []);

  return (
    <div className="w-[1/4] z-10 relative">
      <SideBar>
        {
          <SidebarItem
            icon={<LayoutGrid size={20} />}
            text="Grid view"
            active={activeView.value === "grid"}
            onClick={() => (activeView.value = ActiveView.Grid)}
          />
        }
        <SidebarItem
          icon={<Rows size={20} />}
          text="List view"
          active={activeView.value === "list"}
          onClick={() => (activeView.value = ActiveView.List)}
        />
        {
          // <SidebarItem
          //   icon={<Gem size={20} />}
          //   text="Credits"
          //   active={activeView === "credits"}
          //   onClick={() => activeView.value = ("credits")}
          // />
        }
        <SidebarItem
          icon={<Bug size={20} />}
          text="Report bug"
          onClick={() =>
            handleRoute(
              "https://github.com/xannyxs/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=bug_report.md",
            )
          }
        />
        <SidebarItem
          icon={<Rocket size={20} />}
          text="Feature request"
          onClick={() =>
            handleRoute(
              "https://github.com/xannyxs/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=feature_request.md",
            )
          }
        />
      </SideBar>
    </div>
  );
};

export default SidebarComponent;
