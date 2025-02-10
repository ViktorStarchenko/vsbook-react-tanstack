import {useQuery} from "@tanstack/react-query";
import {fetchPage} from "../util/http";

export function usePageData(slugOrId) {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['page', {slugOrId: slugOrId}],
        queryFn: ({signal}) => fetchPage({signal, slugOrId: slugOrId}),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    return {data, isLoading, isError, error};
}