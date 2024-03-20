"use client";

import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import useIsMobile from "@/components/Layout/useIsMobile";
<<<<<<< Updated upstream
import ReadMeView from "@/components/views/ReadMe/ReadMeView";
||||||| Stash base
import ReadMeView from "@/components/views/ReadMe/ReadMeView";
import TwoGraph from "@/components/TwoGraphWrapper";
import GraphSwitch from "@/components/misc/GraphSwitch";
=======
>>>>>>> Stashed changes

const Home = () => {
  const isMobile = useIsMobile();
<<<<<<< Updated upstream
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.None);
  const [round, setRound] = useState(3);

  const handleSelectRound = useCallback((selectedRound: number) => {
    setRound(selectedRound);
  }, []);

  const handleItemClick = (view: ActiveView) => {
    if (activeView === view) {
      setActiveView(ActiveView.None);
    } else {
      setActiveView(view);
    }
  };

  const handleRoute = useCallback((href: string) => {
    window.open(href, "_blank");
  }, []);
||||||| Stash base
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.None);
  const [loadThreeGraph, setLoadThreeGraph] = useState<boolean>(true);
  const [round, setRound] = useState<number>(3);

  const handleSelectRound = useCallback((selectedRound: number) => {
    setRound(selectedRound);
  }, []);

  const handleSwitch = useCallback((selectedGraph: boolean) => {
    setLoadThreeGraph(selectedGraph);
  }, []);

  const handleItemClick = (view: ActiveView) => {
    if (activeView === view) {
      setActiveView(ActiveView.None);
    } else {
      setActiveView(view);
    }
  };

  const handleRoute = useCallback((href: string) => {
    window.open(href, "_blank");
  }, []);
=======
>>>>>>> Stashed changes

  const configWagmi = createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
    },
  });

  if (isMobile) {
    return (
      <div className="flex justify-center text-xl text-white">
        Mobile version not supported.
      </div>
    );
  }

<<<<<<< Updated upstream
  return (
    <WagmiProvider config={configWagmi}>
      <GraphDataProvider round={round}>
        <main className="flex">
          <SidebarComponent
            handleRoute={handleRoute}
            activeView={activeView}
            handleItemClick={handleItemClick}
          />
          <div
            className={`relative ${
              activeView === ActiveView.None ? "z-0" : "z-20"
            }`}
          >
            {activeView === ActiveView.Grid && <GridView />}
            {activeView === ActiveView.List && <ListView />}
            {activeView === ActiveView.ReadMe && <ReadMeView />}
          </div>
          <RoundDropdown round={round} handleSelectRound={handleSelectRound} />
          <div className="absolute">
            <ThreeGraph />
          </div>
        </main>
      </GraphDataProvider>
    </WagmiProvider>
  );
||||||| Stash base
  return (
    <WagmiProvider config={configWagmi}>
      <GraphDataProvider round={round}>
        <main className="flex">
          <SidebarComponent
            handleRoute={handleRoute}
            activeView={activeView}
            handleItemClick={handleItemClick}
          />
          <div
            className={`relative ${
              activeView === ActiveView.None ? "z-0" : "z-20"
            }`}
          >
            {activeView === ActiveView.Grid && <GridView />}
            {activeView === ActiveView.List && <ListView />}
            {activeView === ActiveView.ReadMe && <ReadMeView />}
          </div>
          <GraphSwitch
            selectedGraph={loadThreeGraph}
            handleSelectedGraph={handleSwitch}
          />
          <RoundDropdown round={round} handleSelectRound={handleSelectRound} />
          {loadThreeGraph ? (
            <div className="absolute">
              <ThreeGraph />
            </div>
          ) : (
            <div className="absolute">
              <TwoGraph />
            </div>
          )}
        </main>
      </GraphDataProvider>
    </WagmiProvider>
  );
=======
  return <WagmiProvider config={configWagmi}></WagmiProvider>;
>>>>>>> Stashed changes
};

export default Home;
