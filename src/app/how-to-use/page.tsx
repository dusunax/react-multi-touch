"use client";
import Touchable from "src/packages/components/package/touchable/Touchable";

const Page = () => {
  return (
    <div className="m-8">
      <Touchable isSelected={true}>
        <div className="bg-blue-500 w-20 h-20">Touchable</div>
        <Touchable.Handle />
      </Touchable>

      <Touchable>
        <div className="bg-blue-400 w-50 h-50">Touchable</div>
        <Touchable.Handle />
      </Touchable>
    </div>
  );
};

export default Page;
