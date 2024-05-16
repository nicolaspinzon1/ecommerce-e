import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img className="w-full h-full object-cover" src={image} alt={`Slide ${index}`} />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 bg-gray-500 rounded-full focus:outline-none ${
              index === activeIndex ? 'bg-gray-800' : ''
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r focus:outline-none"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};
export default Carousel;