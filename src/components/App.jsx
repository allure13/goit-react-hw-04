// import { useEffect, useState } from 'react';
// import './App.css';
// import axios from 'axios';
// import SearchBar from './SearchBar/SearchBar';
// import toast, { Toaster } from 'react-hot-toast';

// export default function App() {
//   const key = `8Vc-6WYU8HQztwo20-oWkEozh2T2dJ5LDtNugos7l00`;

//   const [searchQuery, setSearchQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const apiUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&page=${page}&client_id=${key}`;

//     async function fetchImg() {
//       try {
//         const response = await axios.get(apiUrl);
//         setImages(prevImages =>
//           page === 1
//             ? response.data.results
//             : [...prevImages, ...response.data.results]
//         );
//       } catch (error) {
//         setError('Error fetching images. Please try again.');
//       } finally {
//         setError.Loading(false);
//       }
//     }
//     if (searchQuery) {
//       fetchImg();
//     }
//   }, [searchQuery, page, key]);

//   return (
//     <>
//       <SearchBar />
//       <Toaster />
//     </>
//   );
// }

import './App.css';
import SearchBar from './SearchBar/SearchBar';
import { useEffect, useState, ErrorMessage } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from '../images-api';
import toast, { Toaster } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState[1];

  const handleSearch = async newQuery => {
    try {
      setLoading(true);
      setError(false);
      setImages([]);

      const fetchedImg = await fetchImg(newQuery, page);
      setImages(fetchedImg);

      setLoading(false);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}

      {images.length > 0 && <ImageGallery images={images} />}

      {loading && (
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}

      {images.length > 0 && <button>Load more</button>}
    </div>
  );
}

// useEffect(() => {
//   if (searchQuery === '') {
//     return;
//   }

//   async function getImg() {
//     const fetchedImg = await fetchImg();
//     setImages(fetchedImg);
//   }
//   getImg();
// }, []);
