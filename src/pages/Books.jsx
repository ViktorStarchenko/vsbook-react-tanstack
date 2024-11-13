import { Link, useLoaderData, useParams, useNavigate } from "react-router-dom";
import BooksListing from "../components/BooksListing";

export default function BooksPage() {
    const books = useLoaderData();
    const { page } = useParams();
    const navigate = useNavigate();
    const currentPage = parseInt(page, 10) || 1;

    const handleNextPage = () => navigate(`/books/page/${currentPage + 1}`);
    const handlePrevPage = () => {
        if (currentPage > 1) navigate(`/books/page/${currentPage - 1}`);
    };

    return (
        <>
            <h1>BOOKSPAGE</h1>
            <BooksListing books={books} />
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </>

    )
}

// export async function loader() {
//     const response = await fetch('https://a.vsbookcollection.space/wp-json/wp/v2/book');
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

// export function loader() {
//     axios.get('https://a.vsbookcollection.space/wp-json/wp/v2/book').then((res) => {
//         console.log(res.data)
//     })
//
// }