import React, { useState } from 'react';
import './Gallery.css';

// Sample gallery images for each section - you can replace these with your actual images
const galleryData = {
  0: [
    '/Europe 2025/cover.JPG',
    '/Europe 2025/cave.JPG',
    '/Europe 2025/castle.JPG',
    '/Europe 2025/lake.JPG',
    '/Europe 2025/mountain.JPG',
    '/Europe 2025/self.JPG',
    '/Europe 2025/valley.JPG'
  ],
  1: [
    'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ],
  // Add more galleries for other sections as needed
};

// YouTube video data for each section - replace with your actual video IDs
const videoData = {
  0: {
    videoId: 'HBglvAqfnCQ', // Europe
    title: 'Mountain Adventures Documentary' // Replace this with your title
  },
  1: {
    videoId: 'Z1_I0P0NyUI', // NYC Marathon
    title: 'Ocean Views and Coastal Beauty' // Replace this with your title
  },
  2: {
    videoId: 'YZHaDGyH2Nk', // Japan
    title: 'Deep Forest Exploration' // Replace this with your title
  },
  5: {
    videoId: '4YioDraKTQU', // Mt. Rainier
    title: 'Desert Landscapes and Wonders' // Replace this with your title
  }
};

// Generate galleries for all 8 sections
for (let i = 2; i < 8; i++) {
  galleryData[i] = galleryData[i % 2]; // Reuse gallery data for demo
}

const Gallery = ({ sectionId, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = galleryData[sectionId] || galleryData[0];
  const videoInfo = videoData[sectionId] || videoData[0];
  const sectionTitles = {
    0: "Europe 2025",
    1: "NYC Marathon 2024",
    2: "Japan 2024",
    3: "California 2024",
    4: "Key West 2024",
    5: "Mt. Rainier 2022"
  };

  const openLightbox = (imageIndex) => {
    setSelectedImage(images[imageIndex]);
    setCurrentImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % images.length
      : (currentImageIndex - 1 + images.length) % images.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="gallery-page">
      {/* Header */}
      <header className="gallery-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Gallery
        </button>
        <h1 className="gallery-title">
          {sectionTitles[sectionId] || `Section ${sectionId + 1} Gallery`}
        </h1>
        <div className="gallery-count">{images.length} Photos</div>
      </header>

      {/* YouTube Video Section */}
      <div className="video-section">
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoInfo.videoId}?rel=0&modestbranding=1&showinfo=0`}
              title={videoInfo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="scroll-hint">
            <span>Scroll down to explore the gallery</span>
            <div className="scroll-arrow-down">↓</div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="gallery-section">
        <h2 className="gallery-section-title">Photo Gallery</h2>
        
        {/* Gallery Grid */}
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image} 
                alt={`Gallery ${sectionId + 1} - Image ${index + 1}`}
                loading="lazy"
              />
              <div className="gallery-overlay">
                <span className="view-icon">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={() => navigateImage('prev')}
            >
              ‹
            </button>
            
            <img 
              src={selectedImage} 
              alt={`Gallery ${sectionId + 1} - Image ${currentImageIndex + 1}`}
              className="lightbox-image"
            />
            
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={() => navigateImage('next')}
            >
              ›
            </button>
            
            <div className="lightbox-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
