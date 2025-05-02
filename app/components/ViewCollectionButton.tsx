'use client';

import Image from 'next/image';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import blob from '@/public/blob.svg';

export const ViewCollectionButton = () => {
  return (
    <div
      className={`fixed flex justify-between w-full items-center gap-x-4 md:gap-x-0 -bottom-16 md:-bottom-10 ml-6 md:ml-8 z-50 
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
      <button className='relative -mr-8 text-white pl-6 py-3 w-[350px] md:w-[280px] h-52 md:h-40'>
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
  );
};
