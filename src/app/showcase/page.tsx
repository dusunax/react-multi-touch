"use client";
import Image from "next/image";
import { useMemo } from "react";
import { MultiTouch } from "react-multi-touch";
import { motion } from "motion/react";
import Touchable from "@/components/package/touchable/Touchable";

const Page = () => {
  const itemLength = 24;
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  const randomColors = useMemo(() => {
    return Array.from({ length: itemLength }).map(() => randomColor());
  }, []);

  return (
    <section className="p-8 h-full overflow-hidden">
      <div className="fixed top-24 right-0 w-40 h-40 z-100">
        <Touchable id="fish" handleMode="always">
          <Image src="/sparkle.png" alt="sparkle" width={100} height={100} />
          <Touchable.Handles />
          <Touchable.ControlSetting />
        </Touchable>
      </div>

      <MultiTouch id="sun" className="z-100">
        <motion.div
          initial={{ top: "100px", opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: 1 }}
          className="relative"
        >
          <Image
            src="/sun.png"
            alt="sun"
            width={100}
            height={100}
            className="w-full h-full w-28 h-28"
            priority
          />
        </motion.div>
        <MultiTouch.Handles />
        <MultiTouch.ControlSetting />
      </MultiTouch>

      <div className="grid grid-cols-16 ml-24">
        {Array.from({ length: itemLength }).map((_, index) => (
          <MultiTouch
            id={"color-" + index}
            maxElementSize={1000}
            minElementSize={20}
            className="relative -ml-24 h-10"
            key={index}
          >
            <motion.div
              className="relative w-full h-full rounded-full"
              initial={{ opacity: 0, top: 20 }}
              animate={{
                opacity: 1,
                top: 0,
                backgroundColor: randomColors[index],
              }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            />
            <MultiTouch.Handles />
          </MultiTouch>
        ))}
      </div>

      <div className="w-full h-full fixed left-0 top-0 pointer-events-none">
        <Image src={"/path/fish.svg"} alt="fish" fill className="scale-80" />
      </div>
    </section>
  );
};

export default Page;
