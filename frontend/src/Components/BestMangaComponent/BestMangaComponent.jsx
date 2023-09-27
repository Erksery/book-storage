import React, { useEffect, useRef, useState } from "react";
import BigCartManga from "../BigCartManga/BigCartManga.jsx";
import "./BestMangaComponent-CSS.css";
import ScrollContainer from "react-indiana-drag-scroll";
function BestMangaComponent({ data, isLoading }) {

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
      <ScrollContainer className="BestManga-container">
        <BigCartManga data={data} />
      </ScrollContainer>
  );
}
export default React.memo(BestMangaComponent);
