import { useState, useRef } from "react";
import { useQueryCreateChapter } from "../../hooks/useQueryCreateChapter.js";
import { useQueryCreateBook } from "../../hooks/useQueryCreateBook.js";
import { useParams } from "react-router";
import "./ChapterCreate-CSS.css";

function ChapterCreate() {
  const [array, setArray] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const { mutate } = useQueryCreateChapter();
  const mutationAddImage = useQueryCreateBook();
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const handleClear = (file) => {
    const filename = file.name;
    const newFilename = filename.replace(/\.(jpg|png|jpeg)$/i, "");
    setTimeout(() => {
      setImageUrl(newFilename);
    }, 1000);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    mutationAddImage.mutate(file);
    handleClear(file);
  };

  const submitPush = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const field = Object.fromEntries(formData);
    const stringArray = JSON.stringify(array);
    const obj = { array: stringArray, numberChapter: field.number };
    mutate(obj);
  };

  return (
    <div>
      <h2>Добавить главу</h2>

      <div className="CreateForm-container">
        <form
          action={`/api/manga/${id}/createChapters`}
          method="post"
          onSubmit={submitPush}
        >
          <div className="FormInfo-container">
            <div
              className="File-container"
              onClick={() => fileInputRef.current.click()}
            >
              {!imageUrl ? (
                <label>Нажмите, чтобы загрузить картинку</label>
              ) : (
                <img
                  width={70 * 2}
                  height={100 * 2}
                  src={`http://localhost:5001/image/${imageUrl}`}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "30%",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <input type="text" name="number" placeholder="Номер главы" />
                <input type="text" name="title" placeholder="Название главы" />
              </div>

              <button
                type="button"
                onClick={() =>
                  setArray((prevArray) => [...prevArray, imageUrl])
                }
              >
                Добавить
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            name="fileData"
            onChange={handleFileChange}
          />
          <div className="ChapterImages-container">
            {array.map((item) => (
              <img
                key={item}
                width={70 * 2}
                height={100 * 2}
                src={`http://localhost:5001/image/${item}`}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 30,
            }}
          >
            <button className="SubmitButton" type="submit">
              Загрузить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChapterCreate;
