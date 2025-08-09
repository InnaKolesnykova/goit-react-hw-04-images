import React, { useState, useEffect, useCallback } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from "./Loader/Loader";

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]); // очистити попередні результати
  }, []);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    // Тут твій API-запит або логіка пошуку
    fetch(`https://api.example.com/search?q=${query}&page=${page}&per_page=${perPage}`)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => page === 1 ? data.results : [...prevImages, ...data.results]);
        setTotalImages(data.total);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, [query, page, perPage]);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          query={query}
          page={page}
          perPage={perPage}
          images={images}
          isLoading={isLoading}
          totalImages={totalImages}
          onLoadMore={handleLoadMore}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
