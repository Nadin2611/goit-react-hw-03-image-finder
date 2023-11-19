import { Overlay, ModalEl } from './Modal.styled';

export const Modal = ({ imageUrl, onClose }) => {
  <Overlay onClick={onClose}>
    <ModalEl>
      <img src={imageUrl} alt="modal" />
    </ModalEl>
  </Overlay>;
};
