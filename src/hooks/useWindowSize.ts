import { SECOND_LAYOUT_CHANGE } from 'common/consts/breakpoints';
import { useState, useEffect } from 'react';

interface Size {
  width: number | undefined;
  height: number | undefined;
  isOnSecondLayoutChange: boolean | null | undefined;
}
// code from https://usehooks.com/useWindowSize/

export default function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<
    Omit<Size, 'isOnSecondLayoutChange'>
  >({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowSize,
    isOnSecondLayoutChange: windowSize.width
      ? windowSize.width <= SECOND_LAYOUT_CHANGE
      : null,
  };
}
