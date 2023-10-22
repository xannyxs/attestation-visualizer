import SideBar, { SidebarItem } from "@/app/components/SideBar";
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-react";

interface SidebarComponentProps {
  handleRoute: (href: string) => void;
  activeView: "grid" | "list" | "credits" | "bug" | "feature" | "none";
  handleItemClick: (view: SidebarComponentProps["activeView"]) => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  handleRoute,
  activeView,
  handleItemClick,
}) => {
  return (
    <div className="w-[1/4] z-10 relative">
      <SideBar>
        {
          // <SidebarItem
          //   icon={<LayoutGrid size={20} />}
          //   text="Grid view"
          //   active={activeView === "grid"}
          //   onClick={() => handleItemClick("grid")}
          // />
        }
        <SidebarItem
          icon={<Rows size={20} />}
          text="List view"
          active={activeView === "list"}
          onClick={() => handleItemClick("list")}
        />
        {
          // <SidebarItem
          //   icon={<Gem size={20} />}
          //   text="Credits"
          //   active={activeView === "credits"}
          //   onClick={() => handleItemClick("credits")}
          // />
        }
        <SidebarItem
          icon={<Bug size={20} />}
          text="Report bug"
          onClick={() =>
            handleRoute(
              "https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=bug_report.md",
            )
          }
        />
        <SidebarItem
          icon={<Rocket size={20} />}
          text="Feature request"
          onClick={() =>
            handleRoute(
              "https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=feature_request.md",
            )
          }
        />
      </SideBar>
    </div>
  );
};

export default SidebarComponent;
