import { Link, useParams, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BookSingle from "../components/BookSingle/BookSingle";
import {Helmet} from "react-helmet-async";
import {cleanAndTruncate, truncateContentByWords} from "../util/http";

export default function BookDetailPage() {
    const params = useParams();
    // const book = useLoaderData();
    const book = useRouteLoaderData('book-detail');
    console.log(book.title.rendered)

    let truncanedContent
    if(book.content) {
        truncanedContent = cleanAndTruncate(book.content.rendered, 50)
    }

    return (
        <>
            <Helmet>
                <title>{book.title.rendered} - VSBookcollection</title>
                {truncanedContent && <meta name="description" content={truncanedContent}/>}
            </Helmet>
            <BookSingle post={book} />
        </>

    )
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