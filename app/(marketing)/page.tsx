import ComponentDemos from "@/components/sections/demos";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import PricingTemplatesSection from "@/components/sections/pricing-templates";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <div className="container border-x border-dashed mx-auto relative">
          <div className="block w-full h-px border-t border-border border-dashed"></div>

          <Hero />

          <div className="block w-full h-px border-t border-border border-dashed"></div>

          <div className="mt-6 block w-full h-px border-t border-border border-dashed"></div>
          <div className="mt-6 block w-full h-px border-t border-border border-dashed"></div>

          <ComponentDemos />

          <div className="block w-full h-px border-t border-border border-dashed"></div>

          <div className="mt-6 block w-full h-px border-t border-border border-dashed"></div>
          <div className="mt-6 block w-full h-px border-t border-border border-dashed"></div>

          <PricingTemplatesSection />
          <Pricing />
        </div>
      </main>
    </>
  );
}
