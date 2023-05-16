import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { fetchCard, hasMoreImages } from 'API';
import { Loader } from './Loader';
import { Button } from './Button';

export class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const prevValue = prevState.value;
    const nextValue = this.state.value;

    if (nextValue.toLowerCase() !== prevValue.toLowerCase()) {
      this.getCards();
    }

    if (prevState.page < this.state.page) {
      this.getCards();
    }

    if (this.state.page > 1) {
      setTimeout(() => {
        window.scrollBy({
          top: 500,
          behavior: 'smooth',
        });
      }, 200);
    }
  }

  getCards = async () => {
    const { value, page } = this.state;

    try {
      this.setState({ isLoading: true });

      const { data } = await fetchCard(value, page);

      if (data.totalHits === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (!hasMoreImages(page, data.totalHits)) {
        toast.info(
          "We're sorry, but you've reached the end of search results."
        );
      }

      this.setState(prevState => ({
        images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
      }));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = value => {
    if (value.toLowerCase() === this.state.value.toLowerCase()) {
      toast.info(
        `We already found '${value.toLowerCase()}'! Enter something different.`
      );
      return;
    }
    this.setState({
      value: value,
      page: 1,
      images: [],
    });
  };

  handleImageClick = () => {
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && <Loader />}
        {images && <ImageGallery data={this.state.images} />}
        {images.length > 0 && isLoading === false && (
          <Button onClick={this.handleLoadMore} />
        )}
        <ToastContainer />
      </>
    );
  }
}
