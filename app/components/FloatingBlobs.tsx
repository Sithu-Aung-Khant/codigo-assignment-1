import Image from 'next/image';
import blob from '@/public/blob.svg';

interface FloatingBlobsProps {
  rotateLeft: boolean;
}

export const FloatingBlobs = ({ rotateLeft }: FloatingBlobsProps) => {
  return (
    <div className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'>
      {[...Array(9)].map((_, i) => {
        const col = i % 3;
        const randomX = ((i * 13) % 15) - 7.5;
        const randomY = ((i * 17) % 15) - 7.5;
        const left = `${col * 33.33 + 16.66 + randomX}%`;
        const bottom = `${randomY - 10}%`;
        const size = 180 + ((i * 23) % 40);
        const duration = 8;

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
              animationDelay: `${i * 0.5}s`,
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
                opacity: 0.3 + ((i * 7) % 20) / 100,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
