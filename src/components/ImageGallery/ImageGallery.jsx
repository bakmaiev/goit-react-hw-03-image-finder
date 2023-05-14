import { fetchCard } from 'API';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {
    data: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.imageName === prevProps.imageName) return;
    this.getCard();
  }

  getCard = async () => {
    try {
      const { data } = await fetchCard(this.props.imageName);
      this.setState({ data: data.hits });
      console.log(data.hits);

      // if (!data.hits.length) {
      //   galleryListEl.innerHTML = '';
      //   return Notiflix.Notify.failure(
      //     'Sorry, there are no images matching your search query. Please try again.'
      //   );
      // }
      // galleryListEl.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      // loadMoreBtnEl.classList.remove('visually-hidden');
      // pixabaiAPI.setTotal(data.totalHits);
      // lightbox.refresh();
      // return Notiflix.Notify.success(
      //   `Done! We found ${data.totalHits} images.`
      // );
    } catch (err) {
      console.log(err);
    }
    //   finally {
    //   if (!pixabaiAPI.hasMoreImages()) {
    //     loadMoreBtnEl.classList.add('visually-hidden');
    //     Notiflix.Notify.info(
    //       "We're sorry, but you've reached the end of search results."
    //     );
    //   }
    // }
  };
  render() {
    const { data } = this.state;
    const name = this.props.imageName;
    return (
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
    );
  }
}

export default ImageGallery;
