import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
  };
  getSearchValue = formValue => {
    this.setState({ searchValue: formValue });
  };
  render() {
    return (
      <>
        <SearchBar onGetSearchValue={this.getSearchValue}></SearchBar>
        <Modal></Modal>
      </>
    );
  }
}
