![Site-Preview](https://api.microlink.io/?url=https://ui.shaduxe.com&screenshot=true&embed=screenshot.url)

**shaduxe/ui** is a built off [shadcn/ui](https://ui.shadcn.com), and now built with **Tailwind v4** to deliver even more advanced and beautifully designed components. With shaduxe/ui, you can install, customize, and deploy accessible and reusable components and blocks effortlessly.

> Looking for Tailwind v3 version? Check out [shaduxe-ui-v3 repository](https://github.com/BankkRoll/shaduxe-ui-v3) or visit [v3.shaduxe.com](https://v3.shaduxe.com/)

---

## Key Features

1. **Enhanced Component Library**
   - Variants, blocks, templates, and more for rapid application development
   - Designed to meet diverse design requirements while maintaining consistency

2. **Tailwind v4 Optimized**
   - Built from the ground up to leverage Tailwind v4's newest features
   - Improved performance and styling capabilities

3. **CLI Integration**
   - Install components directly from the shaduxe/ui registry using the `shadcn CLI`
   - Simplifies setup, letting you focus on building rather than configuring

4. **Extensive Customization**
   - Easily adaptable to your project's theme and requirements
   - Extend or override styles without breaking functionality

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
2. Modify styles and variants using your preferred styling approach with Tailwind v4.
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

shaduxe/ui is released under the [MIT license](LICENSE), ensuring freedom to use, modify, and distribute within your projects.

---

## Contributing

We welcome contributions to improve shaduxe/ui! Here's how you can help:

1. **Open an Issue**: Found a bug or have a feature request? Open an issue describing what you'd like to change, fix, or add.

2. **Submit a Pull Request**:
   - Fork the [GitHub repository](https://github.com/BankkRoll/shaduxe-ui)
   - Create your branch (`git checkout -b feature/new-component`)
   - Make your changes
   - Submit a pull request with a clear description of your improvements

3. **Share Ideas**: Suggestions for new components, variants, or blocks are always welcome!

---

## Support

Need help? Here are some options:

- **Open an Issue**: If you encounter any bugs or have questions, please [open an issue](https://github.com/BankkRoll/shaduxe-ui/issues/new) with details about your problem or question
- **Documentation**: Check our documentation for guides and examples
- **Community**: Join our community discussions in the repository's Discussions tab

