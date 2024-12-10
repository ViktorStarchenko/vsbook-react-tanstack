import { Link, useLoaderData, useParams, useNavigate, useLocation } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import { useState, useEffect } from "react";
import Select from "../components/elements/Select";
import {useBooksTaxonomies} from "../components/hooks/useBooksTaxonomies";
import Checkbox from "../components/elements/Checkbox";
import CheckboxFilter from "../components/elements/CheckboxFilter";

export default function BooksPage() {
    const books = useLoaderData();
    const { page } = useParams();
    const testParams = useParams();
    const navigate = useNavigate();
    const currentPage = parseInt(page, 10) || 1;
    const { hash, pathname, search } = useLocation();

    const [filterGenres, setFilterGenres] = useState([]);

    const [sortOrder, setSortOrder] = useState("desc");

    const {genre, country, language, release, wrirer, readingStatus, loading, error} = useBooksTaxonomies();

    const handleFirstPage = () => navigate(`/books/page/1?sort=${sortOrder}`);
    const handleNextPage = () => navigate(`/books/page/${currentPage + 1}?sort=${sortOrder}`);
    const handlePrevPage = () => {
        if (currentPage > 1) navigate(`/books/page/${currentPage - 1}?sort=${sortOrder}`);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        navigate(`/books/page/${currentPage}?sort=${order}`);
    };


    const handleFilterGenreChange = (genreId) => {
        setFilterGenres((prevGenres) => {
            if (prevGenres.includes(genreId)) {
                // If the categories are allready selected, remove it from the filter
                return prevGenres.filter((id) => id !== genreId);
            } else {
                // Otherwise, add the category to the filter
                return [...prevGenres, genreId];
            }
        });
    };

    useEffect(() => {
        const genreParam = filterGenres.length ? `genre=${filterGenres.join(',')}` : '';
        const params = new URLSearchParams(search);
        params.set('genre', genreParam);

        navigate(`${pathname}?${params.toString()}`);
    }, [filterGenres, navigate, pathname, search]);


    return (
        <>
            <h1>BOOKSPAGE</h1>
            <div>
                {genre && <CheckboxFilter name="Genre" id="genre" object={genre} filterState={filterGenres} handleFilterChange={handleFilterGenreChange}/>}

                {country && <Checkbox name="country" id="country" object={country}/>}
                {language && <Checkbox name="language" id="language" object={language}/>}
                {release && <Checkbox name="release" id="release" object={release}/>}
                {wrirer && <Checkbox name="wrirer" id="wrirer" object={wrirer}/>}
                {readingStatus && <Checkbox name="reading_status" id="reading_status" object={readingStatus}/>}
            </div>
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