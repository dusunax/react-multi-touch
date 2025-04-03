import Code from "@/components/ui/Code";
import List from "@/components/ui/List";
import SectionWrapper from "@/components/ui/SectionWrapper";

const Page = () => {
  return (
    <SectionWrapper>
      <h1 className="text-2xl font-bold">Gesture</h1>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">1 finger action</h3>
        <p className="flex flex-wrap">
          MultiTouch has 1 finger action, such as <Code>drag</Code>,{" "}
          <Code>corner scale</Code>
        </p>
        <List className="my-6">
          <List.Item>
            <Code>drag</Code>: Drag the element by touch down and drag.
          </List.Item>
          <List.Item>
            <Code>corner scale</Code>: Touch the corner handle of the element
            and scale. Require <Code>MultiTouch.Handle</Code> component.
          </List.Item>
        </List>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">2 finger action</h3>
        <p className="flex flex-wrap">
          MultiTouch has 2 finger action, such as <Code>scale</Code>,{" "}
          <Code>rotate</Code>
        </p>
        <List className="my-6">
          <List.Item>
            <Code>scale</Code>: Scale the element by pinch gesture.
          </List.Item>
          <List.Item>
            <Code>rotate</Code>: Rotate the element by rotation gesture.
          </List.Item>
        </List>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">Triple tap</h3>
        <p className="flex flex-wrap">
          MultiTouch has triple tap action, currently only <Code>reset</Code>
        </p>
        <List className="my-6">
          <List.Item>
            <Code>reset</Code>: Reset the element to initial state. (size,
            rotate)
          </List.Item>
        </List>
      </div>
    </SectionWrapper>
  );
};

export default Page;
