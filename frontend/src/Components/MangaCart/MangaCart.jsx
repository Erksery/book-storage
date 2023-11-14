import React from "react";
import ImageManga from "../ImageManga.jsx";
import "./CSS-MangaCart.css";
function MangaCart(props) {
  return (
    <div className="MangaCart-container">
      <ImageManga
        width={70 * 2.4}
        height={100 * 2.4}
        src={`http://localhost:5001/image/${props.imageManga}`}
      />
      <p>{props.titleManga}</p>
    </div>
  );
}

export default MangaCart;
