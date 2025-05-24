import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const PhotoCarousel: React.FC = () => {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch carousel images from JSON
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch('/data/gallery.json');
        if (!response.ok) {
          throw new Error('Failed to fetch carousel images');
        }
        const galleryData = await response.json();
        
        // Filter for featured/carousel images or use first 4 images
        const featuredImages = galleryData.filter((img: any) => img.featured) || galleryData.slice(0, 4);
        setCarouselImages(featuredImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load carousel images');
        console.error('Error fetching carousel images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselImages();
  }, []);
  
  // Auto-advance slides
  useEffect(() => {
    if (carouselImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            <p className="text-white">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || carouselImages.length === 0) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container-custom">
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            <p className="text-white">
              {error ? `Error: ${error}` : 'No images available for carousel'}
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="container-custom">
        <div className="relative h-96 rounded-lg overflow-hidden group">
          {/* Images */}
          {carouselImages.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
                <p className="text-white text-lg">{image.caption}</p>
              </div>
            </div>
          ))}
          
          {/* Navigation arrows */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {carouselImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;