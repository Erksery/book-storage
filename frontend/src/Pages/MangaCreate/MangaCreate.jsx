import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./MangaCreate-CSS.css";
import { useQueryCreateBook } from "../../hooks/useQueryCreateBook.js";

function MangaCreate() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { mutate } = useQueryCreateBook();

  const handleClear = (file) => {
    const filename = file.name;
    const newFilename = filename.replace(/\.(jpg|png|jpeg)$/i, "");
    setTimeout(() => {
      setAvatarUrl(newFilename);
    }, 1000);

    console.log(avatarUrl);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    mutate(file);
    handleClear(file);
  };

  return (
    <div className="MangaCreate">
      <h2>Добавить новый тайтл</h2>
      <div className="CreateForm-container">
        <form action="/api/createManga" method="post">
          <div className="MainInfo-container">
            <div>
              <h3>Обложка</h3>
              <div
                className="File-container"
                onClick={() => fileInputRef.current.click()}
              >
                {!avatarUrl ? (
                  <label>Нажмите, чтобы загрузить картинку</label>
                ) : (
                  <img
                    style={{ objectFit: "cover" }}
                    width={70 * 2}
                    height={100 * 2}
                    src={`http://localhost:5001/image/${avatarUrl}`}
                  />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="fileData"
                onChange={handleFileChange}
              />

              <input type="hidden" name="avatarUrl" value={avatarUrl} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <h3>Название</h3>
              <input type="text" name="title" placeholder="Название" />
              <input
                type="text"
                name="titleEn"
                placeholder="Английское название"
              />
              <div>
                <h3>Формат</h3>
                <div className="Info-container">
                  <input name="type" placeholder="Тип" />
                  <input name="format" placeholder="Формат выпуска" />
                  <input name="status" placeholder="Статус тайтла" />
                  <input name="translate" placeholder="Статус перевода" />
                  <input name="year" placeholder="Год релиза" />
                </div>
              </div>
            </div>
          </div>
          <div className="Additionally-info-container">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h3>Описание</h3>
              <textarea name="summary" placeholder="Описание" />
            </div>
            <div className="Authors-info">
              <h3>Авторы</h3>
              <input name="author" placeholder="Автор" />
              <input name="painter" placeholder="Художник" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1 }}>
                <h3>Теги</h3>
                <input
                  style={{ width: "90%" }}
                  name="tags"
                  placeholder="Теги"
                />
              </div>
              <div style={{ flex: 1 }}>
                <h3>Жанры</h3>
                <input name="genres" placeholder="Жанры" />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 30,
            }}
          >
            <button
              className="SubmitButton"
              onClick={() => {
                handleClear().then(() => navigate("/"));
              }}
              type="submit"
            >
              Загрузить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MangaCreate;
