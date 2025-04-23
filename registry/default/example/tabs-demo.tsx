import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Basic demo
export function TabsDemo() {
  return (
    <div className="flex items-center p-2">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
    </div>
  );
}

// All variants in a responsive grid
export function TabsVariants() {
  // All variants
  const variants = [
    "default",
    "underline",
    "pill",
    "rounded",
    "folder",
  ] as const;

  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 gap-8">
        <h4 className="text-sm font-medium mb-2">All Variants</h4>
        {variants.map((variant) => (
          <div key={variant} className="space-y-2">
            <Tabs
              defaultValue="account"
              variant={variant}
              className="w-full max-w-md"
            >
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="rounded-md bg-muted p-4 mt-2">
                  <p className="text-sm">{variant} variant tabs</p>
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div className="rounded-md bg-muted p-4 mt-2">
                  <p className="text-sm">Password content for {variant} tabs</p>
                </div>
              </TabsContent>
            </Tabs>
            <span className="text-xs text-muted-foreground">{variant}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Individual variants
export function TabsDefault() {
  return (
    <div className="flex items-center p-2">
      <Tabs defaultValue="account" variant="default">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
    </div>
  );
}

export function TabsUnderline() {
  return (
    <div className="flex items-center p-2">
      <Tabs defaultValue="account" variant="underline">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
    </div>
  );
}

export function TabsPill() {
  return (
    <div className="flex items-center p-2">
      <Tabs defaultValue="account" variant="pill">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
    </div>
  );
}

export function TabsRounded() {
  return (
    <div className="flex items-center p-2">
      <Tabs defaultValue="account" variant="rounded">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
    </div>
  );
}

export function TabsFolder() {
  return (
    <div className="flex items-center p-2">
      <Tabs defaultValue="account" variant="folder">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
      </Tabs>
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
