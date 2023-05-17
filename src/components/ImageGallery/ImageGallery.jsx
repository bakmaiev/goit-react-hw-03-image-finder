import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { StyledListGallery } from './ImageGallery.styled';

export const ImageGallery = ({ data }) => {
  return (
    <StyledListGallery>
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
    </StyledListGallery>
  );
};
