import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

export const useScrollHandler = () => {
  const [scrollCount, setScrollCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(false);
  const [revertRotation, setRevertRotation] = useState(false);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const handleScroll = (deltaY: number) => {
    const isScrollingDown = deltaY > 0;

    setScrollCount((prev) => {
      const newCount = isScrollingDown ? prev + 1 : Math.max(0, prev - 1);
      console.log('newCount', newCount);

      if (isMobile) {
        // Mobile logic: Change state on the first scroll
        if (newCount >= 2) {
          setRotateLeft(true);
          setShowAnimation(true);
          setRevertRotation(true);
        } else if (newCount >= 1) {
          setRotateLeft(true);
          setShowAnimation(true);
          setRevertRotation(false);
        } else if (newCount < 1) {
          setRotateLeft(false);
          setShowAnimation(false);
          setRevertRotation(false);
        }
      } else {
        // Web logic: Change state based on cumulative scroll count
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
      }

      return newCount;
    });
  };

  useEffect(() => {
    const handleWheel = throttle(
      (e: WheelEvent) => {
        e.preventDefault();
        handleScroll(e.deltaY);
      },
      50,
      { leading: true, trailing: false }
    );

    let touchStartY = 0;
    const handleTouchMove = throttle(
      (e: TouchEvent) => {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        touchStartY = touchEndY;
        handleScroll(deltaY);
      },
      50,
      { leading: true, trailing: false }
    );

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      handleWheel.cancel();
      handleTouchMove.cancel();
    };
  }, []);

  return { scrollCount, showAnimation, rotateLeft, revertRotation };
};
