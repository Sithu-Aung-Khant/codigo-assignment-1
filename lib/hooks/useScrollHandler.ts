import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export const useScrollHandler = () => {
  const [scrollCount, setScrollCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(false);
  const [revertRotation, setRevertRotation] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(
      (e: WheelEvent) => {
        e.preventDefault();

        const isScrollingDown = e.deltaY > 0;

        setScrollCount((prev) => {
          const newCount = isScrollingDown ? prev + 1 : Math.max(0, prev - 1);
          console.log('newCount', newCount);

          if (newCount >= 20) {
            setRotateLeft(true);
            setShowAnimation(true);
            setRevertRotation(true);
          } else if (newCount >= 10) {
            setRotateLeft(true);
            setShowAnimation(true);
            setRevertRotation(false);
          } else if (newCount < 10) {
            setRotateLeft(false);
            setShowAnimation(false);
            setRevertRotation(false);
          }

          return newCount;
        });
      },
      50,
      { leading: true, trailing: false }
    );

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      handleScroll.cancel();
    };
  }, []);

  return { scrollCount, showAnimation, rotateLeft, revertRotation };
};
