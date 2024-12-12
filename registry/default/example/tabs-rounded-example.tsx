import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

export default function TabsRoundedExample() {
  return (
    <Tabs variant="rounded" defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p>account</p>
      </TabsContent>
      <TabsContent value="password">
        <p>password</p>
      </TabsContent>
      <TabsContent value="settings">
        <p>settings</p>
      </TabsContent>
    </Tabs>
  );
}
