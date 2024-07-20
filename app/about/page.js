'use client'
import React from 'react';
import House from '@/components/House';

// https://palace-images.s3.us-east-2.amazonaws.com/sf/IMG_2038.png
// https://palace-images.s3.us-east-2.amazonaws.com/sf/IMG_8112.png

const houseData = [
    {
      externalURL: "https://www.daewoongacademy.com",
      imageURL: "https://palace-images.s3.us-east-2.amazonaws.com/sf/IMG_2038.png",
      imageId: "sf1",
      title: "This is the front view of the kitchen",
      description: "this is the kitchen woohoo"
    },
    {
      externalURL: "https://www.youtube.com",
      imageURL: "https://palace-images.s3.us-east-2.amazonaws.com/sf/IMG_8112.png",
      imageId: "sf2",
      title: "This is the kitchen part 2",
      description: "this is the kitchen yeah"
    },
    {
        externalURL: "https://www.youtube.com",
        imageURL: "https://palace-images.s3.us-east-2.amazonaws.com/sf/IMG_8112.png",
        imageId: "sf2",
        title: "This is the kitchen part 2",
        description: "this is the kitchen yeah"
    },
    {
        externalURL: "https://www.daewoongacademy.com",
        imageURL: "https://palace-images.s3.us-east-2.amazonaws.com/sf/IMG_2038.png",
        imageId: "sf1",
        title: "This is the front view of the kitchen",
        description: "this is the kitchen woohoo"
    },

  ];

export default function About() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            {
                houseData.map((house, index) => {
                    return (
                        <House
                            key = {index}
                            externalURL={house.externalURL}
                            imageURL={house.imageURL}
                            imageId={house.imageId}
                            title={house.title}
                            description={house.description}
                        />  
                    )
                })
            }   
        </div>
    );
}
