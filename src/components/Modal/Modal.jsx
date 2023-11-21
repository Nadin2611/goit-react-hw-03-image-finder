import { Component } from 'react';

import { Overlay, ModalEl } from './Modal.styled';

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { imageURL, onClose } = this.props;

    return (
      <Overlay onClick={onClose}>
        <ModalEl>
          <img src={imageURL} alt="modal" />
        </ModalEl>
      </Overlay>
    );
  }
}
