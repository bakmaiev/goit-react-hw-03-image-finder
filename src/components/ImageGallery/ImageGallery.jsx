import { fetchCard } from 'API';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    data: null,
    isLoading: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps) {
    if (this.props.imageName === prevProps.imageName) return;
    this.setState({ data: null });
    this.setState({ isLoading: true });
    this.getCard();
  }

  getCard = async () => {
    try {
      const { data } = await fetchCard(this.props.imageName);
      this.setState({ data: data.hits });
      console.log(data.hits);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { data, isLoading } = this.state;
    const name = this.props.imageName;
    return (
      <>
        {isLoading && <Loader />}
        <ul className="gallery">
          {data &&
            data.map(el => {
              return (
                <ImageGalleryItem
                  key={el.id}
                  webformatURL={el.webformatURL}
                  largeImageURL={el.largeImageURL}
                  name={name}
                />
              );
            })}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
