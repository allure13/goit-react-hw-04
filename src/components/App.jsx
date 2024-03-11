import './App.css';
import SearchBar from './SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImg } from '../images-api';
import toast, { Toaster } from 'react-hot-toast';

import ImageModal from './ImageModal/ImageModal';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    // пропускаємо монтування
    if (searchQuery === '') {
      return;
    }

    async function getImg() {
      try {
        setLoading(true);
        setError(false);

        const fetchedImg = await fetchImg(searchQuery, page);

        // додаємо картинки до вже існуючих, а не заміняємо їх
        setImages(prevImages => {
          return [...prevImages, ...fetchedImg];
        });
        toast.success('HTTP success!:)');
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImg();
  }, [searchQuery, page]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);

    // скидаємо сторінку пошуку до 1, коли вводимо новий запит
    setPage(1);

    // скидаємо масив данних попереднього пошуку
    setImages([]);
  };

  // додаємо +1 сторінку при натисканні на лоардмор
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleOpenModal = value => {
    setModalIsOpen(true);
    setModalContent(value);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      <Toaster position="bottom-center" />

      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={handleOpenModal} />
      )}
      <div
        style={{
          position: 'fixed',
          top: '10',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && <Loader />}
      </div>

      {images.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}

      {Object.keys(modalContent).length !== 0 && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
          content={modalContent}
        />
      )}
    </div>
  );
}
