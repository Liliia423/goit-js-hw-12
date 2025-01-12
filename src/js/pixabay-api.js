import axios from 'axios';

const API_KEY = '45378122-3aa1f0accb7d59cfaae2c348a';
const BASE_URL = 'https://pixabay.com/api/';



export async function requestSending(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in requestSending:', error.message);
    throw new Error(`HTTP error! ${error.message}`);
  }
}