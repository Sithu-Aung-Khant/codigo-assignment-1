import Image from 'next/image';

export default function Home() {
  // Array of human images from the public/humans folder
  const images = [
    'humans/sitting-1.svg',
    'humans/sitting-2.svg',
    'humans/sitting-3.svg',
    'humans/sitting-4.svg',
    'humans/sitting-5.svg',
    'humans/sitting-6.svg',
    'humans/sitting-7.svg',
    'humans/sitting-8.svg',
    'humans/standing-1.svg',
    'humans/standing-2.svg',
    'humans/standing-3.svg',
    'humans/standing-4.svg',
    'humans/standing-5.svg',
    'humans/standing-6.svg',
    'humans/standing-7.svg',
    'humans/standing-8.svg',
    'humans/standing-9.svg',
    'humans/standing-10.svg',
    // 'humans/standing-11.svg',
    // 'humans/standing-12.svg',
    // 'humans/standing-13.svg',
    // 'humans/standing-14.svg',
    // 'humans/standing-15.svg',
    // 'humans/standing-16.svg',
    // 'humans/standing-17.svg',
    // 'humans/standing-18.svg',
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
      <div className='fixed top-4 left-0 right-0 z-50 flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-bold text-blue-600 mb-4'>Fluffy HUGS</h1>
        <div className='flex gap-4'>
          <a href='#' className='text-blue-600 hover:text-blue-700'>
            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
              {/* Add your social icons here */}
            </div>
          </a>
        </div>
      </div>

      {/* Overlapping images container */}
      <div className='absolute inset-0 w-full h-full'>
        {images.map((image, index) => {
          const randomRotate = Math.random() * 30 - 15;
          const randomScale = 0.7 + Math.random() * 0.6;

          // Adjust grid calculations
          const columns = 6;
          const rows = 4;
          const columnWidth = 100 / columns;
          const rowHeight = 100 / rows;
          const rowSpacing = 15; // Add extra spacing between rows (in percentage)

          // Calculate row index
          const rowIndex = Math.floor(index / columns);

          // Center the image within its grid cell
          const left = `${
            (index % columns) * columnWidth + columnWidth * 0.5
          }%`;
          const top = `${
            (Math.floor(index / columns) % rows) * (rowHeight + rowSpacing) +
            rowHeight * 0.5
          }%`;

          return (
            <div
              key={index}
              className='absolute transition-all duration-500 hover:z-50 hover:scale-110'
              style={{
                left,
                top,
                transform: `translate(-50%, -50%) rotate(${randomRotate}deg) scale(${randomScale})`,
                width: '100vw',
                height: '100vh',
                zIndex: rowIndex,
              }}
            >
              <div className='relative w-full h-full group animate-bounce-wave'>
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
      <div className='fixed bottom-8 right-8 z-50'>
        <button className='bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg'>
          view collection
        </button>
      </div>
    </main>
  );
}
