import { Component } from 'react';
// import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from './Searchbar/Searchbar';
// import { Modal } from './Modal/Modal';
// import { Button } from './Button/Button';
// import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImage } from 'service/image-service';

export class App extends Component {
  state = {
    images: [],
    searchValue: '',
    page: 1,
  };

  componentDidMount() {}

  componentDidUpdate(prevProp, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      // console.log(prevState.searchValue);
      // console.log(this.state.searchValue);
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { searchValue, page } = this.state;

    try {
      const images = await getImage(searchValue, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      toast.error('Error fetching images:', error);
    }
  };

  getSearchValue = formValue => {
    this.setState({ images: [], searchValue: formValue, page: 1 });
  };

  render() {
    return (
      <>
        {/* <Button></Button> */}
        <SearchBar onGetSearchValue={this.getSearchValue}></SearchBar>
        <ImageGallery
          images={this.state.images}
          onClick={this.state.onClick}
        ></ImageGallery>
        {/* <Loader></Loader> */}
        {/* <Modal></Modal> */}
        <ToastContainer />
      </>
    );
  }
}
