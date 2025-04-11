import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Basic demo
export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}

// Variant demos
export function TabsVariants() {
  return (
    <div className="flex flex-col gap-8">
      <Tabs
        defaultValue="account"
        variant="default"
        className="w-full max-w-md"
      >
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Default variant</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>

      <Tabs
        defaultValue="account"
        variant="underline"
        className="w-full max-w-md"
      >
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Underline variant</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>

      <Tabs defaultValue="account" variant="pill" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Pill variant</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>

      <Tabs
        defaultValue="account"
        variant="rounded"
        className="w-full max-w-md"
      >
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Rounded variant</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>

      <Tabs defaultValue="account" variant="folder" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Folder variant</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
    </div>
  );
}

// Individual variants for reference
export function TabsDefault() {
  return (
    <Tabs defaultValue="account" variant="default">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}

export function TabsUnderline() {
  return (
    <Tabs defaultValue="account" variant="underline">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}

export function TabsPill() {
  return (
    <Tabs defaultValue="account" variant="pill">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}

export function TabsRounded() {
  return (
    <Tabs defaultValue="account" variant="rounded">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}

export function TabsFolder() {
  return (
    <Tabs defaultValue="account" variant="folder">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}

export default function TabsDemos() {
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <TabsDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Variants</h3>
        <TabsVariants />
      </div>
    </div>
  );
}

export const tabsVariants = {
  demo: TabsDemo,
  variants: TabsVariants,
  default: TabsDefault,
  underline: TabsUnderline,
  pill: TabsPill,
  rounded: TabsRounded,
  folder: TabsFolder,
};
