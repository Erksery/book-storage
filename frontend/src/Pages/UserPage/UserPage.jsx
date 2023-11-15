import React, { useEffect, useState } from "react";
import { useQueryGetUserData } from "../../hooks/useQueryGetUserData.js";
import "./UserPage-CSS.css";
import MangaCart from "../../Components/MangaCart/MangaCart.jsx";

function UserPage() {
  const { data, isLoading } = useQueryGetUserData();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="UserPage-container">
      <h2>{data.loginUser}</h2>

      <div className="BookMarks-container">
        {data.bookMarks.map((item) => (
          <MangaCart key={item.idBookMarks} {...item} />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
