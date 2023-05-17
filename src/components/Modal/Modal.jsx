import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledModalOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, altText } = this.props;
    return createPortal(
      <StyledModalOverlay onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={largeImageURL} alt={altText} />
        </div>
      </StyledModalOverlay>,
      modalRoot
    );
  }
}
