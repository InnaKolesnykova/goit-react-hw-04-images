import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      images: [],
      page: 1,
      perPage: 12,
      isLoading: false,
      totalImages: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      this.fetchImages();
    }
  }

  handleSearch = (query) => {
    this.setState({ query, images: [], page: 1, totalImages: 0 });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }));
  };

  fetchImages = () => {
    const { query, page, perPage } = this.state;
    const apiKey = '41687911-62b9e6d772891b12bf67d3c73';
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    this.setState({ isLoading: true });

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          totalImages: data.total,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { perPage, query, images, isLoading, totalImages, page } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          query={query}
          page={page}
          perPage={perPage}
          images={images}
          isLoading={isLoading}
          totalImages={totalImages}
          onLoadMore={this.handleLoadMore}
        />
      </div>
    );
  }
}