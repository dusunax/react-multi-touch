"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Touchable from "@components/Touchable";
import { MultiTouch } from "react-multi-touch";

const Page = () => {
  const [dimensions, setDimensions] = useState({
    maxElementSize: 1000,
    minElementSize: 100,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        maxElementSize: window.innerWidth - 60,
        minElementSize: 100,
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
    <section className="m-8">
      <Touchable
        id="test-1"
        maxElementSize={dimensions.maxElementSize}
        minElementSize={dimensions.minElementSize}
      >
        <div className="bg-blue-500 w-28 h-28">
          Touchable
          <p className="text-xs truncate">
            max size is {dimensions.maxElementSize}
            <br />
            min size is {dimensions.minElementSize}
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
    </section>
  );
};

export default Page;
