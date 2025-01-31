import BooksListing from "../BookListing/BooksListing";
import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";
import {useQuery} from "@tanstack/react-query";
import {fetchRelativePosts} from "../../util/http";
import LoadingIndicator from "../LoadingIndicator";

export default function BookSingleRelatives({post, title = "See similar books"}) {

    const {data, isLoading, isError, error} = usePostTaxonomies(post);

    let filtersArray;
    if (data) {
        const convertToArray = (obj) => {
            return Object.entries(obj)
                .filter(([key]) => !['reading_status', 'release', 'language', 'wrirer'].includes(key))
                .map(([key, value]) => {
                    const ids = value.map(item => item.id).join(','); // Convert the ID array to a comma-separated string
                    return [key, ids];
                });
        };
        filtersArray = convertToArray(data);
    }

    const {data: dataRelative, isLoading: isLoadingRelative, isError: isErrorRelative, error: errorRelative} = useQuery({
        queryKey: ['relativePosts', { postId: post.id, filtersArray: filtersArray, perPage: 5 }],
        queryFn: ({signal}) => fetchRelativePosts({signal, filtersArray, perPage: 5}),
        enabled: !!filtersArray
    });

    let relativePosts
    if (dataRelative) {
        relativePosts = dataRelative.filter((item) => item.id != post.id)
    }

    return (
        <>
            {isLoadingRelative && <LoadingIndicator />}
            {relativePosts && relativePosts.length > 0 && <div className="h2">{title}</div>}
            {relativePosts && relativePosts.length > 0 && <BooksListing books={relativePosts}/>}
        </>
    )
}