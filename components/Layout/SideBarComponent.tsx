import SideBar, { SidebarItem } from "@/components/SideBar";
import { FileQuestion, LayoutGrid, Rows, Bug, Rocket } from "lucide-react";
import { ActiveView } from "@/lib/types";

interface SidebarComponentProps {
  handleRoute: (href: string) => void;
  activeView: ActiveView;
  handleItemClick: (view: ActiveView) => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  handleRoute,
  activeView,
  handleItemClick,
}) => {
  return (
    <div className="relative z-10 w-[1/4]">
      <SideBar>
        {
          <SidebarItem
            icon={<LayoutGrid size={20} />}
            text="Grid view"
            active={activeView === "grid"}
            onClick={() => handleItemClick(ActiveView.Grid)}
          />
        }
        <SidebarItem
          icon={<Rows size={20} />}
          text="List view"
          active={activeView === "list"}
          onClick={() => handleItemClick(ActiveView.List)}
        />
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
        <SidebarItem
          icon={<FileQuestion size={20} />}
          text="Read Me"
          active={activeView === "readme"}
          onClick={() => handleItemClick(ActiveView.ReadMe)}
        />
      </SideBar>
    </div>
  );
};

export default SidebarComponent;
