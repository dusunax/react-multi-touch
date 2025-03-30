"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Touchable from "@components/Touchable";
import { MultiTouch } from "react-multi-touch";

const Page = () => {
  const [dimensions, setDimensions] = useState({
    maxTrashhold: 1000,
    minTrashhold: 100,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        maxTrashhold: window.innerWidth - 60,
        minTrashhold: 100,
      });
    };
    updateDimensions();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="m-8">
      <Touchable
        id="test-1"
        maxTrashhold={dimensions.maxTrashhold}
        minTrashhold={dimensions.minTrashhold}
      >
        <div className="bg-blue-500 w-28 h-28">
          Touchable
          <p className="text-xs truncate">
            max size is {dimensions.maxTrashhold}
            <br />
            min size is {dimensions.minTrashhold}
          </p>
        </div>
        <Touchable.Handles />
      </Touchable>

      <MultiTouch id="test-2" className="-mt-16 ml-4" handleMode="always">
        <Image
          src="/sun.png"
          alt="sun"
          width={100}
          height={100}
          className="w-full h-full w-28 h-28"
          priority
        />
        <MultiTouch.Handles />
        <MultiTouch.ControlSetting />
      </MultiTouch>
    </div>
  );
};

export default Page;
