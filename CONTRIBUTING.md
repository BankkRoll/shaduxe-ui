# Contributing to shaduxe/ui

Thank you for your interest in contributing to shaduxe/ui! We appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new component to MagicUI.

Read the [example PR](https://github.com/BankkRoll/shaduxe-ui/pull/2) to learn which files you need to add. **You only need to change 5 files to add a new component or effect** and it only takes around 10 minutes of work!

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/BankkRoll/shaduxe-ui/compare).

## Getting Started

### Fork and Clone the Repository

1. **Fork this repository**  
   Click [here](https://github.com/BankkRoll/shaduxe-ui/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/shaduxe-ui.git
   ```

3. **Navigate to the project directory**

   ```bash
   cd shaduxe-ui
   ```

4. **Create a new branch for your changes**

   ```bash
   git checkout -b my-new-branch
   ```

5. **Install dependencies**

   ```bash
   pnpm i
   ```

6. **Create a `.env.local` file**

   ```bash
   touch .env.local && echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
   ```

7. **Run the project**
   ```bash
   pnpm dev
   ```

## Adding/Updating a Component

To add a new variant to shaduxe/ui, you will need to follow a few steps, you will need to modify several files. Follow these steps:

### 1. Add/Update Component [{component}.tsx]

First check for your component, if its there go ahead and add any new variations. If not create the main component in the `registry/default/ui` directory.

ex: `registry/default/ui/button.tsx`

```typescript
import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        expandIcon:
          "group relative bg-primary text-primary-foreground hover:bg-primary/90",
        ringHover:
          "bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2",
        ringHoverOutline:
          "border border-input bg-background transition-all duration-300  hover:ring-2 hover:ring-primary/90 hover:ring-offset-2",
        shine:
          "animate-shine bg-gradient-to-r from-primary via-primary/75 to-primary bg-[length:400%_100%] text-primary-foreground ",
        gooeyRight:
          "relative z-0 overflow-hidden bg-primary from-zinc-400 text-primary-foreground transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%] ",
        gooeyLeft:
          "relative z-0 overflow-hidden bg-primary from-zinc-400 text-primary-foreground transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%] ",
        linkHover1:
          "relative after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0",
        linkHover2:
          "relative after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface IconProps {
  Icon: React.ElementType;
  iconPlacement: "left" | "right";
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonIconProps = IconProps | IconRefProps;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      Icon,
      iconPlacement,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && iconPlacement === "left" && (
          <div className="group-hover:translate-x-100 w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:pr-2 group-hover:opacity-100">
            <Icon />
          </div>
        )}
        <Slottable>{props.children}</Slottable>
        {Icon && iconPlacement === "right" && (
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
            <Icon />
          </div>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### 2. Add/Update Component Demo [{component}-{variant}-example.tsx]

Add/Update a basic example for each variation to showcase your component in the `registry/default/ui` directory. If it has sizes please show sizes for each variant, here is example of one with sizes and one without

- ex. with sizes: `registry/default/example/button-default-example.tsx`

```typescript
import { Button } from "@/components/ui/button";

const sizes = [
  { name: "icon", label: "Icon" },
  { name: "sm", label: "Small" },
  { name: "default", label: "Default" },
  { name: "lg", label: "Large" },
] as const;

export default function ButtonDefaultExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map((size) => (
        <div key={size.name} className="flex flex-col items-center gap-2">
          <Button variant="default" size={size.name}>
            {size.label}
          </Button>
          <span className="text-sm text-muted-foreground">{size.name}</span>
        </div>
      ))}
    </div>
  );
}
```

- ex. with-out sizes: `registry/default/example/tabs-default-example.tsx`

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const TabsDefaultExample: React.FC = () => {
  return (
    <Tabs defaultValue="account">
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
};

export default TabsDefaultExample;
```

### 3. Add/Update Sidebar (Only Applies To New Additions)

Add/Update the component to the sidebar in `config/docs.ts`

```typescript
{
    title: "Button",
    href: `/docs/components/button.tsx`,
    items: [],
    label: "New",
}
```

### 4. Add/Update Docs File [{component}.mdx]

Add/Update the MDX file for documenting the component in `content/docs/components/button.mdx`

````md
---
title: Button
description: Displays a button or a component that looks like a button.
author: bankk
published: true
---

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">

```bash
npx shadcn@latest add "https://ui.shaduxe.com/r/button"
```
````

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step title="Copy the Code">
  Copy and paste the following code snippet into your project:
</Step>

<ComponentSource name="button" />

<Step>
  Make sure the import path is correct and matches your project setup:
</Step>

```tsx {1,6} showLineNumbers
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button>Click me</Button>
    </div>
  );
}
```

<Step>Update `tailwind.config.js`</Step>

Add the following animations to your `tailwind.config.js` file:

```js title="tailwind.config.js" {6,9-19} showLineNumbers
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        shine: "shine var(--duration) infinite linear",
      },
      keyframes: {
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
    },
  },
};
```

</Steps>

</TabsContent>

</Tabs>

## Button Variants

### Default Button

<ComponentPreview name="button-default-example" />

### Secondary Button

<ComponentPreview name="button-secondary-example" />

### Outline Button

<ComponentPreview name="button-outline-example" />

### Destructive Button

<ComponentPreview name="button-destructive-example" />

### Ghost Button

<ComponentPreview name="button-ghost-example" />

### Link Button

<ComponentPreview name="button-link-example" />

### Link Hover 1 Button

<ComponentPreview name="button-link-hover-1-example" />

### Link Hover 2 Button

<ComponentPreview name="button-link-hover-2-example" />

### Expand Icon Button

<ComponentPreview name="button-expand-icon-example" />

### Ring Hover Button

<ComponentPreview name="button-ring-hover-example" />

### Ring Hover Outline Button

<ComponentPreview name="button-ring-hover-outline-example" />

### Shine Button

<ComponentPreview name="button-shine-example" />

### Gooey Right Button

<ComponentPreview name="button-gooey-right-example" />

### Gooey Left Button

<ComponentPreview name="button-gooey-left-example" />
```

### 5. Add/Update Registry

Add/Update the export of the component and example in the registry files:

In `registry/registry-ui.ts` make sure that if you add or create variants with tailwind they contian the tailwind config:

```typescript
export const ui: Registry = [
  {
    name: "avatar",
    type: "registry:ui",
    files: ["ui/avatar.tsx"],
  },
  {
    name: "button",
    type: "registry:ui",
    files: ["ui/button.tsx"],
    // IMPORTANT! Required only when tailwind is in any of the variations of the component
    tailwind: {
      config: {
        theme: {
          extend: {
            animation: {
              shine: "shine var(--duration) infinite linear",
            },
            keyframes: {
              shine: {
                "0%": {
                  "background-position": "0% 0%",
                },
                "50%": {
                  "background-position": "100% 100%",
                },
                to: {
                  "background-position": "0% 0%",
                },
              },
            },
          },
        },
      },
    },
  },
];
```

### 6. Add/Update Registry Examples

Add/Update `registry/registry-examples.ts` make sure we export each the default and all variations:

```typescript
export const examples: Registry = [
  {
    name: "button-default-example",
    type: "registry:example",
    files: ["example/button-default-example.tsx"],
  },
  {
    name: "button-destructive-example",
    type: "registry:ui",
    files: ["example/button-destructive-example.tsx"],
  },
  {
    name: "button-outline-example",
    type: "registry:ui",
    files: ["example/button-outline-example.tsx"],
  },
  // ... existing examples ...
];
```

Make sure to add any necessary tailwind configurations, or other properties as needed for your specific component.

## Ask for Help

For any help or questions, please open a new GitHub issue.
