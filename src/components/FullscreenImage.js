import React, { useState } from 'react';
import './FullscreenImage.css'; // Import CSS for styling

const FullscreenImage = ({ src, alt }) => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <div className="fullscreen-image" onClick={toggleFullscreen}>
      {fullscreen ? (
        <img src={src} alt={alt} className="fullscreen" />
      ) : (
        <img src={src} alt={alt} />
      )}
    </div>
  );
};

export default FullscreenImage;
