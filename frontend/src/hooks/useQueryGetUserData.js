import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";

export const useQueryGetUserData = () => {
  const { id } = useParams();
  async function fetchData() {
    const resData = await axios.get(`/api/user/${id}`);
    const bookMarks = await axios.get("/api/bookMarks", {
      params: { idUser: id },
    });
    return { ...resData.data, bookMarks: bookMarks.data };
  }

  return useQuery(["userData"], fetchData, { keepPreviousData: true });
};
