import React from "react";
import { Link } from "react-router-dom";
import ImageManga from "../ImageManga.jsx";
import "./BigCartManga-CSS.css";
import { motion } from "framer-motion";

function BigCartManga({ data }) {
  return (
    <>
      {data.map((item) => (
        <motion.div whileHover={{ scale: 1.1, zIndex: 60 }} key={item.idManga}>
          <Link to={`/manga/${item.idManga}`} className="Manga">
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
        </motion.div>
      ))}
    </>
  );
}

export default BigCartManga;
