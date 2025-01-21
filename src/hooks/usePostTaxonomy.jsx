import {useQuery} from "@tanstack/react-query";
import {fetchPostTaxonomy} from "../util/http";

export function usePostTaxonomy({taxonomyName, postId}) {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['postAuthor', { taxonomyName: taxonomyName, postId: postId }],
        queryFn: (signal) => fetchPostTaxonomy({signal, taxonomyName: taxonomyName, postId: postId })
    })

    return {data, isLoading, isError, error};
}