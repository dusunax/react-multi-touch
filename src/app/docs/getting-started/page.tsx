import CodeBlock from "@/components/ui/CodeBlock";
import Link from "next/link";
import UsageExample from "./_components/UsageExample";

const code = `npm install react-multi-touch`;
const importCode = `import { MultiTouch } from "react-multi-touch";`;
const usageCode = `<MultiTouch>
  id="your-element-id"
>
  <div>
    This Element is draggable, scalable and rotatable
  </div>
  
  {/* Optional: Handles for scaling on corner by 1 finger */}
  <MultiTouch.Handles /> 

  {/* Optional: Control toggle setting for 
  dragging, rotation, scaling and reset buttons */}
  <MultiTouch.ControlSetting />
</MultiTouch>
`;

const Page = () => {
  return (
    <section className="m-8 space-y-10 flex flex-col">
      <h1 className="text-2xl font-bold">Getting started</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Install</h2>
        <p>Install the package using your package manager.</p>
        <CodeBlock language="bash" text={code} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Import</h2>
        <p>Import the component in your component file.</p>
        <CodeBlock language="tsx" text={importCode} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Usage</h2>
        <div className="flex items-center justify-between">
          Use the component in your component file.
          <Link
            href="/docs/components"
            className="text-xs text-right text-primary"
          >
            ...detail
          </Link>
        </div>
        <CodeBlock language="tsx" text={usageCode} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">Example</h2>
        <p>
          <strong className="semi-bold">In touch device,</strong> you can drag,
          scale and rotate the element below.
        </p>
        <Link
          href="/docs/gesture"
          className="block text-xs text-right text-primary"
        >
          ...gesture detail
        </Link>
        <UsageExample />
      </div>
    </section>
  );
};

export default Page;
