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
    totalImage: 0,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue } = this.state;

    if (searchValue !== prevState.searchValue) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { searchValue, page } = this.state;
    this.setState({ loading: true });

    try {
      const { hits, totalHits } = await getImage(searchValue, page);

      if (hits.length === 0) {
        toast.warn(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }

      if (page === Math.ceil(totalHits / 12)) {
        toast.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }

      this.setState(
        prevState => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          loading: false,
          totalImage: totalHits || prevState.totalHits,
        }),
        () => {
          toast.success(`Hooray! We found ${this.state.totalImage} images.`);
          return;
        }
      );
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(`Not Found!`, error);
      }
      if (error.response.status === 400) {
        toast.error(`Bad Request!`, error);
      }
    } finally {
      this.setState({ loading: false });
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
    // console.log(largeImage);
    this.setState({ largeImage });
  };

  handleCloseModal = () => {
    this.setState({ largeImage: null });
  };

  render() {
    const { images, loading, largeImage, totalImage } = this.state;

    return (
      <>
        <SearchBar onGetSearchValue={this.handleSearchValue}></SearchBar>

        <ImageGallery
          images={images}
          onClick={selectedImage => {
            this.handleClickImage(selectedImage);
          }}
        ></ImageGallery>

        {loading && <Loader />}

        {totalImage > images.length && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {largeImage && (
          <Modal imageURL={largeImage} onClose={this.handleCloseModal} />
        )}

        <ToastContainer />
      </>
    );
  }
}
