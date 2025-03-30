import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { HANDLE_COLOR, ROTATION_SIDES, HANDLE_POSITIONS } from "./constant";
import useTouchable, {
  UseTouchableProps,
  UseTouchableReturns,
} from "./useTouchable";

type TouchableProps = UseTouchableProps;
type ContextValue = UseTouchableReturns["contextValue"];
interface TouchableContext extends ContextValue {
  isTouching: UseTouchableReturns["isTouching"];
  toggleActionMode: UseTouchableReturns["toggleActionMode"];
}
const TouchableContext = createContext<TouchableContext | undefined>(undefined);

const Touchable = (props: TouchableProps) => {
  const { id, children, className = "", handleMode } = props;
  const {
    size,
    touchableRef,
    events,
    contextValue,
    isTouching,
    toggleActionMode,
    actionModes,
  } = useTouchable(props);

  return (
    <TouchableContext.Provider
      value={{ ...contextValue, isTouching, toggleActionMode, actionModes }}
    >
      <div
        className={`absolute touchable__container ${className} ${
          !size.width || !size.height ? "invisible" : ""
        } ${isTouching ? "touching" : ""}
        ${isTouching && handleMode === "touching" ? "z-100" : ""}`}
        id={id}
        ref={touchableRef}
        data-current-top="top"
        {...events}
      >
        {children}
        <div className="absolute log bg-red-500 !h-auto text-xs"></div>
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
      {Object.keys(ROTATION_SIDES).map((sideId) => (
        <CornerHandle
          key={sideId}
          sideId={sideId as unknown as keyof typeof ROTATION_SIDES}
        />
      ))}
      <div
        className={`absolute w-[calc(100%-8px)] h-[calc(100%-8px)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 box-content border border-dotted ${
          "border-" + HANDLE_COLOR
        } -z-1`}
      ></div>
    </div>
  );
};

const CornerHandle = ({ sideId }: { sideId: keyof typeof ROTATION_SIDES }) => {
  const ctx = useContext(TouchableContext);
  if (!ctx) return null;
  const { cornerImageSrc, cornerStyle } = ctx;
  const side = ROTATION_SIDES[sideId];

  return (
    <div
      className={`absolute touchable__corner-handle ${HANDLE_POSITIONS[side]} ${cornerStyle} p-4 z-10`}
      data-position={side}
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
          className={`bg-white border rounded-xs border-${HANDLE_COLOR} w-2 h-2 pointer-events-none`}
        />
      )}
    </div>
  );
};

const ControlSetting = ({ className = "" }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = useContext(TouchableContext);

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".control-buttons-box")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen]);

  if (!ctx) return null;
  const { isTouching } = ctx;

  return (
    <div
      className={`touchable__control absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 ${
        !isTouching ? "invisible" : ""
      } ${className}`}
    >
      {isOpen ? (
        <ControlButtonsBox />
      ) : (
        <button
          className="mt-2 p-1 bg-white rounded-full shadow-md"
          onPointerDown={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src="/icons/setting.svg"
            alt="control"
            width={12}
            height={12}
          />
        </button>
      )}
    </div>
  );
};

const ControlButtonsBox = ({ className = "" }) => {
  const ctx = useContext(TouchableContext);
  if (!ctx) return null;
  const { toggleActionMode, actionModes } = ctx;

  return (
    <div
      className={`control-buttons-box flex items-center gap-2 py-2 px-3 bg-white rounded-lg shadow-md border border-gray-100 ${className}`}
    >
      <ControlButton
        onPointerDown={() => {
          toggleActionMode("drag");
        }}
        src="/icons/move.svg"
        alt="move"
        on={actionModes?.has("drag") ?? false}
      />
      <ControlButton
        onPointerDown={() => {
          toggleActionMode("rotate");
        }}
        src="/icons/rotate.svg"
        alt="rotate"
        on={actionModes?.has("rotate") ?? false}
      />
      <ControlButton
        onPointerDown={() => {
          toggleActionMode("scale");
        }}
        src="/icons/scale.svg"
        alt="scale"
        on={actionModes?.has("scale") ?? false}
      />
    </div>
  );
};

const ControlButton = ({
  className = "",
  onPointerDown,
  src,
  alt,
  size = 16,
  on,
}: {
  className?: string;
  onPointerDown: () => void;
  src: string;
  alt: string;
  size?: number;
  on: boolean;
}) => {
  return (
    <button
      className={`shrink-0 ${on ? "" : "opacity-30"} ${className}`}
      onPointerDown={onPointerDown}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size} height={size} />
    </button>
  );
};

Touchable.displayName = "Touchable";
Touchable.Handles = Handles;
Touchable.ControlSetting = ControlSetting;

export default Touchable;
