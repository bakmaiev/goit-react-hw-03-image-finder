import { Modal } from 'components/Modal';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = { isShowModal: false };

  toggleModal = () => {
    this.setState({ isShowModal: true });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <>
        <li className="image-gallery-item">
          <img src={webformatURL} alt={tags} />
        </li>
        <Modal largeImageURL={largeImageURL} />
      </>
    );
  }
}
