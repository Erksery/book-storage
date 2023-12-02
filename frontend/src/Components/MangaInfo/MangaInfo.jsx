import React from "react";
import "./MangaInfo-CSS.css";
import { Link } from "react-router-dom";

function MangaInfo({ description }) {
  return (
    <>
      <span>{description}</span>
      <div className="Tags-container">
        <div className="Tag">Фэнтези</div>
        <div className="Tag">Комедия</div>
        <div className="Tag">Приключение</div>
        <div className="Tag">Повседневность</div>
      </div>
      <div className="Translators-container">
        <h3>Переводчики</h3>
        <div className="Translators-list-container">
          <div className="Translators-item">
            <img src="https://mirai.senkuro.net/teams/35424812478259604/avatars/0447f7a472b373465aa7bd7dcc31e784b853f20a_50599254628000155.jpeg" />
            Assley Team
          </div>
          <div className="Translators-item">
            <img src="https://mirai.senkuro.net/teams/35424812478259604/avatars/0447f7a472b373465aa7bd7dcc31e784b853f20a_50599254628000155.jpeg" />
            Assley Team
          </div>
          <div className="Translators-item">
            <img src="https://mirai.senkuro.net/teams/35424812478259604/avatars/0447f7a472b373465aa7bd7dcc31e784b853f20a_50599254628000155.jpeg" />
            Assley Team
          </div>
        </div>
        <div className="Related-container">
          <h3>Похожее</h3>
        </div>
      </div>
    </>
  );
}

export default MangaInfo;
