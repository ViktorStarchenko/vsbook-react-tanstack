import { Link, useParams, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BookSingle from "../components/BookSingle/BookSingle";
import {Helmet} from "react-helmet-async";
import {cleanAndTruncate, fetchPost, queryClient, truncateContentByWords} from "../util/http";
import {useQuery} from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import Spacer from "../components/elements/Spacer";

export default function BookDetailPage() {
    const params = useParams();
    // const book = useLoaderData();
    // const book = useRouteLoaderData('book-detail');
    // console.log(book.title.rendered)

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['book', {postId: params.bookId}],
        queryFn: ({signal}) => fetchPost({signal, postId: params.bookId}),
    })

    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (isError) {
        content = <ErrorsBlockSingle error={error.message}/>
    }

    if (data) {
        content = <BookSingle post={data} />
    }

    let truncanedContent
    if(data.content) {
        truncanedContent = cleanAndTruncate(data.content.rendered, 50)
    }

    return (
        <>
            <Helmet>
                <title>{data.title.rendered} - VSBookcollection</title>
                {truncanedContent && <meta name="description" content={truncanedContent}/>}
            </Helmet>
            {content}
        </>

    )
}

export function loader({params, request}) {
    const postId = params.bookId
    return queryClient.fetchQuery({
        queryKey: ['book', {postId}],
        queryFn: ({signal}) => fetchPost({signal, postId})
    })
}

// export async function loader({request, params}) {
//     const id = params.bookId;
//
//     const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book/' + id);
//
//     if (!response.ok) {
//         // return json(
//         //     {message: "could not fetch books"},
//         //     {status: 500}
//         // );
//
//         throw new Response(
//             "could not fetch books",
//             {status: 500}
//         )
//     } else {
//         const resData = await response.json();
//         return resData;
//     }
// }