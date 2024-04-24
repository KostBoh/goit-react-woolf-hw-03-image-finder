import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getPhotos } from './service/image-service';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import styles from './App.module.css';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    hasMoreImages: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getPhotos();
    }
  }

  getPhotos = () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    getPhotos({ q: searchQuery, page })
      .then(({ hits, totalHits }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          hasMoreImages: Math.ceil(totalHits / 12) > page,
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] }, () => {
      // this.getPhotos();
    });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageUrl => {
    this.setState({ showModal: true, largeImageURL: largeImageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, hasMoreImages } =
      this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {hasMoreImages && <Button onClick={this.handleLoadMoreClick} />}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
