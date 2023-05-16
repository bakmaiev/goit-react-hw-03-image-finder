import { ImageGalleryItem } from 'components/ImageGalleryItem';
import React from 'react';

export const ImageGallery = ({ data }) => {
  return (
    <ul className="gallery">
      {data.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            image={image}
          />
        );
      })}
    </ul>
  );
};
