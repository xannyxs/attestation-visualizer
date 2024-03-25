"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

const RoundTwoDistribution = () => {
  return (
    <>
      <TabsContent value="round2">
        <Card>
          <CardHeader>
            <CardTitle>Round 2 Badgeholder Distribution</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you are done.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="round3">
        <Card>
          <CardHeader>
            <CardTitle>Round 3 Badgeholder Distribution</CardTitle>
            <CardDescription>
              Change your password here. After saving, you will be logged out.
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
};

export default RoundTwoDistribution;
