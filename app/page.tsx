'use client';

import blob from '@/public/blob.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { throttle } from 'lodash';
import { Dumbbell, Bike, Users, Heart, Trophy, Medal } from 'lucide-react';

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
  const [scrollCount, setScrollCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [rotateLeft, setRotateLeft] = useState(false);
  const [revertRotation, setRevertRotation] = useState(false);

  // Array of human images from the public/humans folder
  const images = [
    'humans/standing-1.svg',
    'humans/standing-17.svg',
    'humans/standing-2.svg',
    'humans/standing-3.svg',
    'humans/standing-4.svg',
    'humans/standing-5.svg',
    'humans/standing-6.svg',
    'humans/standing-8.svg',
    'humans/standing-9.svg',
    'humans/standing-10.svg',
    'humans/standing-11.svg',
    'humans/standing-12.svg',
    'humans/sitting-1.svg',
    'humans/standing-13.svg',
    'humans/standing-14.svg',
    'humans/standing-15.svg',
    'humans/standing-16.svg',
    'humans/standing-18.svg',
    // 'humans/standing-19.svg',
    // 'humans/standing-20.svg',
    // 'humans/standing-21.svg',
    // 'humans/standing-22.svg',
    // 'humans/standing-23.svg',
    // 'humans/standing-24.svg',
  ];

  // Calculate center image index
  const centerImageIndex = Math.floor(images.length / 2);

  useEffect(() => {
    // Create throttled scroll handler that executes at most once every 50ms
    const handleScroll = throttle(
      (e: WheelEvent) => {
        e.preventDefault();

        // Determine scroll direction (positive deltaY means scrolling down)
        const isScrollingDown = e.deltaY > 0;

        setScrollCount((prev) => {
          // Calculate new count based on direction
          const newCount = isScrollingDown ? prev + 1 : Math.max(0, prev - 1);
          console.log('newCount', newCount);
          // Update animations based on new count
          if (newCount >= 80) {
            setRotateLeft(true);
            setShowAnimation(true);
            setRevertRotation(true);
          } else if (newCount >= 40) {
            setRotateLeft(true);
            setShowAnimation(true);
            setRevertRotation(false);
          } else if (newCount < 40) {
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

    // Cleanup function to remove event listener and cancel any pending throttled executions
    return () => {
      window.removeEventListener('wheel', handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled executions
    };
  }, []);

  return (
    <main
      className={`h-screen w-full relative overflow-hidden transition-colors duration-1000 ease-in-out ${
        rotateLeft ? 'bg-amber-50' : 'bg-white'
      }`}
    >
      {/* Floating Blobs - Only visible when rotateLeft is true */}
      <div className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'>
        {[...Array(9)].map((_, i) => {
          // const row = Math.floor(i / 3);
          const col = i % 3;

          // Fixed random values using index instead of Math.random()
          // This ensures the same values are used on each render
          const randomX = ((i * 13) % 15) - 7.5; // Deterministic but appears random
          const randomY = ((i * 17) % 15) - 7.5;
          const left = `${col * 33.33 + 16.66 + randomX}%`;
          const bottom = `${randomY - 10}%`;

          // Fixed size and duration based on index
          const size = 180 + ((i * 23) % 40); // Still varies but stays consistent
          const duration = 8; // Fixed duration for all blobs

          return (
            <div
              key={i}
              className={`absolute transition-opacity duration-1000 ease-in-out ${
                rotateLeft ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left,
                bottom,
                animation: `float-blob ${duration}s linear infinite`,
                animationDelay: `${i * 0.5}s`, // Increased delay between blobs
              }}
            >
              <Image
                src={blob}
                alt={`Floating blob ${i + 1}`}
                width={size}
                height={size}
                className='mix-blend-multiply'
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  filter: `hue-rotate(${i * 40}deg)`,
                  opacity: 0.3 + ((i * 7) % 20) / 100, // Deterministic opacity between 0.3-0.5
                }}
              />
            </div>
          );
        })}
      </div>
      {/* Floating Icons - Only visible in third stage */}
      <div className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'>
        {rotateLeft &&
          revertRotation &&
          [...Array(12)].map((_, i) => {
            // Create deterministic but seemingly random positions
            const randomY = (i * 19) % 80; // 0-80% from top
            const startX = 100 + ((i * 17) % 20); // Start from 100-120% (outside right)
            const speed = 15 + ((i * 13) % 10); // Animation duration 15-25s

            const Icon = sportsIcons[i % sportsIcons.length];
            const size = 40 + ((i * 11) % 24); // Icon size 24-48px
            const rotationSpeed = 3 + ((i * 7) % 5); // Rotation duration 3-8s

            return (
              <div
                key={`icon-${i}`}
                className='absolute transition-opacity duration-1000 ease-in-out opacity-100'
                style={{
                  top: `${randomY}%`,
                  right: `${-20}%`, // Start outside the screen
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
        className={`fixed top-6 md:top-12 md:left-10 left-5 right-0 z-50 flex flex-col items-center justify-center
          transition-all duration-500 ease-in-out
          ${
            rotateLeft && !revertRotation
              ? 'opacity-0 translate-y-[-100%]'
              : 'opacity-100 translate-y-0'
          }
        `}
      >
        <h1 className='md:text-6xl text-3xl w-full font-semibold text-red-500 mb-4'>
          HÜMAN RUSH{' '}
        </h1>
      </div>
      {/* Overlapping images container */}
      <div className='absolute inset-0 w-full h-full'>
        {images.map((image, index) => {
          const isCenterImage = index === centerImageIndex;
          // const randomRotate = Math.random() * 30 - 15;

          // Grid calculations
          const columns = 6;
          const rows = 4;
          const columnWidth = 100 / columns;
          const rowHeight = 100 / rows;
          const rowSpacing = 20;

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
                      ? 'rotateZ(0deg) scale(0.7)' // Third stage: revert back to 0 degrees
                      : 'rotateZ(-90deg) scale(0.7)' // Second stage: -90 degrees
                    : showAnimation && isCenterImage
                    ? 'rotate3d(0, 1, 0, 360deg)'
                    : ''
                }`,
                width: isCenterImage && rotateLeft ? '125vw' : '115vw',
                height: isCenterImage && rotateLeft ? '125vh' : '115vh',
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
      {/* View Collection Button */}
      <div
        className={`fixed flex justify-between w-full items-center gap-x-4 md:gap-x-0 -bottom-10 ml-6 md:ml-8 z-50 
        transition-opacity duration-500`}
      >
        <div className='flex md:mb-5 gap-5'>
          <a
            href='https://discord.com'
            className='text-indigo-100 hover:text-indigo-50'
            aria-label='Discord'
          >
            <div className='md:size-10 size-8 bg-indigo-600 rounded-full flex items-center justify-center'>
              <FaDiscord className='size-5 md:size-6' />
            </div>
          </a>
          <a
            href='https://github.com'
            className='text-gray-600 hover:text-gray-700'
            aria-label='GitHub'
          >
            <div className='md:size-10 size-8 bg-gray-100 rounded-full flex items-center justify-center'>
              <FaGithub className='size-5 md:size-6' />
            </div>
          </a>
          <a
            href='https://twitter.com'
            className='text-blue-100 hover:text-blue-50'
            aria-label='Twitter'
          >
            <div className='md:size-10 size-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <FaTwitter className='size-5 md:size-6' />
            </div>
          </a>
        </div>
        <button className='relative -mr-8 text-white pl-6 py-3 w-[350px] md:w-[280px] h-40'>
          <Image
            src={blob}
            alt='Background Blob'
            fill
            className='object-cover -z-10 transition-transform duration-300 hover:scale-105'
            style={{ objectPosition: 'center' }}
          />
          <span className='relative z-10'>view collection</span>
        </button>
      </div>
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
          <h1 className='text-5xl md:text-[158px] font-semibold text-red-500 whitespace-nowrap'>
            HÜMAN RUSH
          </h1>
        </div>
      )}
      {/* Third Stage Text Lines - Only visible when scroll > 80 */}
      {rotateLeft && revertRotation && (
        <div
          className='absolute left-4 md:left-0 md:right-20 top-1/4 md:top-1/2 -translate-y-1/2 text-right animate-fade-in'
          style={{
            animation: 'fade-slide-left 1s ease-out forwards',
          }}
        >
          <div className='space-y-2 md:space-y-6'>
            {/* First line */}
            <div className='flex justify-end'>
              {'UNLEASH YOUR RUSH'.split('').map((letter, i) => (
                <span
                  key={i}
                  className='md:text-4xl font-bold text-red-500/80 tracking-wider inline-block'
                  style={{
                    animation: `wave 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
            {/* Second line */}
            <div className='flex justify-end'>
              {'EMBRACE THE ENERGY'.split('').map((letter, i) => (
                <span
                  key={i}
                  className='md:text-3xl font-semibold text-red-500/60 tracking-wide inline-block'
                  style={{
                    animation: `wave 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
            {/* Third line */}
            <div className='flex md:justify-end'>
              {'BE LIMITLESS'.split('').map((letter, i) => (
                <span
                  key={i}
                  className='md:text-2xl font-medium text-red-500/40 tracking-normal inline-block'
                  style={{
                    animation: `wave 1s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
