"use client";
import Image from "next/image";
import Touchable from "src/packages/components/package/touchable/Touchable";

const Page = () => {
  const [maxTrashhold, minTrashhold] = [window.innerWidth - 60, 100];

  return (
    <div className="m-8">
      <Touchable
        id="test-1"
        maxTrashhold={maxTrashhold}
        minTrashhold={minTrashhold}
      >
        <div className="bg-blue-500 w-28 h-28">
          Touchable
          <p className="text-xs truncate">
            max size is {maxTrashhold}
            <br />
            min size is {minTrashhold}
          </p>
        </div>
        <Touchable.Handles />
      </Touchable>
      <Touchable id="test-2" className="-mt-16 ml-4">
        <Image
          src="/sun.png"
          alt="sun"
          width={100}
          height={100}
          className="w-full h-full w-28 h-28"
        />
        <Touchable.Handles />
      </Touchable>
    </div>
  );
};

export default Page;
