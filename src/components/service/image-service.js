import axios from 'axios';

const API_KEY = '42310710-0bcfa885b8d0bd9d4e21f3c00';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getPhotos = async ({ q, page }) => {
  try {
    const response = await axios.get('', { params: { q, page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
