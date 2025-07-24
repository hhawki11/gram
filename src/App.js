import React, { useState } from 'react';
import ScrollingGallery from './components/ScrollingGallery';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'gallery'
  const [selectedSection, setSelectedSection] = useState(0);

  const navigateToGallery = (sectionId) => {
    setSelectedSection(sectionId);
    setCurrentView('gallery');
  };

  const navigateToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="App">
      {currentView === 'home' ? (
        <ScrollingGallery onNavigateToGallery={navigateToGallery} />
      ) : (
        <Gallery sectionId={selectedSection} onBack={navigateToHome} />
      )}
    </div>
  );
}

export default App;
