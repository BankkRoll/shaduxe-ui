import { Switch } from "../ui/switch";

// Basic demo
export function SwitchDemo() {
  return <Switch />;
}

// Variant demos
export function SwitchVariants() {
  return (
    <div className="flex items-center gap-4">
      <Switch variant="default" />
      <Switch variant="rounded" />
      <Switch variant="square" />
      <Switch variant="ios" />
    </div>
  );
}

// Size demos
export function SwitchSizes() {
  return (
    <div className="flex items-center gap-4">
      <Switch size="icon" />
      <Switch size="xs" />
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
    </div>
  );
}

// Thumb variant demos
export function SwitchThumbVariants() {
  return (
    <div className="flex items-center gap-4">
      <Switch thumbVariant="default" />
      <Switch thumbVariant="rounded" />
      <Switch thumbVariant="square" />
      <Switch thumbVariant="ios" />
    </div>
  );
}

// Feature demos
export function SwitchFeatures() {
  return (
    <div className="flex items-center gap-4">
      <Switch showLabels />
      <Switch showIcons />
      <Switch disabled />
      <Switch defaultChecked />
    </div>
  );
}

// Individual variants for reference
export function SwitchDefault() {
  return <Switch variant="default" />;
}

export function SwitchRounded() {
  return <Switch variant="rounded" />;
}

export function SwitchSquare() {
  return <Switch variant="square" />;
}

export function SwitchIOS() {
  return <Switch variant="ios" />;
}

export function SwitchThumbDefault() {
  return <Switch thumbVariant="default" />;
}

export function SwitchThumbRounded() {
  return <Switch thumbVariant="rounded" />;
}

export function SwitchThumbSquare() {
  return <Switch thumbVariant="square" />;
}

export function SwitchThumbIOS() {
  return <Switch thumbVariant="ios" />;
}

export function SwitchWithLabels() {
  return <Switch showLabels />;
}

export function SwitchWithIcons() {
  return <Switch showIcons />;
}

export function SwitchDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Switch disabled />
      <label className="text-sm font-medium text-muted-foreground">
        Disabled
      </label>
    </div>
  );
}

export function SwitchDefaultChecked() {
  return (
    <div className="flex items-center space-x-2">
      <Switch defaultChecked />
      <label className="text-sm font-medium">Enabled</label>
    </div>
  );
}

export function SwitchCustomThumb() {
  return (
    <div className="grid gap-4">
      <Switch variant="default" thumbVariant="rounded" />
      <Switch variant="default" thumbVariant="square" />
    </div>
  );
}

export default function SwitchDemos() {
  return (
    <div className="grid gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default</h3>
        <SwitchDemo />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Variants</h3>
        <SwitchVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <SwitchSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Thumb Variants</h3>
        <SwitchThumbVariants />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Features</h3>
        <SwitchFeatures />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Custom Thumb</h3>
        <SwitchCustomThumb />
      </div>
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
  sizes: SwitchSizes,
  thumbVariants: SwitchThumbVariants,
  thumbDefault: SwitchThumbDefault,
  thumbRounded: SwitchThumbRounded,
  thumbSquare: SwitchThumbSquare,
  thumbIOS: SwitchThumbIOS,
  features: SwitchFeatures,
  withLabels: SwitchWithLabels,
  withIcons: SwitchWithIcons,
  disabled: SwitchDisabled,
  defaultChecked: SwitchDefaultChecked,
  customThumb: SwitchCustomThumb,
};
