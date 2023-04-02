import axios from 'axios';
export { getImages };

const BASE_URL = 'https://pixabay.com/api/?key=';
const KEY = '34585609-92a50f4d35f6702c558d8184b';

const getImages = async (search, page) => {
  try {
    const params = {
      headers: { 'Content-type': 'application/json' },
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: 40,
    };
    const response = await axios.get(`${BASE_URL}${KEY}`, params);
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
