import { Switch } from "../ui/switch";

// Basic demo
export function SwitchDemo() {
  return (
    <div className="flex items-center p-2">
      <Switch />
    </div>
  );
}

// All variants and sizes in a responsive grid
export function SwitchVariants() {
  // All variants and sizes
  const variants = ["default", "rounded", "square", "ios"] as const;

  const sizes = ["icon", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
  const thumbVariants = ["default", "rounded", "square", "ios"] as const;

  return (
    <div className="grid gap-8 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Variants (with default size)
        </h4>
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <Switch variant={variant} />
            <span className="text-xs text-muted-foreground">{variant}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Sizes (with default variant)
        </h4>
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Switch size={size} />
            <span className="text-xs text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">
          Thumb Variants (with default variant & size)
        </h4>
        {thumbVariants.map((thumbVariant) => (
          <div key={thumbVariant} className="flex flex-col items-center gap-2">
            <Switch thumbVariant={thumbVariant} />
            <span className="text-xs text-muted-foreground">
              thumb-{thumbVariant}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <h4 className="text-sm font-medium col-span-full mb-2">Features</h4>
        <div className="flex flex-col items-center gap-2">
          <Switch showLabels labelOn="On" labelOff="Off" />
          <span className="text-xs text-muted-foreground">With labels</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Switch showIcons />
          <span className="text-xs text-muted-foreground">With icons</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Switch disabled />
          <span className="text-xs text-muted-foreground">Disabled</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Switch defaultChecked />
          <span className="text-xs text-muted-foreground">Default checked</span>
        </div>
      </div>
    </div>
  );
}

// Individual variants
export function SwitchDefault() {
  return (
    <div className="flex items-center p-2">
      <Switch variant="default" />
    </div>
  );
}

export function SwitchRounded() {
  return (
    <div className="flex items-center p-2">
      <Switch variant="rounded" />
    </div>
  );
}

export function SwitchSquare() {
  return (
    <div className="flex items-center p-2">
      <Switch variant="square" />
    </div>
  );
}

export function SwitchIOS() {
  return (
    <div className="flex items-center p-2">
      <Switch variant="ios" />
    </div>
  );
}

export function SwitchWithLabels() {
  return (
    <div className="flex items-center p-2">
      <Switch showLabels />
    </div>
  );
}

export function SwitchWithIcons() {
  return (
    <div className="flex items-center p-2">
      <Switch showIcons />
    </div>
  );
}

export function SwitchDisabled() {
  return (
    <div className="flex items-center p-2">
      <Switch disabled />
    </div>
  );
}

export function SwitchDefaultChecked() {
  return (
    <div className="flex items-center p-2">
      <Switch defaultChecked />
    </div>
  );
}

export const switchVariants = {
  demo: SwitchDemo,
  variants: SwitchVariants,
  default: SwitchDefault,
  rounded: SwitchRounded,
  square: SwitchSquare,
  ios: SwitchIOS,
  withLabels: SwitchWithLabels,
  withIcons: SwitchWithIcons,
  disabled: SwitchDisabled,
  defaultChecked: SwitchDefaultChecked,
};
