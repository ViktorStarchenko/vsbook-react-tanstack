import {useQuery} from "@tanstack/react-query";
import {fetchPostImage} from "../util/http";


export function usePostImage({post}) {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['bookImage', {postId: post.id}],
        queryFn: ({signal}) => fetchPostImage({signal, post, postId: post.id}),
        refetchOnWindowFocus: false,
    })

    return {data, isLoading, isError, error};
}