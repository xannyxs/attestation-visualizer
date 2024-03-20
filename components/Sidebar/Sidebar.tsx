"use client";

import { useState } from "react";
import {
  ActiveView,
  EthereumAddress,
  ICardProps as CardType,
} from "@/lib/types";
import ListView from "@/components/views/List/ListView";
import GridView from "@/components/views/Grid/GridView";
import ReadMeView from "@/components/views/ReadMe/ReadMeView";
import SidebarMenu from "./SideBarMenu";

const SideBar = ({
  addresses,
}: {
  addresses: Map<EthereumAddress, CardType>;
}) => {
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.None);

  const handleItemClick = (view: ActiveView) => {
    if (activeView === view) {
      setActiveView(ActiveView.None);
      return;
    }

    setActiveView(view);
  };

  return (
    <>
      <SidebarMenu activeView={activeView} handleItemClick={handleItemClick} />
      <div
        className={`relative ${activeView === ActiveView.None ? "z-0" : "z-20"}`}
      >
        {activeView === ActiveView.Grid && <GridView addresses={addresses} />}
        {activeView === ActiveView.List && <ListView addresses={addresses} />}
        {activeView === ActiveView.ReadMe && <ReadMeView />}
      </div>
    </>
  );
};

export default SideBar;
