import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

export default function TabsVerticalExample() {
  return (
    <Tabs
      defaultValue="account"
      orientation="vertical"
      className="flex w-[400px]"
    >
      <TabsList className="flex-col h-auto">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <div className="ml-4">
        <TabsContent value="account">
          <p>account</p>
        </TabsContent>
        <TabsContent value="password">
          <p>password</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>settings</p>
        </TabsContent>
      </div>
    </Tabs>
  );
}
