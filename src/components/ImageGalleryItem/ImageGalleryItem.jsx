import {
  ImageGalleryCard,
  ImageGalleryPicture,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onClick }) => {
  // console.log(image.largeImageURL);
  return (
    <ImageGalleryCard
      onClick={() => {
        onClick(image.largeImageURL);
      }}
    >
      <ImageGalleryPicture src={image.webformatURL} alt={image.id} />
    </ImageGalleryCard>
  );
};
