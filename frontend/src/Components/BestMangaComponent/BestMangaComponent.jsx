import React, { useEffect, useRef, useState } from "react";
import BigCartManga from "../BigCartManga/BigCartManga.jsx";
import { useQueryGetBooks } from "../../hooks/useQueryGetBooks.js";
import "./BestMangaComponent-CSS.css";
function BestMangaComponent({ data, isLoading }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    console.log("11232313");
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; // Множитель для скорости прокрутки
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="BestManga-container"
    >
      <>
        <BigCartManga data={data} isDragging={isDragging} />
      </>

    </div>
  );
}

export default React.memo(BestMangaComponent);
