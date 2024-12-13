# shaduxe/ui

![og-meta](https://github.com/user-attachments/assets/2f571cbc-fa29-476e-b6e4-88e5372c69dc)

**shaduxe/ui** is a powerful extension of [shadcn/ui](https://ui.shadcn.com), delivering advanced and beautifully designed components to supercharge your application's UI. With shaduxe/ui, you can install, customize, and deploy accessible and reusable components effortlessly.

---

## Key Features

1. **Component Variants**
   - Provides a range of prebuilt variants for components like buttons, switches, tabs, avatars, and more.
   - Designed to meet diverse design requirements while maintaining consistency.

2. **CLI Integration**
   - Install components directly from the shaduxe/ui registry using the `shadcn CLI`.
   - Simplifies setup, letting you focus on building rather than configuring.

3. **Customization**
   - Easily adaptable to your project's theme and requirements.
   - Extend or override styles without breaking functionality.

---

## Quick Start Guide

### Step 1: Install shaduxe/ui Components

To integrate shaduxe/ui into your project, use the `shadcn CLI` to install any component from the shaduxe/ui registry. 

Run the following command:
```bash
npx shadcn@latest add "https://ui.shaduxe.com/r/[component-name]"
```

- Replace `[component-name]` with the specific component you want to install (e.g., `button`, `avatar`, `tabs`).
- This will automatically download and configure the selected component for your project.

---

### Step 2: Customizing Components

1. After installation, locate the component files in your `components` directory.
2. Modify styles and variants using your preferred styling approach (e.g., TailwindCSS or CSS-in-JS).
3. Extend functionality by adding new props or utility hooks as needed.

---

### Example: Adding a Button

To add a `button` component, run:
```bash
npx shadcn@latest add "https://ui.shaduxe.com/r/button"
```

This will:
- Download the `button` component and its dependencies.
- Register it in your project for immediate use.

Once installed, use it in your application like this:
```jsx
import { Button } from "@/components/button";

export default function Example() {
  return (
    <Button variant="outline">
      Click Me
    </Button>
  );
}
```

---

## License

shaduxe/ui is released under the MIT license, ensuring freedom to use, modify, and distribute within your projects.

---

## Contributing

We welcome all contributions to improve shaduxe/ui! Whether it’s fixing bugs, suggesting enhancements, or adding components:
1. Fork the [GitHub repository](https://github.com/BankkRoll/shaduxe-ui).
2. Create your branch (`git checkout -b feature/new-component`).
3. Submit a pull request with detailed changes.

---

## Support

Need help? Reach out to us:
- Twitter: [@bankkroll_eth](https://twitter.com/bankkroll_eth)
- GitHub: [BankkRoll/shaduxe-ui](https://github.com/BankkRoll/shaduxe-ui)
