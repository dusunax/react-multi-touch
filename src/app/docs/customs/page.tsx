import Code from "@/components/ui/Code";
import List from "@/components/ui/List";
import SectionWrapper from "@/components/ui/SectionWrapper";

const Page = () => {
  return (
    <SectionWrapper>
      <h1 className="text-2xl font-bold">Customs</h1>

      <div className="space-y-2">
        <h3 className="text-lg font-bold">
          {"<MultiTouch>'s Optional Properties"}
        </h3>
        <p className="flex flex-wrap">
          MultiTouch also has props, such as <Code>className</Code>,
          <Code>cornerImageSrc</Code>,<Code>events</Code> for customizing the
          element.
        </p>
        <List className="my-6">
          <List.Item>
            <Code>className</Code>: Pass down the className to the element.
          </List.Item>
          <List.Item>
            <Code>cornerImageSrc</Code>: Image src to replace the corner handles
            of the element.
          </List.Item>
          <List.Item>
            <Code>cornerStyle</Code>: Pass down the className to the corner
            handle element.
          </List.Item>
          <List.Item>
            <Code>events</Code>: Pass the user defined events to the element.
            <List className="mt-4 mb-3">
              <List.Item>
                <Code>onTouchStart</Code>: Called when the element is touched.
              </List.Item>
              <List.Item>
                <Code>onTouchMove</Code>: Called when the element is moved.
              </List.Item>
              <List.Item>
                <Code>onTouchEnd</Code>: Called when the element is released.
              </List.Item>
            </List>
          </List.Item>
          <List.Item>
            <Code>minElementSize</Code>: Minimum element size(px) for the scale
            action.
          </List.Item>
          <List.Item>
            <Code>maxElementSize</Code>: Maximum element size(px) for the scale
            action.
          </List.Item>
          <List.Item>
            <Code>actionModes</Code>: Set the action modes of the element.
            <ul className="flex flex-col gap-3 mt-4 mb-3">
              <List.Item>
                <Code>drag</Code>: Move element on 1 finger drag action when it
                is exist in the set. (active by default)
              </List.Item>
              <List.Item>
                <Code>scale</Code>: Change element&apos;s size on 2 finger pinch
                action. (active by default)
              </List.Item>
              <List.Item>
                <Code>rotate</Code>: Change element&apos;s rotation on 2 finger
                rotation. (active by default)
              </List.Item>
            </ul>
          </List.Item>
          <List.Item>
            <Code>handleMode</Code>: Set the mode of the corner handles.
            <ul className="flex flex-col gap-3 mt-4 mb-3">
              <List.Item>
                <Code>touching</Code>(default): When the element is active, show
                it&apos;s corner handle element. In otherwise hide the UI.
              </List.Item>
              <List.Item>
                <Code>always</Code>: Always show the corner handle element UI.
              </List.Item>
              <List.Item>
                <Code>hide</Code>: Always hide the corner handle element. User
                can perform the corner scaling by touching handle, but handle UI
                is invisible to user.
              </List.Item>
            </ul>
          </List.Item>
        </List>
      </div>
    </SectionWrapper>
  );
};

export default Page;
