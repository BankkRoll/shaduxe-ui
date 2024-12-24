import "@/styles/mdx.css";

import { ComponentPreview } from "../component-preview";

export default function ComponentDemos() {
  return (
    <section id="component-demos" className="container max-w-5xl py-14">
      <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground">
        Demo Blocks
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Take a look at some blocks that you can use in your projects.
      </h3>

<div className="space-y-6">
      <ComponentPreview preview={true} name="pricing-one" />

      <ComponentPreview preview={true} name="pricing-two" />

      <ComponentPreview preview={true} name="pricing-three" />
      </div>
    </section>
  );
}
