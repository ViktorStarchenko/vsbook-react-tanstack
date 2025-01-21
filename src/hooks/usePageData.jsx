import {useQuery} from "@tanstack/react-query";
import {fetchPage} from "../util/http";

export function usePageData(postId) {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['page', {postId}],
        queryFn: ({signal}) => fetchPage({signal, postId})
    })

    return {data, isLoading, isError, error};
}