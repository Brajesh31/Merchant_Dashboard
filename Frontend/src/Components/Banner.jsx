import React, { useState, useEffect } from 'react';
import banner1 from '../assets/EHNIZE.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [banner1, banner2, banner3, banner4];
  const autoSlideInterval = 5000; // Auto-slide every 5 seconds

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, autoSlideInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [banners.length]);

  // Manual navigation handler
  const handleManualChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative overflow-hidden aspect-[3/1] shadow-lg">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                activeIndex === index
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
              }`}
            >
              <img
                src={banner}
                alt={`banner ${index + 1}`}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Manual navigation dots */}
      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-3">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`block h-2 w-2 cursor-pointer rounded-full transition-all transform ${
              activeIndex === index ? 'bg-white scale-110' : 'bg-white/50 scale-90'
            }`}
            onClick={() => handleManualChange(index)}
          />
        ))}
      </div>

      {/* Left and Right Arrows */}
      <div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-100 transition"
        onClick={() =>
          setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length)
        }
      >
        &#8249;
      </div>
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50 p-2 bg-white bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-100 transition"
        onClick={() =>
          setActiveIndex((prev) => (prev + 1) % banners.length)
        }
      >
        &#8250;
      </div>
    </div>
  );
};

export default Banner;
