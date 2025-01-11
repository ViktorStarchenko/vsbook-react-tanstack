import { Link, useLoaderData, useParams, useNavigate, useLocation } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import { useState } from "react";

import Filters from "../components/Filters";
import AccordionItem from "../components/Accordion/AccordionItem";
import AccordionTitle from "../components/Accordion/AccordionTitle";
import AccordionContent from "../components/Accordion/AccordionContent";
import Accordion from "../components/Accordion/Accordion";

export default function BooksPage() {
    const books = useLoaderData();
    const { page } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();
    const currentPage = parseInt(page, 10) || 1;
    console.log(search)
    const [sortOrder, setSortOrder] = useState("desc");

    const handleFirstPage = () => navigate(`/books/page/1${search ? search : ""}`);
    const handleNextPage = () => navigate(`/books/page/${currentPage + 1}${search ? search : ""}`);
    const handlePrevPage = () => {
        if (currentPage > 1) navigate(`/books/page/${currentPage - 1}${search ? search : ""}`);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        const params = new URLSearchParams(search);
        params.set("sort", order); // Update or add a sort parameter
        navigate(`/books/page/${currentPage}?${params.toString()}`);
    };

    return (
        <>
            <h1>BOOKSPAGE</h1>
            <Filters />

            <div className="wrapper-1220">
                <h2>Accordion Text</h2>
                <Accordion>
                    <Accordion.Item id="test">
                        <Accordion.Title>Lorem ipsum dolor.</Accordion.Title>
                        <Accordion.Content >
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab et in odit perferendis vel?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab et in odit perferendis vel?</p>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item id="test-2">
                        <Accordion.Title>Lorem ipsum dolor. Lorem ipsum dolor.</Accordion.Title>
                        <Accordion.Content >
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque distinctio et officiis saepe. Adipisci animi asperiores atque distinctio, dolorum neque.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis harum ipsam nobis praesentium quibusdam ratione saepe sunt vero? Ad aliquid aspernatur aut culpa cum delectus doloremque excepturi fugit illum incidunt laudantium magnam, odio, officia qui quidem repudiandae sapiente tempora ullam.</p>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="wrapper-1220">
                <div className="sorting">
                    <button className={`btn ${sortOrder === "asc" && 'active'}` } onClick={() => handleSortChange("asc")} disabled={sortOrder === "asc"}>
                        Sort by Oldest
                    </button>
                    <button className={`btn ${sortOrder === "desc" && 'active'}` } onClick={() => handleSortChange("desc")} disabled={sortOrder === "desc"}>
                        Sort by Newest
                    </button>
                </div>
            </div>

            <BooksListing books={books} />

            <div className="paginationWrapper">
                {currentPage !== 1 && (<button className="btn paginationLink" onClick={handleFirstPage} disabled={currentPage === 1}>
                    First
                </button>)}
                {currentPage > 1 && <button className="btn paginationLink" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>}
                <span className="btn paginationLink active">{currentPage}</span>
                {books.length >= 10 && <button className="btn paginationLink" onClick={handleNextPage}>Next</button>}
            </div>
        </>

    )
}