import React from 'react';
import Carousel from "../components/Carousel"
const AboutUs = () => {
  const images = [
    'https://via.placeholder.com/500x300',
    'https://via.placeholder.com/500x300',
    'https://via.placeholder.com/500x300',
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <Carousel images={images} />
    </div>
  );
};

export default AboutUs;