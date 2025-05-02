type HeroSectionProps = {
  rotateLeft: boolean;
  revertRotation: boolean;
};

export const HeroSection = ({
  rotateLeft,
  revertRotation,
}: HeroSectionProps) => {
  return (
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
  );
};
