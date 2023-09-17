import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ImageManga from "./ImageManga.jsx";

// eslint-disable-next-line react/prop-types
function GetSearchManga({ searchValue, setModalSearch }) {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchValue != "") {
      const fetchManga = async () => {
        const resData = await axios.get("/api/searchManga", {
          params: { value: searchValue },
        });

        setSearchData(resData.data);
      };
      fetchManga().then();
    }
  }, [searchValue]);

  if (searchData.length === 0) {
    return <p style={{ textAlign: "center" }}>Ничего не найдено</p>;
  }

  return (
    <>
      {searchData.map((item) => (
        <Link
          to={`/manga/${item.idManga}`}
          onClick={() => setModalSearch(false)}
          key={item.idManga}
          className="Card-item"
        >
          <ImageManga
            width={60}
            height={80}
            src={`http://localhost:5001/image/${item.coverImageManga}`}
          />

          <div className="Card-item-info">
            <label>{item.titleManga}</label>
            <p>Solo leveling</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default GetSearchManga;
