import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images = [], onImageClick }) => (
  <ul className={styles.ImageGallery}>
    {images &&
      images.length > 0 &&
      images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          largeImageUrl={image.largeImageURL}
          onImageClick={onImageClick}
        />
      ))}
  </ul>
);

export default ImageGallery;
