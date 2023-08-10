import React, { useState } from 'react';
import Home from '../home/Home'; // Import your Home component
import Audio from '../Audio/Audio'; // Import your Audio component

function ParentComponent() {
    const [isHomeVisible, setIsHomeVisible] = useState(true);
  
    const handleOpenHome = () => {
      setIsHomeVisible(true);
    };
  
    const handleOpenAudio = () => {
      setIsHomeVisible(false);
    };
  
    console.log('handleOpenHome prop type:', typeof handleOpenHome);
  
    return (
      <div>
        {isHomeVisible ? (
          <Home onOpenAudio={handleOpenAudio} />
        ) : (
          <Audio onOpenHome={handleOpenHome} />
        )}
      </div>
    );
  }
  

export default ParentComponent;
