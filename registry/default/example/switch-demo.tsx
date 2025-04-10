import { Switch } from "../ui/switch";

// Basic demo
export function SwitchDemo() {
  return <Switch />;
}

// Variant demos
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

// Size demo
export function SwitchSizes() {
  return (
    <div className="flex flex-col space-y-4">
      <Switch size="icon" />
      <Switch size="xs" />
      <Switch size="sm" />
      <Switch size="md" />
      <Switch size="lg" />
    </div>
  );
}

// Thumb variant demos
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

// Feature demos
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

export function SwitchGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <SwitchDefault />
      <SwitchRounded />
      <SwitchSquare />
      <SwitchIOS />
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
        <SwitchGrid />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        <SwitchSizes />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">With Labels</h3>
        <SwitchWithLabels />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">With Icons</h3>
        <SwitchWithIcons />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">State</h3>
        <div className="grid gap-4">
          <SwitchDisabled />
          <SwitchDefaultChecked />
        </div>
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
  default: SwitchDefault,
  rounded: SwitchRounded,
  square: SwitchSquare,
  ios: SwitchIOS,
  sizes: SwitchSizes,
  thumbDefault: SwitchThumbDefault,
  thumbRounded: SwitchThumbRounded,
  thumbSquare: SwitchThumbSquare,
  thumbIOS: SwitchThumbIOS,
  withLabels: SwitchWithLabels,
  withIcons: SwitchWithIcons,
  disabled: SwitchDisabled,
  defaultChecked: SwitchDefaultChecked,
  customThumb: SwitchCustomThumb,
  grid: SwitchGrid,
};
