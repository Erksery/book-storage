import React from "react";
import "./MangaCatalog-CSS.css";
import { useQueryGetBooks } from "../../hooks/useQueryGetBooks.js";
import { Link } from "react-router-dom";
import ImageManga from "../../Components/ImageManga.jsx";
import BigCartManga from "../../Components/BigCartManga/BigCartManga.jsx";

function MangaCatalog() {
  const { data, isLoading } = useQueryGetBooks();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (data.length === 0) {
    return <h2>Данные отсутствуют</h2>;
  }
  return (
    <div>
      <h2>Каталог</h2>
      <div className="MangaCatalog-container">
        <div className="ListManga-container">
          <BigCartManga data={data} />
          <BigCartManga data={data} />
          <BigCartManga data={data} />
        </div>
        <div className="FilterManga-container">
          <div className="FilterManga">dasdas</div>
        </div>
      </div>
    </div>
  );
}

export default MangaCatalog;
