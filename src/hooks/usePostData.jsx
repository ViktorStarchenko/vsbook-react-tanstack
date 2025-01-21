import { useEffect, useState } from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {fetchPost} from "../util/http";

export function usePostData(postId) {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['post', {postId}],
        queryFn: () => fetchPost({request: {}, params: {}, postId})
    })

    return {data, isLoading, isError, error};
}
