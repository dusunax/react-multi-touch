"use client";
import Image from "next/image";
import { useRef } from "react";
import Touchable from "src/packages/components/package/touchable/Touchable";

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="m-8" ref={containerRef}>
      <Touchable
        id="test-1"
        maxTrashhold={containerRef.current?.clientWidth}
        minTrashhold={80}
      >
        <div className="bg-blue-500 w-28 h-28">
          Touchable
          <p className="text-xs truncate">
            max-width is {containerRef.current?.clientWidth}
            <br />
            min-width is {80}
          </p>
        </div>
        <Touchable.Handles />
      </Touchable>

      <Touchable id="test-2" className="-mt-10 ml-4">
        <Image
          src="/sun.png"
          alt="sun"
          width={100}
          height={100}
          className="w-full h-full"
        />
        <Touchable.Handles />
      </Touchable>
    </div>
  );
};

export default Page;
