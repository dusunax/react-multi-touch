import { useEffect, useRef, useState } from "react";

interface TouchableContext {
  isSelected?: boolean;
  isTouchable?: boolean;
  hasCorner?: boolean;
  cornerImageSrc?: string;
  cornerStyle?: string;
}

const useTouchable = ({
  isSelected,
  isTouchable,
  hasCorner,
  cornerImageSrc,
  cornerStyle,
}: TouchableContext) => {
  const touchableRef = useRef<HTMLDivElement>(null);
  const defaultValues = {
    isTouchable: false,
    isSelected: false,
    hasCorner: true,
    cornerImageSrc: "",
    cornerStyle: "",
  } as const;

  const contextValue = {
    ...defaultValues,
    ...(isSelected !== undefined && { isSelected }),
    ...(isTouchable !== undefined && { isTouchable }),
    ...(hasCorner !== undefined && { hasCorner }),
    ...(cornerImageSrc !== undefined && { cornerImageSrc }),
    ...(cornerStyle !== undefined && { cornerStyle }),
  };
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (touchableRef.current) {
      const { width, height } = touchableRef.current.getBoundingClientRect();
      setSize({
        width,
        height,
      });
    }
  }, [touchableRef.current]);

  return { size, touchableRef, contextValue };
};

export default useTouchable;
