import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';
export const fetchImg = async (searchQuery, page = 1) => {
  const response = await axios.get('search/photos', {
    params: {
      query: searchQuery,
      page,
      client_id: `8Vc-6WYU8HQztwo20-oWkEozh2T2dJ5LDtNugos7l00`,
      per_page: 10,
    },
  });

  return response.data.results;
};
