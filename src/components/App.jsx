import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImage } from 'service/image-service';

export class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
    loading: false,
    largeImage: null,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { searchValue, page } = this.state;
    this.setState({ loading: true });

    try {
      const imageData = await getImage(searchValue, page);

      this.setState(
        prevState => ({
          images: [...prevState.images, ...imageData],
          page: prevState.page + 1,
          loading: false,
        }),
        () => {
          console.log(this.state.images[0].largeImageURL);
        }
      );
    } catch (error) {
      toast
        .error('Error fetching images:', error)
        .finally(() => this.setState({ loading: false }));
    }
  };

  handleSearchValue = formValue => {
    this.setState({ images: [], searchValue: formValue, page: 1 });
  };

  handleLoadMore = () => {
    this.fetchData();
  };

  handleClickImage = largeImage => {
    // console.log('Click!');
    console.log(largeImage);
    this.setState({ largeImage });
  };

  handleCloseModal = () => {
    this.setState({ largeImage: null });
  };

  render() {
    const { images, loading, searchValue, largeImage } = this.state;

    return (
      <>
        <SearchBar onGetSearchValue={this.handleSearchValue}></SearchBar>
        {!searchValue && <h1>Please enter the text to search</h1>}
        <ImageGallery
          images={images}
          onClick={() => {
            this.handleClickImage(images[0].largeImageURL);
          }}
        ></ImageGallery>
        {loading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {largeImage && (
          <Modal imageURL={largeImage} onClose={this.handleCloseModal} />
        )}

        <ToastContainer />
      </>
    );
  }
}
