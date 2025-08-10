import React, { useState, useEffect, useCallback } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from "./Loader/Loader";

const API_KEY = "YOUR_PIXABAY_API_KEY"; // Встав свій ключ з https://pixabay.com/api/docs/

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]); 
  }, []);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${encodeURIComponent(query)}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );
        const data = await response.json();

        setImages((prevImages) =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
        setTotalImages(data.totalHits);
      } catch (error) {
        console.error("Помилка завантаження:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page, perPage]);

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onLoadMore={handleLoadMore}
          totalImages={totalImages}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
