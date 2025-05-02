import Image from 'next/image';
import blob from '@/public/blob.svg';
import { FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa';

export default function Home() {
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

  return (
    <main className='h-screen w-full relative overflow-hidden bg-white'>
      {/* Hero section with logo */}
      <div className='fixed top-12 left-10 right-0 z-50 flex flex-col items-center justify-center'>
        <h1 className='text-6xl w-full font-semibold text-red-500 mb-4'>
          HÜMAN RUSH{' '}
        </h1>
      </div>
      {/* Overlapping images container */}
      <div className='absolute inset-0 w-full h-full'>
        {images.map((image, index) => {
          const randomRotate = Math.random() * 30 - 15;

          // Adjust grid calculations
          const columns = 6;
          const rows = 4;
          const columnWidth = 100 / columns;
          const rowHeight = 100 / rows;
          const rowSpacing = 20; // Add extra spacing between rows (in percentage)

          // Calculate row and column index
          const rowIndex = Math.floor(index / columns);
          const columnIndex = index % columns;

          // Center the image within its grid cell
          const left = `${
            (index % columns) * columnWidth + columnWidth * 0.5
          }%`;
          const top = `${
            (Math.floor(index / columns) % rows) * (rowHeight + rowSpacing) +
            rowHeight * 0.5
          }%`;

          // Calculate total delay based on row and column
          const rowDelay = rowIndex * 0.5; // 0.5s delay per row
          const columnDelay = columnIndex * 0.2; // 0.2s delay per column
          const totalDelay = rowDelay + columnDelay;

          return (
            <div
              key={index}
              className='absolute transition-all duration-500 hover:z-50 hover:scale-110'
              style={{
                left,
                top,
                // transform: `translate(-50%, -50%)`,
                transform: `translate(-50%, -50%) rotate(${randomRotate}deg)`,
                width: '115vw',
                height: '115vh',
                zIndex: rowIndex,
                transitionDelay: `${totalDelay}s`,
              }}
            >
              <div
                className='relative w-full h-full group animate-bounce-wave'
                style={{
                  animationDelay: `${totalDelay}s`,
                }}
              >
                <Image
                  src={`/${image}`}
                  alt={`Human Illustration ${index + 1}`}
                  fill
                  className='object-contain transition-all duration-300 group-hover:scale-105'
                  sizes='(max-width: 640px) 30vw, (max-width: 768px) 25vw, 20vw'
                  priority={index < 8}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* View Collection Button */}
      <div className='fixed flex justify-between w-full items-center -bottom-10 -right-14 z-50'>
        <div className='flex gap-5'>
          <a
            href='https://discord.com'
            className='text-indigo-100 hover:text-indigo-50'
            aria-label='Discord'
          >
            <div className='w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center'>
              <FaDiscord className='w-6 h-6' />
            </div>
          </a>
          <a
            href='https://github.com'
            className='text-gray-600 hover:text-gray-700'
            aria-label='GitHub'
          >
            <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
              <FaGithub className='w-6 h-6' />
            </div>
          </a>
          <a
            href='https://twitter.com'
            className='text-blue-100 hover:text-blue-50'
            aria-label='Twitter'
          >
            <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
              <FaTwitter className='w-6 h-6' />
            </div>
          </a>
        </div>
        <button className='relative text-white pl-6 py-3 w-[280px] h-40'>
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
    </main>
  );
}
