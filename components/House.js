import React from 'react';
import Image from 'next/image';

export default function House({externalURL, imageURL, imageId, title, description}) {
    return (
        <div
            className='bg-white p-4 shadow-md rounded-md border border-gray-200 hover:shadow-lg transition duration-300 cursor-pointer'
            style={{ width: '300px' }}
            onClick={() => window.open(externalURL, '_blank', 'noopener noreferrer')}
        >
            <div className='relative h-64 mb-4 rounded-md overflow-hidden'>
                <Image
                    src={imageURL}
                    alt={imageId}
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-gray-600'>{description}</p>
        </div>
    );
}
