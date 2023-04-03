import axios from 'axios';
export { getImages };

const BASE_URL = 'https://pixabay.com/api/?key=';
const KEY = '34585609-92a50f4d35f6702c558d8184b';

const getImages = async (search, page) => {
  try {
    const Parameters = new URLSearchParams({
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: 40,
    });

    const response = await axios.get(`${BASE_URL}${KEY}&${Parameters}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
