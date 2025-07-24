import React, { useState, useEffect } from 'react';
import './ScrollingGallery.css';
import coverImage from '../img/Europe 2025/cover.JPG';
import nycCover from '../img/NYC Marathon 2024/cover.JPG';
import japanCover from '../img/Japan 2024/cover.JPG';
import californiaCover from '../img/California 2024/cover.JPG';
import keyWestCover from '../img/Key West 2024/cover.jpg';
import rainierCover from '../img/Mt. Rainier 2022/cover.jpg';


// Sample images - replace these with your actual image URLs
const images = [
  coverImage,
  nycCover,
  japanCover,
  californiaCover,
  keyWestCover,
  rainierCover
];

const ScrollingGallery = ({ onNavigateToGallery }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      setScrollProgress(scrollPercent);
      
      // Calculate which image should be shown based on scroll position
      const exactIndex = scrollPercent * (images.length - 1);
      const currentIndex = Math.floor(exactIndex);
      const nextIndex = Math.min(currentIndex + 1, images.length - 1);
      const progress = exactIndex - currentIndex;
      
      setCurrentImageIndex(currentIndex);
      setNextImageIndex(nextIndex);
      setTransitionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create sections for scrolling
  const sections = images.map((image, index) => ({
    id: index,
    title: getSectionTitle(index),
    description: getSectionDescription(index)
  }));

  // Section titles and descriptions
  function getSectionTitle(index) {
    const titles = [
      "Europe 2025",
      "NYC Marathon 2024",
      "Japan 2024", 
      "California 2024",
      "Key West 2024",
      "Mt. Rainier 2022"
    ];
    return titles[index] || `Section ${index + 1}`;
  }

  function getSectionDescription(index) {
    const descriptions = [
        
    ];
    return descriptions[index] || "";
  }

  return (
    <div className="scrolling-gallery">
      {/* Fixed background container */}
      <div className="background-container">
        {images.map((image, index) => {
          let opacity = 0;
          
          if (index === currentImageIndex) {
            opacity = 1 - transitionProgress;
          } else if (index === nextImageIndex && currentImageIndex !== nextImageIndex) {
            opacity = transitionProgress;
          } else if (currentImageIndex === nextImageIndex && index === currentImageIndex) {
            opacity = 1;
          }
          
          return (
            <div
              key={index}
              className="background-image"
              style={{ 
                backgroundImage: `url(${image})`,
                opacity: opacity
              }}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-content">
          <h1 className="logo">Gram</h1>
          <div className="nav-indicators">
            {images.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentImageIndex ? 'active' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Scrollable content */}
      <div className="content">
        {sections.map((section, index) => (
          <section key={section.id} className="content-section">
            <div className="section-content">
              <h2 className="section-title">{section.title}</h2>
              <p className="section-description">{section.description}</p>
              
              <button 
                className="gallery-button"
                onClick={() => onNavigateToGallery(section.id)}
              >
                View Gallery
              </button>
              
              {index === 0 && (
                <div className="scroll-indicator">
                  <span>Scroll to explore</span>
                  <div className="scroll-arrow">↓</div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollingGallery;
