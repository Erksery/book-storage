import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {useParams, useNavigate} from "react-router";

export const useQueryCreateChapter = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const {id} = useParams()

    async function createProduct(data) {
        return axios.post(`/api/manga/${id}/createChapters`, data);
    }

    return useMutation((newProduct) => createProduct(newProduct), {
        onSuccess: () => {
            queryClient.invalidateQueries(["chapterCreate"])
            navigate(`/manga/${id}`)
        },
        onError: () => alert("404"),
    });
};
