"use client";
import { MultiTouch } from "react-multi-touch";

const UsageExample = () => {
  return (
    <div className="inline-block border-2 border-dashed rounded-md">
      <MultiTouch id="your-element-id">
        <div className="bg-blue-100 text-blue-500 p-3 truncate break-all shadow-md">
          This Element is <wbr />
          draggable, <wbr />
          scalable <wbr />
          and rotatable
        </div>

        {/* Optional: Handles for scaling on corner by 1 finger */}
        <MultiTouch.Handles />

        {/* Optional: Control toggle setting for 
          dragging, rotation, scaling and reset buttons */}
        <MultiTouch.ControlSetting />
      </MultiTouch>
    </div>
  );
};

export default UsageExample;
