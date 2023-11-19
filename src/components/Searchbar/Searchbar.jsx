import { Component } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  Input,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onGetSearchValue(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <Input
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            value={this.state.name}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
