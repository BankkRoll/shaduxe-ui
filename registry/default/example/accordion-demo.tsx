import { AlertCircle, ChevronRight, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

// Basic demo
export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// All variants demo
export function AccordionVariants() {
  return (
    <div className="grid gap-6 w-full">
      <div>
        <h4 className="text-sm font-medium mb-2">Default Variant</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger variant="default">
              Default Variant
            </AccordionTrigger>
            <AccordionContent>
              This is the default accordion style with hover underline.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Outline Variant</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger variant="outline">
              Outline Variant
            </AccordionTrigger>
            <AccordionContent variant="outline">
              This accordion has a border around the trigger and aligned content
              padding.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Ghost Variant</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger variant="ghost">Ghost Variant</AccordionTrigger>
            <AccordionContent variant="ghost">
              This accordion has a background color on hover.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Underline Variant</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger variant="underline">
              Underline Variant
            </AccordionTrigger>
            <AccordionContent>
              This accordion has a bottom border with hover effect.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

// Multiple demo
export function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I select multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes. You can select multiple items by setting the type prop to
          "multiple".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I close all items?</AccordionTrigger>
        <AccordionContent>
          Yes. You can close all items by clicking on the open ones.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Icon position
export function AccordionIconPosition() {
  return (
    <div className="grid gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Right Icon (Default)</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger iconPosition="right">
              Icon on Right Side
            </AccordionTrigger>
            <AccordionContent>
              This accordion has the chevron icon on the right (default).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Left Icon</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger iconPosition="left">
              Icon on Left Side
            </AccordionTrigger>
            <AccordionContent>
              This accordion has the chevron icon on the left.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

// Custom Icons
export function AccordionCustomIcons() {
  return (
    <div className="grid gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Plus Icon</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger icon={<Plus className="h-4 w-4 text-primary" />}>
              Custom Plus Icon
            </AccordionTrigger>
            <AccordionContent>
              This accordion uses a plus icon instead of the default chevron.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Arrow Icon</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger
              icon={<ChevronRight className="h-4 w-4 text-primary" />}
            >
              Custom Arrow Icon
            </AccordionTrigger>
            <AccordionContent>
              This accordion uses a right arrow icon instead of the default down
              chevron.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Alert Icon</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger
              variant="ghost"
              icon={<AlertCircle className="h-4 w-4 text-red-500" />}
            >
              Important Information
            </AccordionTrigger>
            <AccordionContent>
              This accordion highlights important information with an alert
              icon.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

// Animation Variants
export function AccordionAnimations() {
  return (
    <div className="grid gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Default Animation</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Default Animation</AccordionTrigger>
            <AccordionContent animation="default">
              This accordion uses the default slide animation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Fade Animation</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Fade Animation</AccordionTrigger>
            <AccordionContent animation="fade">
              This accordion uses a fade in/out animation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">No Animation</h4>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>No Animation</AccordionTrigger>
            <AccordionContent animation="none">
              This accordion has no animation for instant visibility.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

// Export all variants
export const accordionDemos = {
  demo: AccordionDemo,
  variants: AccordionVariants,
  multiple: AccordionMultiple,
  iconPosition: AccordionIconPosition,
  customIcons: AccordionCustomIcons,
  animations: AccordionAnimations,
};
