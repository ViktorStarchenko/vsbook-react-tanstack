import { Link, useLoaderData, useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import {useEffect, useRef, useState} from "react";

import Filters from "../components/Filters/Filters";

import Test from "../components/Test";
import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "../util/http";
import Sorting from "../components/Sorting/Sorting";
import Pagination from "../components/Pagination/Pagination";
import {usePostTaxonomies} from "../hooks/usePostTaxonomies";
import LoadingIndicator from "../components/LoadingIndicator";

export default function BooksPage() {
    // const books = useLoaderData();
    const navigate = useNavigate();
    const { search } = useLocation();

    const { page } = useParams();

    const currentPage = parseInt(page, 10) || 1;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("order") || "desc";
    const filtersArray = Array.from(searchParams.entries());

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['books', {page: currentPage, sortOrder: currentSortOrder, filters: searchParams, filtersArray: filtersArray }],
        queryFn: ({signal}) => fetchPosts({signal, page: currentPage, sortOrder: currentSortOrder, filters: searchParams, filtersArray: filtersArray}),
        // keepPreviousData: true,
    })

    const handlePager = (newPage) => {
        navigate(`/books/page/${newPage}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    }

    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (data && data.posts) {
        content = <BooksListing books={data.posts} />
    }

    if (data && data.posts.length == 0) {
        content = <div className="h2">There are no books matching your request.</div>
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
            <h1 className="h1">BOOKSPAGE BLABLABLA</h1>
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