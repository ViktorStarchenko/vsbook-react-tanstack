import { Link, useLoaderData, useParams, useNavigate } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import {useState} from "react";

export default function BooksPage() {
    const books = useLoaderData();
    const { page } = useParams();
    const navigate = useNavigate();
    const currentPage = parseInt(page, 10) || 1;

    const [sortOrder, setSortOrder] = useState("desc");

    const handleFirstPage = () => navigate(`/books/page/1?sort=${sortOrder}`);
    const handleNextPage = () => navigate(`/books/page/${currentPage + 1}?sort=${sortOrder}`);
    const handlePrevPage = () => {
        if (currentPage > 1) navigate(`/books/page/${currentPage - 1}?sort=${sortOrder}`);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        navigate(`/books/page/${currentPage}?sort=${order}`);
    };

    return (
        <>
            <h1>BOOKSPAGE</h1>
            <div>
                <button onClick={() => handleSortChange("asc")} disabled={sortOrder === "asc"}>
                    Sort by Oldest
                </button>
                <button onClick={() => handleSortChange("desc")} disabled={sortOrder === "desc"}>
                    Sort by Newest
                </button>
            </div>
            <BooksListing books={books} />
            <div>
                {currentPage !== 1 && (<button onClick={handleFirstPage} disabled={currentPage === 1}>
                    First
                </button>)}
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {currentPage}
                <button onClick={handleNextPage}>Next</button>
            </div>
        </>

    )
}