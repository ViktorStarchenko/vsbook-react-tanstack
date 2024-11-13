import { Link, useParams, useLoaderData } from 'react-router-dom';
import BookSingle from "../components/BookSingle";

export default function BookDetailPage() {
    const params = useParams();
    const book = useLoaderData();

    return (
        <>
            <p>Book id: {params.bookId}</p>
            <p>
                <Link to=".." relative="path">Go back</Link>
            </p>
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