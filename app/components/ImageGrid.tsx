import Image from 'next/image';

type ImageGridProps = {
  images: string[];
  rotateLeft: boolean;
  revertRotation: boolean;
  showAnimation: boolean;
  isMobile: boolean;
};

export const ImageGrid = ({
  images,
  rotateLeft,
  revertRotation,
  showAnimation,
  isMobile,
}: ImageGridProps) => {
  const centerImageIndex = Math.floor(images.length / 2);

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
    <div className='absolute inset-0 w-full h-full'>
      {images.map((image, index) => {
        const isCenterImage = index === centerImageIndex;

        // Updated grid calculations using currentGrid
        const { columns, rows, rowSpacing } = currentGrid;
        const columnWidth = 100 / columns;
        const rowHeight = 100 / rows;

        const rowIndex = Math.floor(index / columns);
        const columnIndex = index % columns;

        const left = `${(index % columns) * columnWidth + columnWidth * 0.5}%`;
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
                ${!showAnimation && !rotateLeft ? 'animate-bounce-wave' : ''}`}
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
                    !showAnimation && !rotateLeft ? 'group-hover:scale-105' : ''
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
  );
};
