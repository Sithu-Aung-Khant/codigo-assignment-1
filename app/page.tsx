'use client';

import { useScrollHandler } from '@/lib/hooks/useScrollHandler';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { allImages } from '@/lib/images';
import { AnimatedTextLines } from './components/AnimatedTextLines';
import { AnimatedTitle } from './components/AnimatedTitle';
import { FloatingBlobs } from './components/FloatingBlobs';
import { FloatingIcons } from './components/FloatingIcons';
import { HeroSection } from './components/HeroSection';
import { ImageGrid } from './components/ImageGrid';
import { ViewCollectionButton } from './components/ViewCollectionButton';

export default function Home() {
  const { width } = useWindowSize();
  const { showAnimation, rotateLeft, revertRotation } = useScrollHandler();

  const isMobile = width < 1080;
  const images = isMobile ? allImages.slice(0, 9) : allImages;

  return (
    <main
      className={`h-screen w-full relative overflow-hidden transition-colors duration-1000 ease-in-out ${
        rotateLeft ? 'bg-amber-50' : 'bg-white'
      }`}
    >
      {/* Floating Blobs */}
      <FloatingBlobs rotateLeft={rotateLeft} />

      {/* Floating Icons */}
      <FloatingIcons rotateLeft={rotateLeft} revertRotation={revertRotation} />

      {/* Hero section with logo */}
      <HeroSection rotateLeft={rotateLeft} revertRotation={revertRotation} />

      {/* Overlapping images container */}
      <ImageGrid
        images={images}
        rotateLeft={rotateLeft}
        revertRotation={revertRotation}
        showAnimation={showAnimation}
        isMobile={isMobile}
      />

      <ViewCollectionButton />
      <AnimatedTitle rotateLeft={rotateLeft} revertRotation={revertRotation} />
      {rotateLeft && revertRotation && (
        <AnimatedTextLines
          rotateLeft={rotateLeft}
          revertRotation={revertRotation}
        />
      )}
    </main>
  );
}
