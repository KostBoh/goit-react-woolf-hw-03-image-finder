import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, largeImageUrl, onImageClick }) => {
  const handleClick = () => {
    onImageClick(largeImageUrl);
  };

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imageUrl}
        alt="Gallery"
        data-large={largeImageUrl}
        className={styles.ImageGalleryItem_image}
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
