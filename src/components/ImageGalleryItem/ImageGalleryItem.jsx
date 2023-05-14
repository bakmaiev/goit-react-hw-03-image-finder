import React from 'react';

const ImageGalleryItem = ({ webformatURL, largeImageURL, name }) => {
  return (
    <li className="gallery-item">
      <img src={webformatURL} alt={name} />
    </li>
  );
};

export default ImageGalleryItem;
