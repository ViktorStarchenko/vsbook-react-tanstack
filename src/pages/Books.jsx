import { Link, useLoaderData, useParams, useNavigate, useLocation } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import {useEffect, useRef, useState} from "react";

import Filters from "../components/Filters";

import Test from "../components/Test";
import {useQuery} from "@tanstack/react-query";
import {fetchBooks} from "../util/http";
import Sorting from "../components/Sorting/Sorting";
import Pagination from "../components/Pagination/Pagination";

export default function BooksPage() {
    // const books = useLoaderData();
    // const { page } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();

    const [sortOrder, setSortOrder] = useState("desc");

    const [page, setPage] = useState(1);
    const currentPage = parseInt(page, 10) || 1;

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['books', {page: page, order: sortOrder}],
        queryFn: (signal) => fetchBooks({signal, page, sortOrder})
    })

    // const handleFirstPage = () => navigate(`/books/page/1${search ? search : ""}`);
    // const handleNextPage = () => navigate(`/books/page/${currentPage + 1}${search ? search : ""}`);
    // const handlePrevPage = () => {
    //     if (currentPage > 1) navigate(`/books/page/${currentPage - 1}${search ? search : ""}`);
    // };



    const handleSorting = (data) => {
        setSortOrder(data);
    }

    const handlePager = (page) => {
        setPage(page)
    }

    let content;

    if (data && data.posts) {
        content = <BooksListing books={data.posts} />
    }

    let pagination

    if (data && data.totalPosts && data.totalPages) {
        pagination = (
            <Pagination page={currentPage} totalPages={data.totalPages} onPageChange={handlePager}/>
        )
    }

    return (
        <>

            {isError && (
                <h1>{error}</h1>
            )}
            {isPending & <h1>PENDIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING</h1>}
            <h1>BOOKSPAGE BLABLABLA</h1>

            <Filters />

            {/*<Test />*/}

            <div className="wrapper-1220">
                <Sorting sortOrder={sortOrder} onSorting={handleSorting}/>
            </div>

            {content}

            {pagination}
        </>

    )
}