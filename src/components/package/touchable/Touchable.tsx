import Image from "next/image";
import { createContext, useContext } from "react";
import { COLOR, DEFAULT_HANDLE_MODE, POSITION, HANDLE_MODE } from "./constant";
import useTouchable from "./useTouchable";

type ContextValue = ReturnType<typeof useTouchable>["contextValue"];
interface TouchableContext extends ContextValue {
  isTouching: boolean;
}

interface TouchableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  cornerImageSrc?: TouchableContext["cornerImageSrc"];
  cornerStyle?: TouchableContext["cornerStyle"];
  minTrashhold?: number;
  maxTrashhold?: number;
  handleMode?: (typeof HANDLE_MODE)[number];
}

const TouchableContext = createContext<TouchableContext | undefined>(undefined);

const Touchable = ({
  id,
  children,
  className = "",
  ...props
}: TouchableProps) => {
  const { size, touchableRef, events, contextValue, isTouching } = useTouchable(
    {
      id,
      handleMode: props.handleMode || DEFAULT_HANDLE_MODE,
      ...props,
    }
  );

  return (
    <TouchableContext.Provider value={{ ...contextValue, isTouching }}>
      <div
        className={`absolute touchable__container ${className} ${
          !size.width || !size.height ? "invisible" : ""
        } ${isTouching ? "touching" : ""}
        ${isTouching && props.handleMode === "touching" ? "z-100" : ""}`}
        id={id}
        ref={touchableRef}
        {...events}
      >
        {children}
      </div>
      <div style={{ ...size }} className="touchable__relative-size" />
    </TouchableContext.Provider>
  );
};

const Handles = ({ className = "" }: { className?: string }) => {
  const ctx = useContext(TouchableContext);
  if (!ctx) return null;
  const { isTouching } = ctx;

  return (
    <div
      className={`absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 box-content ${
        !isTouching ? "invisible" : ""
      } ${className} `}
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
    <div
      className={`absolute ${POSITION[position]}  ${cornerStyle} p-4 z-10`}
      data-position={position}
    >
      {cornerImageSrc ? (
        <Image
          src={cornerImageSrc}
          alt="corner"
          width={10}
          height={10}
          style={{
            objectFit: "contain",
          }}
          className={`pointer-events-none ${cornerStyle}`}
        />
      ) : (
        <div
          className={`bg-white border rounded-xs border-${COLOR} w-2 h-2 pointer-events-none`}
        />
      )}
    </div>
  );
};

Touchable.displayName = "Touchable";
Touchable.Handles = Handles;

export default Touchable;
