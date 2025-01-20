import {useQuery} from "@tanstack/react-query";
import {fetchPostTaxonomies} from "../util/http";

export function usePostTaxonomies(post) {
    const terms = post._links['wp:term'];
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['postTaxonomies', {postId: post.id, terms}],
        queryFn: ({signal}) => fetchPostTaxonomies({signal, postId: post.id, terms})
    })

    return {data, isLoading, isError, error}
}