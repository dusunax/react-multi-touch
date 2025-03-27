import Image from "next/image";
import { createContext, useContext } from "react";
import { COLOR, POSITION } from "./constant";
import useTouchable from "./useTouchable";

interface TouchableContext {
  isSelected: boolean;
  isTouchable: boolean;
  hasCorner: boolean;
  cornerImageSrc: string;
  cornerStyle: string;
}

interface TouchableProps {
  children: React.ReactNode;
  isSelected?: TouchableContext["isSelected"];
  isTouchable?: TouchableContext["isTouchable"];
  hasCorner?: TouchableContext["hasCorner"];
  cornerImageSrc?: TouchableContext["cornerImageSrc"];
  cornerStyle?: TouchableContext["cornerStyle"];
}

const TouchableContext = createContext<TouchableContext | undefined>(undefined);

const Touchable = ({ children, ...props }: TouchableProps) => {
  const { size, contextValue, touchableRef } = useTouchable(props);

  return (
    <TouchableContext.Provider value={contextValue}>
      <div
        className={`absolute bg-red-500 ${
          !size.width || !size.height ? "invisible" : ""
        }`}
        ref={touchableRef}
      >
        {children}
      </div>
      <div style={{ width: size.width, height: size.height }} />
    </TouchableContext.Provider>
  );
};

const Handle = ({ className }: { className?: string }) => {
  const ctx = useContext(TouchableContext);
  if (!ctx) return null;
  const { hasCorner, isSelected } = ctx;
  if (!hasCorner || !isSelected) return null;

  return (
    <div
      className={`absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 box-content ${className}`}
    >
      {Object.keys(POSITION).map((position) => (
        <CornerHandle
          key={position}
          position={position as keyof typeof POSITION}
        />
      ))}
      <div
        className={`absolute w-[calc(100%-8px)] h-[calc(100%-8px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 box-content border border-dotted ${
          "border-" + COLOR
        } -z-1`}
      ></div>
    </div>
  );
};

const CornerHandle = ({ position }: { position: keyof typeof POSITION }) => {
  const ctx = useContext(TouchableContext);
  if (!ctx) return null;
  const { cornerImageSrc, cornerStyle } = ctx;

  return (
    <div className={`absolute ${POSITION[position]} ${cornerStyle}`}>
      {cornerImageSrc ? (
        <Image
          src={cornerImageSrc}
          alt="corner"
          width={10}
          height={10}
          style={{
            objectFit: "contain",
          }}
          className={cornerStyle}
        />
      ) : (
        <div
          className={`bg-white border rounded-xs border-${COLOR} w-2 h-2`}
        ></div>
      )}
    </div>
  );
};

Touchable.displayName = "Touchable";
Touchable.Handle = Handle;

export default Touchable;
