import React from "react";
import "./Home-CSS.css";
import GetManga from "../../Components/GetManga/GetManga.jsx";
import BestMangaComponent from "../../Components/BestMangaComponent/BestMangaComponent.jsx";
import {useQueryGetBooks} from "../../hooks/useQueryGetBooks.js";

function HomePage() {
    const { data, isLoading } = useQueryGetBooks();
  return (
    <div className="HomePage-container">
      <h2>Новенькое на сайте</h2>
      <BestMangaComponent data={data} isLoading={isLoading}/>
      <h2>Лучшие тайтлы</h2>
      <GetManga data={data} isLoading={isLoading}/>
    </div>
  );
}

export default HomePage;
