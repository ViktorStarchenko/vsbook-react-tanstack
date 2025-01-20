import axios from "axios";
import {useState, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchPostImage} from "../util/http";


export function usePostImage({post}) {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['bookImage', {postId: post.id}],
        queryFn: ({signal}) => fetchPostImage({signal, post, postId: post.id})
    })

    // const [data, setData] = useState('');
    // const getImage = async () => {
    //     try {
    //         const response = await axios.get(post?._links['wp:featuredmedia'][0]?.href);
    //
    //         if (response.data && response.data.source_url) {
    //             setData(response.data.source_url);
    //         }
    //     } catch(error) {
    //         console.log("Error - ", error);
    //     }
    // }
    //
    // useEffect(() => {
    //     if (!post) return;
    //     getImage()
    // }, [post])

    return {data, isLoading, isError, error};
}