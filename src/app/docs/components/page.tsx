import Code from "@/components/ui/Code";
import CodeBlock from "@/components/ui/CodeBlock";
import SectionWrapper from "@/components/ui/SectionWrapper";

const basic = `<MultiTouch>
  id="your-element-id"
>
  <div>
    This Element is draggable, scalable and rotatable
  </div>
</MultiTouch>
`;
const handle = `<MultiTouch>
  id="your-element-id"
>
  ...
  <MultiTouch.Handle handleMode="hide">
</MultiTouch>
`;
const controlSetting = `<MultiTouch>
  id="your-element-id"
>
  ...
  <MultiTouch.ControlSetting>
</MultiTouch>
`;

const Page = () => {
  return (
    <SectionWrapper>
      <h1 className="text-2xl font-bold">Components</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">{"<MultiTouch>"}</h2>
        <p>
          MultiTouch is a component that allows you to handle touch events. It
          has <Code>TouchableContext</Code> interface internally, so we can hold
          the context.
        </p>
        <p>
          MultiTouch <Code>id</Code> is required. It is used to identify the
          element on interaction, like when touch outside of element, than it is
          the touching state of that element.
        </p>
        <CodeBlock language="tsx" text={basic} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">{"<MultiTouch.Handle>"}</h2>
        <p>
          Handle component is nassasary to perform 1 finger corner scaling.
          Touch the corner handle element <Code>.touchable__corner-handle</Code>{" "}
          to perform scaling based on certain corner. (
          <Code>ROTATION_SIDES</Code>)
        </p>
        <p>
          If you wish to perform the corner scaling but hide the handle, use the
          parameter
          <Code>handleMode</Code> to set handle UI visibility mode. (
          <Code>HANDLE_VISIBILITY_MODES</Code>)
        </p>
        <CodeBlock language="tsx" text={handle} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">{"<MultiTouch.ControlSetting>"}</h2>
        <p>
          ControlSetting component is used to set the control settings of the
          ActionModes. ControlSetting has on/off state that shows button box for
          control buttons. With toggle button, you can toggle the action mode. (
          <Code>INTERACTION_MODES</Code>)
        </p>
        <p>
          And ControlSetting has reset button, that reset the all state of the
          element as initial state. (same logic as the triple tap to reset
          functionality)
        </p>
        <CodeBlock language="tsx" text={controlSetting} />
      </div>
    </SectionWrapper>
  );
};

export default Page;
