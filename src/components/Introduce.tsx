"use client";
import Image from "next/image";
import Link from "next/link";
import { MultiTouch } from "react-multi-touch";

const Introduce = () => {
  return (
    <div className="h-full center flex-col overflow-hidden">
      <aside className="center flex-col w-full max-w-md space-y-2">
        <div className="mb-20 center flex-col gap-1">
          <div className="h-20 mb-2">
            <MultiTouch id="multi-touch-icon" handleMode="always">
              <Image
                src="/icons/move.svg"
                alt="Multi Touch"
                width={70}
                height={70}
              />
              <MultiTouch.Handles />
            </MultiTouch>
          </div>
          <div className="h-10 mb-2">
            <MultiTouch id="multi-touch-icon" handleMode="always">
              <p className="text-2xl font-bold truncate">Multi Touch</p>
              <MultiTouch.Handles />
            </MultiTouch>
          </div>
          <div className="h-10 mb-2">
            <MultiTouch id="multi-touch-icon" handleMode="always">
              <p className="text-sm text-gray-500 truncate">
                Multi Touch is a library for multi-touch gestures.
              </p>
              <MultiTouch.Handles />
            </MultiTouch>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Link href="/docs/getting-started">
            <Button className="bg-[#222] text-white font-bold">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.npmjs.com/package/react-multi-touch">
            <Button>
              Package
              <img
                src="https://img.shields.io/npm/v/react-multi-touch.svg?style=square"
                alt="NPM"
              />
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
};

const Button = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`w-full center gap-2 border !border-gray-400 text-sm rounded-md px-4 py-2 shadow-sm text-center cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Introduce;
