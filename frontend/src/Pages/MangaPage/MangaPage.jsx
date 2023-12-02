import React, { useState } from "react";
import { useQueryGetActiveManga } from "../../hooks/useQueryGetActiveManga.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./MangaPage.css";
import MangaTabs from "../MangaTabs/MangaTabs.jsx";
import { Icon36Favorite } from "@vkontakte/icons";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Transition } from "react-transition-group";
import Modal from "../../Components/Modal/Modal.jsx";

function MangaPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openRateModal, setOpenRateModal] = useState(false);
  const [userRate, setUserRate] = useState(0);
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
    return axios
      .post("/api/addBookMarks", {
        id: id,
        title: data.titleManga,
        image: data.coverImageManga,
        idUser: cookies.AuthDataCookie.idUser,
      })
      .catch((err) => console.log(err.response.data.error));
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
          <p>{data.statusManga}</p>
          <label>Год релиза</label>
          <p>{data.yearManga}</p>
          <label>Автор</label>
          <p>{data.authorManga}</p>
          <label>Художник</label>
          <p>{data.painterManga}</p>
          <label>Формат выпуска</label>
          <p>{data.formatManga}</p>
        </div>
      </div>
      <div className="Manga-content">
        <div className="Manga-caption">
          <h2>
            {data.titleManga}
            <div
              className="Rate-info"
              onClick={() => setOpenRateModal((prev) => !prev)}
            >
              <Icon36Favorite width={28} />
              {data.rateManga}.5
            </div>
          </h2>
          <p>Solo Leveling</p>
        </div>
        <div className="Manga-info-container">
          <div className="Tabs-container">
            <button onClick={() => setActiveTab(0)}>Информация</button>
            <button onClick={() => setActiveTab(1)}>Главы</button>
            <button onClick={() => setActiveTab(2)}>Комментарии</button>
          </div>
          <hr />
          <div className="Manga-info">
            <MangaTabs activeTab={activeTab} description={data.summaryManga} />
          </div>
        </div>
      </div>
      <Transition in={openRateModal} timeout={500}>
        {(openRateModal) => (
          <Modal
            openRateModal={openRateModal}
            setOpenRateModal={setOpenRateModal}
          >
            <div className="Rate-modal-container">
              <h4>Оценка тайтла</h4>
              <div className="Rate-star-container">
                {new Array(10).fill(1).map((item, index) => (
                  <div key={index} onClick={() => setUserRate(index + 1)}>
                    <Icon36Favorite
                      style={
                        userRate <= index
                          ? { color: "gray" }
                          : { color: "#646cff" }
                      }
                      width={28}
                    />
                  </div>
                ))}
              </div>
              <div className="Rate-success-button">
                <p>Вы поставили: {userRate}</p>
                <button
                  onClick={() => setOpenRateModal((prevState) => !prevState)}
                  disabled={userRate <= 0}
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Transition>
    </div>
  );
}

export default MangaPage;
