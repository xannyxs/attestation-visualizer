"use server";

import RoundTwoDistribution from "./components/round2";
import TabsRound from "./components/tabs";
import { Tabs } from "@/components/ui/tabs";

const Distribution = async () => {
  // Arrow to go back?
  return (
    <div className="flex justify-center p-4 h-screen bg-white">
      <div>
        <h1 className="flex justify-center m-4 text-2xl font-bold">
          Distribution of Badgeholders
        </h1>
        <Tabs defaultValue="round3" className="w-[400px]">
          <TabsRound />
          <RoundTwoDistribution />
        </Tabs>
      </div>
    </div>
  );
};

export default Distribution;
