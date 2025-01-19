import { Link, useLoaderData, useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import {useEffect, useRef, useState} from "react";

import Filters from "../components/Filter/Filters";

import Test from "../components/Test";
import {useQuery} from "@tanstack/react-query";
import {fetchBooks} from "../util/http";
import Sorting from "../components/Sorting/Sorting";
import Pagination from "../components/Pagination/Pagination";
import {useBooksTaxonomies} from "../hooks/useBooksTaxonomies";

export default function BooksPage() {
    // const books = useLoaderData();
    const navigate = useNavigate();
    const { search } = useLocation();

    const { page } = useParams();

    const currentPage = parseInt(page, 10);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("order") || "desc";
    const filtersArray = Array.from(searchParams.entries());

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['books', {page: currentPage, sortOrder: currentSortOrder, filters: searchParams, filtersArray: filtersArray }],
        queryFn: ({signal}) => fetchBooks({signal, page: currentPage, sortOrder: currentSortOrder, filters: searchParams, filtersArray: filtersArray}),
        // keepPreviousData: true,
    })

    const handlePager = (newPage) => {
        navigate(`/books/page/${newPage}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
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
            <Filters
                searchParams={searchParams}

                setSearchParams={setSearchParams}
            />
            {/*<Test />*/}
            <div className="wrapper-1220">
                <Sorting />
            </div>
            {content}
            {pagination}
        </>

    )
}