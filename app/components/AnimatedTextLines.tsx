'use client';

interface AnimatedTextLinesProps {
  rotateLeft: boolean;
  revertRotation: boolean;
}

export const AnimatedTextLines = ({
  rotateLeft,
  revertRotation,
}: AnimatedTextLinesProps) => {
  if (!rotateLeft || !revertRotation) return null;

  return (
    <div
      className='absolute left-4 md:left-20 lg:left-0 lg:right-20 top-1/4 lg:top-1/2 -translate-y-1/2 text-right animate-fade-in'
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
        <div className='flex lg:justify-end'>
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
        <div className='flex lg:justify-end'>
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
  );
};
