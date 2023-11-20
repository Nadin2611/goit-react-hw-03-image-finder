import { Overlay, ModalEl } from './Modal.styled';

export const Modal = ({ imageURL, onClose }) => {
  console.log('Current imageURL:', imageURL);
  return (
    <Overlay onClick={onClose}>
      <ModalEl>
        <img src={imageURL} alt="modal" />
      </ModalEl>
    </Overlay>
  );
};
