import ComponentDemos from "@/components/sections/demos";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <div className="container border-x border-dashed mx-auto relative">

          <div className="block w-full h-px border-t border-border border-dashed"></div>

          {/* Hero section */}
          <Hero />

          {/* Middle horizontal line */}
          <div className="block w-full h-px border-t border-border border-dashed"></div>

          <div className="mt-6 block w-full h-px border-t border-border border-dashed"></div>
          <div className="mt-6 block w-full h-px border-t border-border border-dashed"></div>

          {/* ComponentDemos section */}
          <ComponentDemos />

          {/* Last horizontal line */}
          <div className="block w-full h-px border-t border-border border-dotted"></div>
        </div>
      </main>
    </>
  );
}
