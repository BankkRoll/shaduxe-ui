import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// Basic demo
export function AlertDemo() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}

// All variants in a responsive grid
export function AlertVariants() {
  return (
    <div className="grid gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Default Alert</h4>
        <Alert>
          <AlertCircle />
          <AlertTitle>Default Alert</AlertTitle>
          <AlertDescription>
            This is a default alert with an icon.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Destructive Alert</h4>
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Destructive Alert</AlertTitle>
          <AlertDescription>
            This is a destructive alert for critical errors or warnings.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Success Alert</h4>
        <Alert variant="success">
          <CheckCircle />
          <AlertTitle>Success Alert</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Warning Alert</h4>
        <Alert variant="warning">
          <AlertTriangle />
          <AlertTitle>Warning Alert</AlertTitle>
          <AlertDescription>
            Please be careful with these settings.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Info Alert</h4>
        <Alert variant="info">
          <Info />
          <AlertTitle>Info Alert</AlertTitle>
          <AlertDescription>
            This is an informative alert with additional details.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Outline Alert</h4>
        <Alert variant="outline">
          <Info />
          <AlertTitle>Outline Alert</AlertTitle>
          <AlertDescription>
            This alert has a simple outline style.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Sizes demo
export function AlertSizes() {
  return (
    <div className="grid gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small Alert</h4>
        <Alert size="sm">
          <Info />
          <AlertTitle>Small Alert</AlertTitle>
          <AlertDescription>
            This is a small alert with compact sizing.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Default Size Alert</h4>
        <Alert>
          <Info />
          <AlertTitle>Default Size Alert</AlertTitle>
          <AlertDescription>This is a default size alert.</AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Large Alert</h4>
        <Alert size="lg">
          <Info />
          <AlertTitle>Large Alert</AlertTitle>
          <AlertDescription>
            This is a large alert with more padding.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Without Icon
export function AlertWithoutIcon() {
  return (
    <div className="grid gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Alert Without Icon</h4>
        <Alert withIcon={false}>
          <AlertTitle>No Icon</AlertTitle>
          <AlertDescription>
            This alert doesn't have an icon and adjusts its layout accordingly.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Alert With Custom Icon</h4>
        <Alert icon={<Info className="text-blue-500 h-6 w-6" />}>
          <AlertTitle>Custom Icon</AlertTitle>
          <AlertDescription>
            This alert has a custom styled icon.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

// Export all variants
export const alertDemos = {
  demo: AlertDemo,
  variants: AlertVariants,
  sizes: AlertSizes,
  withoutIcon: AlertWithoutIcon,
};
