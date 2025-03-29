import {
  TouchEvent,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { POSITION } from "./constant";

interface UseTouchableProps {
  id: string;
  cornerImageSrc?: string;
  cornerStyle?: string;
  isTouchable?: boolean;
  minTrashhold?: number;
  maxTrashhold?: number;
  showCorner?: boolean;
}

type EventHandler = TouchEventHandler<HTMLDivElement>;
type ContextValue = Required<
  Pick<
    UseTouchableProps,
    "cornerImageSrc" | "cornerStyle" | "showCorner" | "isTouchable"
  >
>;
type PinchZoomSide = keyof typeof POSITION | "center";

const defaultValues: ContextValue = {
  cornerImageSrc: "",
  cornerStyle: "",
  showCorner: true,
  isTouchable: false,
};

const useTouchable = ({ id, ...props }: UseTouchableProps) => {
  const touchableRef = useRef<HTMLDivElement>(null);
  const eventCacheRef = useRef<TouchEvent | null>(null);
  const [domRect, setDomRect] = useState<DOMRect | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const { minTrashhold = 20, maxTrashhold = Infinity, ...contextProps } = props;
  const contextValue = {
    ...defaultValues,
    ...contextProps,
  };

  if (minTrashhold > maxTrashhold) {
    throw new Error("Touchable: minTrashhold must be less than maxTrashhold");
  }

  /**
   * Functionality
   */
  /** */
  const drag = (event: TouchEvent, touchable: HTMLElement) => {
    const cachedTouches = eventCacheRef.current?.touches;
    if (!cachedTouches || !domRect) return;

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
  };

  /** scale element by side with 1 finger
   * - need `<Touchable.Handles>` component to be rendered
   * - can hide handles by setting `showCorner` to false
   */
  const scaleOnSide = (
    event: TouchEvent,
    side: PinchZoomSide,
    touchable: HTMLElement
  ) => {
    const cachedTouches = eventCacheRef.current?.touches;
    if (!cachedTouches) return;

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

      switch (side) {
        case "top-left":
          newWidth = style.width - diffX;
          newHeight = style.height - diffY;
          newLeft = style.left + diffX;
          newTop = style.top + diffY;
          break;
        case "top-right":
          newWidth = style.width + diffX;
          newHeight = style.height - diffY;
          newTop = style.top + diffY;
          break;
        case "bottom-left":
          newWidth = style.width - diffX;
          newHeight = style.height + diffY;
          newLeft = style.left + diffX;
          break;
        case "bottom-right":
          newWidth = style.width + diffX;
          newHeight = style.height + diffY;
          break;
      }

      updateElement({
        touchable,
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop,
      });
    } catch (e) {
      console.error(e);
    }
  };

  /** scale element by center with 2 fingers */
  const pinchZoom = (event: TouchEvent, touchable: HTMLElement) => {
    const cachedTouches = eventCacheRef.current?.touches;
    const touches = Array.from(event.touches);
    if (!cachedTouches || cachedTouches.length < 2 || touches.length < 2) {
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
    let scale = 1 + diff / 100;

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
  };

  /**
   * Touch Event Handler
   */
  /** */
  const onTouchStart: EventHandler = (event: TouchEvent) => {
    const touchable = touchableRef.current;
    if (!touchable) return;
    updateIsTouching(touchable);
    eventCacheRef.current = event;
  };

  const onTouchMove: EventHandler = (event: TouchEvent) => {
    const touchable = touchableRef.current;
    if (!touchable) return;

    if (event.touches.length === 1) {
      const side = (event.target as HTMLElement).getAttribute(
        "data-position"
      ) as PinchZoomSide;
      if (side) {
        scaleOnSide(event, side, touchable);
      } else {
        drag(event, touchable);
      }
    }
    if (event.touches.length === 2) {
      pinchZoom(event, touchable);
    }
    eventCacheRef.current = event;
  };

  const onTouchEnd: EventHandler = () => {
    eventCacheRef.current = null;
  };

  /**
   * State Update
   */
  /** */
  const updateIsTouching = (touchable: HTMLElement) => {
    if (!touchable || touchable.id !== id) {
      setIsTouching(false);
      return;
    }
    setIsTouching(true);
  };

  const updateElement = ({
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
      const newWidth = Math.max(minTrashhold, Math.min(width, maxTrashhold));
      const newHeight = Math.max(minTrashhold, Math.min(height, maxTrashhold));
      touchable.style.width = `${newWidth}px`;
      touchable.style.height = `${newHeight}px`;

      const touchableChild = Array.from(touchable.children) as HTMLElement[];
      if (!touchableChild) return;
      touchableChild.forEach((child) => {
        child.style.width = `${newWidth}px`;
        child.style.height = `${newHeight}px`;
      });
    }

    if (left && top) {
      touchable.style.left = `${left}px`;
      touchable.style.top = `${top}px`;
    }
  };

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
    if (touchableRef.current) {
      const domRect = touchableRef.current.getBoundingClientRect();
      setDomRect(domRect);
    }

    // if child is only element that has size,
    // update domRect to child size after image is loaded
    const img = touchableRef.current?.querySelector("img") as HTMLImageElement;
    if (img) {
      img.onload = (_: Event) => {
        const imgDomRect = img.getBoundingClientRect();
        if (domRect === null || (domRect && domRect.width < imgDomRect.width)) {
          setDomRect(imgDomRect);
        }
      };
    }
  }, []);

  // Update `isTouching` on Global Touch Start
  // - set `isTouching` to `false` when touchable is not touched
  // - `isTouching` is used for showing `Handles` component
  useEffect(() => {
    const handleGlobalTouch = (event: TouchEvent) => {
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
  }, [id]);

  return {
    contextValue,
    events: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    isTouching,
    size: {
      width: domRect?.width,
      height: domRect?.height,
    },
    touchableRef,
  };
};

export default useTouchable;
