type AnimatedTitleProps = {
  rotateLeft: boolean;
  revertRotation: boolean;
};

export const AnimatedTitle = ({
  rotateLeft,
  revertRotation,
}: AnimatedTitleProps) => {
  if (!rotateLeft || revertRotation) return null;

  return (
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
  );
};
