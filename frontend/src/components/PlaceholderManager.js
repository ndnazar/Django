import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import UploadDropzone from './dragNdrop';

const PlaceholderManager = () => {
  const [placeholders, setPlaceholders] = useState([]);

  useEffect(() => {
    const handleNewPlaceholder = (event) => {
      setPlaceholders((prev) => [...prev, event.detail.id]);
    };

    window.addEventListener('new-placeholder', handleNewPlaceholder);
    return () => window.removeEventListener('new-placeholder', handleNewPlaceholder);
  }, []);

  return (
    <>
      {placeholders.map((id) => (
        ReactDOM.createPortal(
          <UploadDropzone key={id} />,
          document.getElementById(id)
        )
      ))}
    </>
  );
};

export default PlaceholderManager;