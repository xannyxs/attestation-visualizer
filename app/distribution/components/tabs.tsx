"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsRound = () => {
  return (
    <TabsList className="grid grid-cols-2 w-full">
      <TabsTrigger value="round2">Round 2</TabsTrigger>
      <TabsTrigger value="round3">Round 3</TabsTrigger>
    </TabsList>
  );
};

export default TabsRound;
