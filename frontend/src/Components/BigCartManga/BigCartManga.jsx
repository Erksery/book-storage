import React from "react";
import { Link } from "react-router-dom";
import ImageManga from "../ImageManga.jsx";
import "./BigCartManga-CSS.css";

function BigCartManga({ data, isDragging }) {
  const handleDragging = (event) => {
    if (isDragging) event.preventDefault();
  };

  return (
    <div className="BigCartManga-container">
      {data.map((item) => (
        <Link
          onClick={handleDragging}
          to={`/manga/${item.idManga}`}
          key={item.idManga}
          className="Manga"
        >
          {!item.coverImageManga ? (
            <ImageManga
              width={70 * 2.4}
              height={100 * 2.4}
              src="http://localhost:5001/image/kandinsky-download-1694512954103.jpg"
            />
          ) : (
            <ImageManga
              width={70 * 2.4}
              height={100 * 2.4}
              src={`http://localhost:5001/image/${item.coverImageManga}`}
            />
          )}

          <div>
            <span>Манхва | {item.rateManga}.6</span>

            {item.titleManga}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BigCartManga;
