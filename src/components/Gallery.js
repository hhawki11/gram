import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { getImagesForSection } from '../utils/imageLoader';

// Fallback images for sections that might not have folders yet
const fallbackImages = {
  1: [
    'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ]
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

// Generate fallback images for all sections
for (let i = 2; i < 8; i++) {
  fallbackImages[i] = fallbackImages[1]; // Reuse unsplash images for demo
}

const Gallery = ({ sectionId, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load images from the appropriate folder
  useEffect(() => {
    const loadImages = () => {
      try {
        const folderMedia = getImagesForSection(sectionId);
        
        if (folderMedia.length > 0) {
          setImages(folderMedia);
        } else {
          // Use fallback images if no media found in folder
          const fallbackMedia = (fallbackImages[sectionId] || fallbackImages[1] || [])
            .map(url => ({ src: url, type: 'image', filename: 'fallback' }));
          setImages(fallbackMedia);
        }
      } catch (error) {
        console.error('Error loading media:', error);
        const fallbackMedia = (fallbackImages[sectionId] || fallbackImages[1] || [])
          .map(url => ({ src: url, type: 'image', filename: 'fallback' }));
        setImages(fallbackMedia);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [sectionId]);

  const videoInfo = videoData[sectionId];
  const sectionTitles = {
    0: "Europe 2025",
    1: "NYC Marathon 2024",
    2: "Japan 2024",
    3: "California 2024",
    4: "Key West 2024",
    5: "Mt. Rainier 2022"
  };

  const openLightbox = (mediaIndex) => {
    setSelectedImage(images[mediaIndex]);
    setCurrentImageIndex(mediaIndex);
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
        <div className="gallery-count">{images.length} {images.length === 1 ? 'Item' : 'Items'}</div>
      </header>

      {/* YouTube Video Section - only show if video data exists */}
      {videoInfo && (
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
      )}

      {/* Gallery Section */}
      <div className="gallery-section">
        <h2 className="gallery-section-title">{sectionTitles[sectionId] || `Section ${sectionId + 1} Gallery`}</h2>
        
        {/* Gallery Grid */}
        {loading ? (
          <div className="loading-container">
            <p>Loading images...</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((media, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                {media.type === 'video' ? (
                  <div className="video-thumbnail">
                    <video 
                      src={media.src} 
                      muted
                      preload="metadata"
                      className="gallery-video-preview"
                    />
                    <div className="video-play-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={media.src} 
                    alt={`Gallery ${sectionId + 1} - Item ${index + 1}`}
                    loading="lazy"
                  />
                )}
                <div className="gallery-overlay">
                  <span className="view-icon">{media.type === 'video' ? '🎬' : '🔍'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
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
            
            {selectedImage && selectedImage.type === 'video' ? (
              <video 
                src={selectedImage.src} 
                controls
                autoPlay
                className="lightbox-video"
                onLoadedMetadata={(e) => {
                  // Optionally set initial volume
                  e.target.volume = 0.7;
                }}
              />
            ) : (
              <img 
                src={selectedImage?.src || selectedImage} 
                alt={`Gallery ${sectionId + 1} - Item ${currentImageIndex + 1}`}
                className="lightbox-image"
              />
            )}
            
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
