import { Link, useLoaderData, useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import BooksListing from "../components/BookListing/BooksListing";
import {useEffect, useRef, useState} from "react";

import Filters from "../components/Filters/Filters";

import Test from "../components/Test";
import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "../util/http";
import Sorting from "../components/Sorting/Sorting";
import Pagination from "../components/Pagination/Pagination";
import {useTaxonomies} from "../hooks/useTaxonomies";
import LoadingIndicator from "../components/LoadingIndicator";
import BookListingCounts from "../components/BookListing/BookListingCounts";
import {Helmet} from "react-helmet-async";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";

export default function BooksPage() {
    // const books = useLoaderData();
    const navigate = useNavigate();
    const { search } = useLocation();

    const { page } = useParams();

    const currentPage = parseInt(page, 10) || 1;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("order") || "desc";
    const filtersArray = Array.from(searchParams.entries());
    console.log(filtersArray)

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
    if (isError) {
        console.log("Error: ", error.message);
        content = <ErrorsBlockSingle error={error.message} />;
    }
    if (data && data.posts) {
        console.log(data)
        content = <div>
            {data.totalPosts && <BookListingCounts postsCount={data.totalPosts}/>}
            <BooksListing books={data.posts} />
        </div>
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
            <Helmet>
                <title>VSBookcollection - Books Listing Page</title>
                <meta name="description" content="VSBookcollection - Books Listing Page"/>
            </Helmet>
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
            {/*{isError && <ErrorsBlockSingle error={error.message}/>}*/}
            {content}
            {pagination}
        </>

    )
}