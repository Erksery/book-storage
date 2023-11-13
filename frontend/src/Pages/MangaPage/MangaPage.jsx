import React, { useState } from "react";
import { useQueryGetActiveManga } from "../../hooks/useQueryGetActiveManga.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./MangaPage.css";
import MangaTabs from "../MangaTabs/MangaTabs.jsx";
import { Icon36Favorite } from "@vkontakte/icons";
import { useCookies } from "react-cookie";
import axios from "axios";
function MangaPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { data, isLoading } = useQueryGetActiveManga();
  const [cookies] = useCookies(["AuthDataCookie"]);
  const { id } = useParams();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (data.length === 0) {
    return <h2>Данные отсутствуют</h2>;
  }

  function addBookMark() {
    return axios.post("/api/addBookMarks", {
      id: id,
      title: data.titleManga,
      image: data.coverImageManga,
      idUser: cookies.AuthDataCookie.idUser,
    });
  }

  const handleAddBookMark = () => {
    addBookMark();
  };

  return (
    <div className="MangaPage">
      <div className="Manga-sidebar">
        <img
          width={70 * 4}
          height={100 * 4}
          src={`http://localhost:5001/image/${data.coverImageManga}`}
          alt="..."
        />
        <button>Начать читать</button>
        <button onClick={handleAddBookMark} className="AddList-button">
          Добавить в список
        </button>
        <div className="Info-card">
          <label>Статус тайтла</label>
          <p>Выходит</p>
          <label>Год релиза</label>
          <p>2020</p>
          <label>Автор</label>
          <p>GEE So-Lyung</p>
          <label>Художник</label>
          <p>Jang Sung-lak</p>
          <label>Формат выпуска</label>
          <p>Веб</p>
        </div>
      </div>
      <div className="Manga-content">
        <div className="Manga-caption">
          <h2>
            {data.titleManga}
            <div className="Rate-info">
              <Icon36Favorite width={28} />
              {data.rateManga}.5
            </div>
          </h2>
          <p>Solo Leveling</p>
        </div>
        <div className="Manga-info-container">
          <div className="Tabs-container">
            <Link onClick={() => setActiveTab(0)}>Информация</Link>
            <Link onClick={() => setActiveTab(1)}>Главы</Link>
            <Link onClick={() => setActiveTab(2)}>Комментарии</Link>
          </div>
          <hr />
          <div className="Manga-info">
            <MangaTabs activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MangaPage;
