'use client';

import { useScrollHandler } from '@/lib/hooks/useScrollHandler';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { allImages } from '@/lib/images';
import { Bike, Dumbbell, Heart, Medal, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import { AnimatedTextLines } from './components/AnimatedTextLines';
import { ViewCollectionButton } from './components/ViewCollectionButton';
import { FloatingBlobs } from './components/FloatingBlobs';

type IconComponent = typeof Bike;

const sportsIcons: IconComponent[] = [
  Dumbbell,
  Bike,
  Users,
  Heart,
  Trophy,
  Medal,
];

export default function Home() {
  const { width } = useWindowSize();
  const { showAnimation, rotateLeft, revertRotation } = useScrollHandler();

  // Get current grid configuration and images based on screen size
  const isMobile = width < 1080;
  const images = isMobile ? allImages.slice(0, 9) : allImages;

  // Calculate center image index based on current images array length
  const centerImageIndex = Math.floor(images.length / 2);

  // Define grid configurations based on screen size
  const gridConfig = {
    mobile: {
      columns: 3,
      rows: 3,
      rowSpacing: 10,
    },
    desktop: {
      columns: 6,
      rows: 4,
      rowSpacing: 20,
    },
  };

  const currentGrid = isMobile ? gridConfig.mobile : gridConfig.desktop;

  return (
    <main
      className={`h-screen w-full relative overflow-hidden transition-colors duration-1000 ease-in-out ${
        rotateLeft ? 'bg-amber-50' : 'bg-white'
      }`}
    >
      {/* Floating Blobs */}
      <FloatingBlobs rotateLeft={rotateLeft} />

      {/* Floating Icons - Only visible in third stage */}
      <div className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'>
        {rotateLeft &&
          revertRotation &&
          [...Array(12)].map((_, i) => {
            const randomY = (i * 19) % 80;
            // const startX = 100 + ((i * 17) % 20);
            const speed = 15 + ((i * 13) % 10);

            const Icon = sportsIcons[i % sportsIcons.length];
            const size = 40 + ((i * 11) % 24);
            const rotationSpeed = 3 + ((i * 7) % 5);

            return (
              <div
                key={`icon-${i}`}
                className='absolute transition-opacity duration-1000 ease-in-out opacity-100'
                style={{
                  top: `${randomY}%`,
                  right: `${-20}%`,
                  animation: `float-icon ${speed}s linear infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}
              >
                <div
                  className='text-red-500/40'
                  style={{
                    animation: `spin ${rotationSpeed}s linear infinite`,
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                >
                  <Icon size={size} />
                </div>
              </div>
            );
          })}
      </div>
      {/* Hero section with logo */}
      <div
        className={`fixed top-6 lg:top-12 lg:left-10 left-6 right-0 z-50 flex flex-col items-center justify-center
          transition-all duration-500 ease-in-out
          ${
            rotateLeft && !revertRotation
              ? 'opacity-0 translate-y-[-100%]'
              : 'opacity-100 translate-y-0'
          }
        `}
      >
        <h1 className='lg:text-6xl md:text-5xl text-3xl w-full font-semibold text-red-500 mb-4'>
          HÜMAN RUSH{' '}
        </h1>
      </div>
      {/* Overlapping images container */}
      <div className='absolute inset-0 w-full h-full'>
        {images.map((image, index) => {
          const isCenterImage = index === centerImageIndex;

          // Updated grid calculations using currentGrid
          const { columns, rows, rowSpacing } = currentGrid;
          const columnWidth = 100 / columns;
          const rowHeight = 100 / rows;

          const rowIndex = Math.floor(index / columns);
          const columnIndex = index % columns;

          const left = `${
            (index % columns) * columnWidth + columnWidth * 0.5
          }%`;
          const top = `${
            (Math.floor(index / columns) % rows) * (rowHeight + rowSpacing) +
            rowHeight * 0.5
          }%`;

          const rowDelay = rowIndex * 0.5;
          const columnDelay = columnIndex * 0.2;
          const totalDelay = rowDelay + columnDelay;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-1000 ease-in-out
                ${showAnimation && !isCenterImage ? 'opacity-0' : 'opacity-100'}
                ${isCenterImage ? 'hover:z-50 hover:scale-110' : ''}`}
              style={{
                left: isCenterImage ? '50%' : left,
                top: isCenterImage ? (rotateLeft ? '65%' : '50%') : top,
                transform: `translate(-50%, -50%) ${
                  rotateLeft && isCenterImage
                    ? revertRotation
                      ? 'rotateZ(0deg) scale(0.7)'
                      : 'rotateZ(-90deg) scale(0.7)'
                    : showAnimation && isCenterImage
                    ? 'rotate3d(0, 1, 0, 360deg)'
                    : ''
                }`,
                width:
                  isCenterImage && rotateLeft
                    ? isMobile
                      ? '125vw'
                      : '125vw'
                    : isMobile
                    ? '115vw'
                    : '115vw',
                height:
                  isCenterImage && rotateLeft
                    ? isMobile
                      ? '125vh'
                      : '125vh'
                    : isMobile
                    ? '115vh'
                    : '115vh',
                zIndex: rowIndex,
                transitionDelay: rotateLeft ? '0s' : '0s',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center center',
              }}
            >
              <div
                className={`relative w-full h-full group 
                  ${
                    !showAnimation && !rotateLeft ? 'animate-bounce-wave' : ''
                  }`}
                style={{
                  animationDelay: `${totalDelay}s`,
                  transition: 'all 1s ease-in-out',
                }}
              >
                <Image
                  src={`/${image}`}
                  alt={`Human Illustration ${index + 1}`}
                  fill
                  className={`object-contain transition-all duration-1000 
                    ${
                      !showAnimation && !rotateLeft
                        ? 'group-hover:scale-105'
                        : ''
                    }
                    ${rotateLeft && isCenterImage ? 'scale-110' : ''}`}
                  sizes='(max-width: 640px) 30vw, (max-width: 768px) 25vw, 20vw'
                  priority={index < 8}
                  style={{
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <ViewCollectionButton />
      {rotateLeft && !revertRotation && (
        <div
          className='absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 z-50 
            animate-fade-in text-center'
          style={{
            width: 'max-content',
            transformOrigin: 'center center',
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h1 className='text-5xl md:text-[95px] lg:text-[158px] font-semibold text-red-500 whitespace-nowrap'>
            HÜMAN RUSH
          </h1>
        </div>
      )}
      {rotateLeft && revertRotation && (
        <AnimatedTextLines
          rotateLeft={rotateLeft}
          revertRotation={revertRotation}
        />
      )}
    </main>
  );
}
