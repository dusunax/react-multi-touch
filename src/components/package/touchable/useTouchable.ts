import {
  TouchEvent,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseTouchableProps {
  id: string;
  cornerImageSrc?: string;
  cornerStyle?: string;
  hasCorner?: boolean;
  isTouchable?: boolean;
}

type EventHandler = TouchEventHandler<HTMLDivElement>;
type ContextValue = Required<Omit<UseTouchableProps, "id">>;
type DraggableElement = HTMLDivElement & { style: CSSStyleDeclaration };

const defaultValues: ContextValue = {
  cornerImageSrc: "",
  cornerStyle: "",
  hasCorner: true,
  isTouchable: false,
};

const useTouchable = ({ id, ...props }: UseTouchableProps) => {
  const touchableRef = useRef<HTMLDivElement>(null);
  const eventCacheRef = useRef<TouchEvent | null>(null);
  const [domRect, setDomRect] = useState<DOMRect | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const contextValue = {
    ...defaultValues,
    ...props,
  };

  /**
   * Functionality
   */
  const drag = (event: TouchEvent) => {
    const el = event.target as HTMLElement;
    const dragable = el.closest(
      ".touchable__container"
    ) as DraggableElement | null;
    if (
      !eventCacheRef.current ||
      event.target === null ||
      !dragable ||
      !domRect
    )
      return;

    try {
      const touch = Array.from(event.touches)[0];
      const [left, top] = [
        parseFloat(window.getComputedStyle(dragable).left),
        parseFloat(window.getComputedStyle(dragable).top),
      ];
      const [diffX, diffY] = [
        touch.clientX - eventCacheRef.current.touches[0].clientX,
        touch.clientY - eventCacheRef.current.touches[0].clientY,
      ];
      const [newLeft, newTop] = [left + diffX, top + diffY];

      dragable.style.left = `${newLeft}px`;
      dragable.style.top = `${newTop}px`;
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Touch Event Handler
   */
  const onTouchStart: EventHandler = (event: TouchEvent) => {
    const el = event.target as HTMLElement;
    const dragable = el.closest(".touchable__container");

    if (!dragable || dragable.id !== id) {
      setIsTouching(false);
      return;
    }

    eventCacheRef.current = event;
    setIsTouching(true);
  };

  const onTouchMove: EventHandler = (event: TouchEvent) => {
    drag(event);
    eventCacheRef.current = event;
  };

  const onTouchEnd: EventHandler = () => {
    eventCacheRef.current = null;
  };

  /**
   * Side Effects
   */
  // Update Relative Element Size
  useEffect(() => {
    if (touchableRef.current) {
      const domRect = touchableRef.current.getBoundingClientRect();
      setDomRect(domRect);
    }
  }, []);

  // Update isTouching on Global Touch Start
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
