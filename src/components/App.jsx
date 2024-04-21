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
    loadMoreClicked: false,
    hasMoreImages: true,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page, loadMoreClicked } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.page !== page ||
      (loadMoreClicked && prevState.loadMoreClicked !== loadMoreClicked)
    ) {
      this.getPhotos({ searchQuery, page, loadMoreClicked });
    }
  }

  getPhotos = () => {
    const { searchQuery, page, loadMoreClicked } = this.state;
    const nextPage = loadMoreClicked ? page + 1 : page;

    this.setState({ isLoading: true });

    getPhotos({ q: searchQuery, page: nextPage })
      .then(response => {
        this.setState(prevState => ({
          images: loadMoreClicked
            ? [...prevState.images, ...response]
            : response,
          page: nextPage,
          hasMoreImages: response.length > 0,
        }));
      })
      .finally(() => {
        this.setState({ isLoading: false, loadMoreClicked: false });
      });
  };

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  handleLoadMoreClick = () => {
    this.setState({ loadMoreClicked: true });
  };

  handleImageClick = largeImageUrl => {
    this.setState({ showModal: true, largeImageURL: largeImageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {this.state.hasMoreImages && !this.state.isLoading && (
          <Button onClick={this.handleLoadMoreClick} />
        )}

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
