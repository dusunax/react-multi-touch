import {
  type Touch,
  type TouchEvent,
  type TouchEventHandler,
  type TouchList,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  INTERACTION_MODES,
  DEFAULT_HANDLE_VISIBILITY,
  HANDLE_VISIBILITY_MODES,
  type RotationSide,
} from "@constants/constant";
import { ERRORS } from "@constants/errors";

export interface UseTouchableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  cornerImageSrc?: string;
  cornerStyle?: string;
  minElementSize?: number;
  maxElementSize?: number;
  handleMode?: (typeof HANDLE_VISIBILITY_MODES)[number];
  events?: {
    onTouchStart?: EventHandler;
    onTouchMove?: EventHandler;
    onTouchEnd?: EventHandler;
  };
  actionModes?: Set<(typeof INTERACTION_MODES)[number]>;
}
type EventHandler = TouchEventHandler<HTMLDivElement>;
type ContextValue = Required<
  Pick<UseTouchableProps, "cornerImageSrc" | "cornerStyle">
>;
type PinchZoomSide = RotationSide | "center";

const defaultValues: ContextValue = {
  cornerImageSrc: "",
  cornerStyle: "",
};

const MOVE_ORIGIN = {
  "top-left": [-1, -1],
  "top-right": [0, -1],
  "bottom-left": [-1, 0],
  "bottom-right": [0, 0],
} as const;

const ROTATION_SIDES = {
  0: "top-left",
  1: "top-right",
  2: "bottom-left",
  3: "bottom-right",
} as const;

const SIDE_MAP = {
  top: [0, 1, 2, 3],
  left: [2, 0, 3, 1],
  bottom: [3, 2, 1, 0],
  right: [1, 3, 0, 2],
} as const;

const useTouchable = (props: UseTouchableProps) => {
  const {
    id,
    handleMode = DEFAULT_HANDLE_VISIBILITY,
    events: userSetEvents,
    actionModes: initialActionModes = new Set(INTERACTION_MODES),
  } = props;
  const eventCacheRef = useRef<TouchEvent | null>(null);
  const touchableRef = useRef<HTMLDivElement>(null);
  const touchCountRef = useRef<number>(0);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [domRect, setDomRect] = useState<DOMRect | null>(null);
  const [initialSize, setInitialSize] = useState<Pick<
    DOMRect,
    "width" | "height"
  > | null>(null);
  const [actionModes, setActionModes] =
    useState<Set<(typeof INTERACTION_MODES)[number]>>(initialActionModes);
  const [isInitialState, setIsInitialState] = useState(true);
  const [isSupported, setIsSupported] = useState(true);

  const [isTouching, setIsTouching] = useState(
    handleMode === "always" ? true : false
  );
  const {
    minElementSize = 20,
    maxElementSize = Infinity,
    ...contextProps
  } = props;
  const contextValue = {
    ...defaultValues,
    ...contextProps,
    isInitialState,
  };

  /**
   * Validation
   */
  useEffect(() => {
    if (minElementSize > maxElementSize) {
      throw new Error(ERRORS["INVAILD_SCALE_LIMIT"].message);
    }
  }, [minElementSize, maxElementSize]);

  useLayoutEffect(() => {
    if (!("PointerEvent" in window && navigator.maxTouchPoints > 0)) {
      console.error(ERRORS["NOT_SUPPORTED"].message);
      setIsSupported(false);
    }
  }, []);

  /**
   * State Update
   */
  /** */
  const updateIsTouching = useCallback(
    (el: HTMLElement | null) => {
      if (!el || el.id !== id) {
        setIsTouching(false);
        return;
      }
      setIsTouching(true);
    },
    [id]
  );

  const updateElement = useCallback(
    ({
      touchable,
      width,
      height,
      left,
      top,
    }: {
      touchable: HTMLElement;
      width?: number;
      height?: number;
      left?: number;
      top?: number;
    }) => {
      if (width && height) {
        const newWidth = Math.max(
          minElementSize,
          Math.min(width, maxElementSize)
        );
        const newHeight = Math.max(
          minElementSize,
          Math.min(height, maxElementSize)
        );
        touchable.style.width = `${newWidth}px`;
        touchable.style.height = `${newHeight}px`;

        const touchableChild = Array.from(touchable.children) as HTMLElement[];
        if (!touchableChild) return;
        touchableChild
          .filter((e) => !e.classList.contains("touchable__control"))
          .forEach((child) => {
            child.style.width = `${newWidth}px`;
            child.style.height = `${newHeight}px`;
          });
      }

      if (left && top) {
        touchable.style.left = `${left}px`;
        touchable.style.top = `${top}px`;
      }
    },
    [minElementSize, maxElementSize]
  );

  const resetToInitialState = useCallback(() => {
    const touchable = touchableRef.current;

    if (touchableRef.current && touchable && initialSize) {
      const { width, height } = initialSize;
      const currentStyle = getStyle(touchable);
      const deltaWidth = width - currentStyle.width;
      const deltaHeight = height - currentStyle.height;
      const newLeft = currentStyle.left - deltaWidth / 2;
      const newTop = currentStyle.top - deltaHeight / 2;

      touchable.style.transform = `rotate(0deg)`;
      updateElement({
        touchable,
        width,
        height,
        left: newLeft,
        top: newTop,
      });
    }
    setActionModes(new Set(INTERACTION_MODES));
    setIsInitialState(true);
  }, [updateElement, initialSize]);

  const updateTouchCount = useCallback(() => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
    touchCountRef.current += 1;
    if (touchCountRef.current >= 3) {
      resetToInitialState();
    }

    touchTimerRef.current = setTimeout(() => {
      touchCountRef.current = 0;
    }, 300);
  }, [resetToInitialState]);

  const toggleActionMode = (mode: (typeof INTERACTION_MODES)[number]) => {
    setActionModes((prev) => {
      const newModes = new Set(prev);
      if (newModes.has(mode)) {
        newModes.delete(mode);
      } else {
        newModes.add(mode);
      }
      return newModes;
    });
  };

  /**
   * Functionality
   */
  /** */
  const drag = useCallback(
    (event: TouchEvent, touchable: HTMLElement, cachedTouches: TouchList) => {
      if (!cachedTouches || cachedTouches.length < 1) return;

      try {
        const touch = Array.from(event.touches)[0];
        const [left, top] = [
          parseFloat(window.getComputedStyle(touchable).left),
          parseFloat(window.getComputedStyle(touchable).top),
        ];
        const [diffX, diffY] = [
          touch.clientX - cachedTouches[0].clientX,
          touch.clientY - cachedTouches[0].clientY,
        ];
        const [newLeft, newTop] = [left + diffX, top + diffY];

        touchable.style.left = `${newLeft}px`;
        touchable.style.top = `${newTop}px`;
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  const rotate = useCallback(
    (event: TouchEvent, touchable: HTMLElement, cachedTouches: TouchList) => {
      const touches = Array.from(event.touches);
      if (cachedTouches.length < 2 || touches.length < 2) return;

      try {
        const getAngle = (touch1: Touch, touch2: Touch) => {
          return (
            (Math.atan2(
              touch2.clientY - touch1.clientY,
              touch2.clientX - touch1.clientX
            ) *
              180) /
            Math.PI
          );
        };

        const currentAngle = getAngle(touches[0], touches[1]);
        const previousAngle = getAngle(cachedTouches[0], cachedTouches[1]);

        const rotation = currentAngle - previousAngle;
        const currentRotation = getComputedStyle(touchable).transform;
        let currentDegrees = 0;

        if (currentRotation && currentRotation !== "none") {
          const matrix = new DOMMatrix(currentRotation);
          currentDegrees = (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
        }

        const newRotation = currentDegrees + rotation;
        touchable.style.transform = `rotate(${newRotation}deg)`;

        const normalizedRotation = ((newRotation % 360) + 360) % 360;
        let currentTop;
        if (normalizedRotation <= 45 || normalizedRotation > 315) {
          currentTop = "top";
        } else if (normalizedRotation <= 135) {
          currentTop = "right";
        } else if (normalizedRotation <= 225) {
          currentTop = "bottom";
        } else {
          currentTop = "left";
        }

        touchable.dataset.currentTop = currentTop;
      } catch (e) {
        console.error(e);
      }
    },
    []
  );

  /** scale element by side with 1 finger
   * - need `<Touchable.Handles>` component to be rendered
   * - can hide handles by setting `showCorner` to false
   */
  const scaleOnSide = useCallback(
    (
      event: TouchEvent,
      side: PinchZoomSide,
      touchable: HTMLElement,
      cachedTouches: TouchList
    ) => {
      if (cachedTouches.length < 1 || side === "center") return;

      try {
        const touch = Array.from(event.touches)[0];
        const prevTouch = cachedTouches[0];
        const style = getStyle(touchable);

        const [diffX, diffY] = [
          touch.clientX - prevTouch.clientX,
          touch.clientY - prevTouch.clientY,
        ];

        let newWidth = style.width;
        let newHeight = style.height;
        let newLeft = style.left;
        let newTop = style.top;

        const currentTop = touchable.dataset
          .currentTop as keyof typeof SIDE_MAP;
        const sideMap = SIDE_MAP[currentTop] ?? SIDE_MAP.top;
        const sideIndex = Object.values(ROTATION_SIDES).indexOf(side);
        const adjustedSideIndex = sideMap[sideIndex];
        const adjustSide =
          ROTATION_SIDES[adjustedSideIndex as keyof typeof ROTATION_SIDES];
        const moveOrigin = MOVE_ORIGIN[adjustSide as keyof typeof MOVE_ORIGIN];

        switch (side) {
          case "top-left":
            newWidth -= diffX;
            newHeight -= diffY;
            break;
          case "top-right":
            newWidth += diffX;
            newHeight -= diffY;
            break;
          case "bottom-left":
            newWidth -= diffX;
            newHeight += diffY;
            break;
          case "bottom-right":
            newWidth += diffX;
            newHeight += diffY;
            break;
        }

        newLeft -= moveOrigin[0] * diffX;
        newTop -= moveOrigin[1] * diffY;

        requestAnimationFrame(() => {
          updateElement({
            touchable,
            width: newWidth,
            height: newHeight,
            left: newLeft,
            top: newTop,
          });
        });
      } catch (e) {
        console.error(e);
      }
    },
    [updateElement]
  );

  /** scale element by center when pinch zoom with 2 fingers */
  const scale = useCallback(
    (event: TouchEvent, touchable: HTMLElement, cachedTouches: TouchList) => {
      const touches = Array.from(event.touches);
      if (cachedTouches.length < 2 || touches.length < 2) {
        return;
      }

      const [touch1, touch2] = [touches[0], touches[1]];
      const distance = Math.sqrt(
        Math.pow(touch1.clientX - touch2.clientX, 2) +
          Math.pow(touch1.clientY - touch2.clientY, 2)
      );

      const prevDistance = Math.sqrt(
        Math.pow(cachedTouches[0].clientX - cachedTouches[1].clientX, 2) +
          Math.pow(cachedTouches[0].clientY - cachedTouches[1].clientY, 2)
      );
      const diff = distance - prevDistance;
      const scale = 1 + diff / 100;

      const { width, height, left, top } = getStyle(touchable);
      const widthScale = Math.floor(width * scale);
      const heightScale = Math.floor(height * scale);
      const deltaWidth = widthScale - width;
      const deltaHeight = heightScale - height;
      const newLeft = left - deltaWidth / 2;
      const newTop = top - deltaHeight / 2;

      updateElement({
        touchable,
        width: widthScale,
        height: heightScale,
        left: newLeft,
        top: newTop,
      });
    },
    [updateElement]
  );

  /**
   * Touch Event Handler
   */
  /** */
  const onTouchStart = useCallback(
    (event: TouchEvent) => {
      userSetEvents?.onTouchStart?.(event as TouchEvent<HTMLDivElement>);

      const touchable = touchableRef.current;
      if (!touchable) return;

      updateTouchCount();
      updateIsTouching(touchable);

      eventCacheRef.current = event;
      if (isInitialState) {
        setIsInitialState(false);
      }
    },
    [isInitialState, userSetEvents, updateTouchCount, updateIsTouching]
  );

  const onTouchMove = useCallback(
    (event: TouchEvent) => {
      userSetEvents?.onTouchMove?.(event as TouchEvent<HTMLDivElement>);

      const touchable = touchableRef.current;
      const cachedTouches =
        eventCacheRef.current?.touches ?? ([] as unknown as TouchList);
      if (!touchable || !cachedTouches) return;

      if (event.touches.length === 1) {
        const side = (event.target as HTMLElement).getAttribute(
          "data-position"
        ) as PinchZoomSide;

        if (side && actionModes.has("scale")) {
          scaleOnSide(event, side, touchable, cachedTouches);
        } else if (actionModes.has("drag")) {
          drag(event, touchable, cachedTouches);
        }
      }
      if (event.touches.length === 2) {
        if (actionModes.has("scale")) {
          scale(event, touchable, cachedTouches);
        }
        if (actionModes.has("rotate")) {
          rotate(event, touchable, cachedTouches);
        }
      }
      eventCacheRef.current = event;
    },
    [actionModes, userSetEvents, drag, scale, rotate, scaleOnSide]
  );

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      userSetEvents?.onTouchEnd?.(event as TouchEvent<HTMLDivElement>);

      eventCacheRef.current = null;
    },
    [userSetEvents]
  );

  /**
   * Utility
   */
  /** */
  const getStyle = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    return {
      ...style,
      left: parseFloat(style.left),
      top: parseFloat(style.top),
      bottom: parseFloat(style.bottom),
      right: parseFloat(style.right),
      width: parseFloat(style.width),
      height: parseFloat(style.height),
    };
  };

  /**
   * Side Effects
   */
  /** */
  // Update Relative Element Size
  useEffect(() => {
    const updateDomRect = () => {
      if (touchableRef.current) {
        const domRect = touchableRef.current.getBoundingClientRect();
        setDomRect(domRect);
        setInitialSize({
          width: domRect.width,
          height: domRect.height,
        });
      }
    };
    updateDomRect();
  }, []);

  useEffect(() => {
    // if child is only element that has size,
    // update domRect to child size after image is loaded
    const img = touchableRef.current?.querySelector("img") as HTMLImageElement;
    if (img) {
      img.onload = () => {
        const imgDomRect = img.getBoundingClientRect();
        if (domRect === null || (domRect && domRect.width < imgDomRect.width)) {
          setDomRect(imgDomRect);
          setInitialSize({
            width: imgDomRect.width,
            height: imgDomRect.height,
          });
        }
      };
    }
  }, [domRect]);

  // Update `isTouching` on Global Touch Start
  // - set `isTouching` to `false` when touchable is not touched
  // - `isTouching` is used for showing `Handles` component
  useEffect(() => {
    const handleGlobalTouch = (event: TouchEvent) => {
      if (handleMode === "hide" || handleMode === "always") {
        return;
      }

      const el = event.target as HTMLElement;
      const dragable = el.closest(".touchable__container");
      if (!dragable || dragable.id !== id) {
        setIsTouching(false);
      }
    };

    document.addEventListener(
      "touchstart",
      handleGlobalTouch as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "touchstart",
        handleGlobalTouch as unknown as EventListener
      );
    };
  }, [id, handleMode]);

  return {
    contextValue,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    isTouching,
    isSupported,
    size: {
      width: domRect?.width,
      height: domRect?.height,
    },
    touchableRef,
    actionModes,
    toggleActionMode,
    resetToInitialState,
    isInitialState,
  };
};

export type UseTouchableReturns = ReturnType<typeof useTouchable>;

export default useTouchable;
