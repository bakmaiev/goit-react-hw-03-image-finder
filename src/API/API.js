import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34958715-9ce4ce8564d7b2e391d81a960';

const options = {
  page: 1,
  per_page: 12,
  totalImages: null,
};

export const fetchCard = async imageName => {
  try {
    return axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: imageName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: options.page,
        per_page: options.per_page,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

// export const resetPage = () => {
//   options.page = 1;
// };

// export const incrementPage = () => {
//   options.page += 1;
// };

// export const setTotal = total => {
//   this.totalImages = total;
// };

// export const hasMoreImages = () => {
//   return options.page < Math.ceil(this.totalImages / this.per_page);
// };
