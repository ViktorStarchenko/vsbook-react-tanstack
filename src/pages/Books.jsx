import { Link, useLoaderData, useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import BooksListing from "../components/BookListing/BooksListing";
import {useEffect, useRef, useState} from "react";

import Filters from "../components/Filters/Filters";

import Test from "../components/Test";
import {useQuery} from "@tanstack/react-query";
import {fetchPosts, queryClient} from "../util/http";
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
    const location = useLocation();
    const currentFullURL = `${window.location.origin}${location.pathname}${location.search}`;
    const { page } = useParams();

    const currentPage = parseInt(page, 10) || 1;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("order") || "desc";
    const filtersArray = Array.from(searchParams.entries());
    console.log(filtersArray)

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['books', {page: currentPage, sortOrder: currentSortOrder, filtersArray: filtersArray }],
        queryFn: ({signal}) => fetchPosts({signal, page: currentPage, sortOrder: currentSortOrder, filtersArray: filtersArray}),
        keepPreviousData: true,
    })

    const handlePager = (newPage) => {
        navigate(`/books/page/${newPage}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    }

    // let content;
    //
    // if (isLoading) {
    //     content = <LoadingIndicator />
    // }
    // if (isError) {
    //     console.log("Error: ", error.message);
    //     content = <ErrorsBlockSingle error={error.message} />;
    // }
    // if (data && data.posts) {
    //     console.log(data)
    //     content = <div>
    //         {data.totalPosts && <BookListingCounts postsCount={data.totalPosts}/>}
    //         <BooksListing books={data.posts} />
    //     </div>
    // }



    let content;
    if (isLoading) content = <LoadingIndicator />;
    else if (isError) content = <ErrorsBlockSingle error={error.message} />;
    else if (data?.posts?.length === 0)
        content = <div className="h2">There are no books matching your request.</div>;
    else content = <BooksListing books={data.posts} />;

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
                <title>{`Books Page - Page ${currentPage}`}</title>
                <meta name="description" content="VSBookcollection - Books Listing Page"/>
                <link rel="canonical" href={currentFullURL}/>
            </Helmet>
            <h1 className="h1">BOOKSPAGE</h1>
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

export function loader({params, request}) {
    const url = new URL(request.url)
    const currentPage = params.page || 1
    const currentSortOrder = url.searchParams.get('sort') || 'desc';
    const filtersArray = Array.from(url.searchParams.entries());
    const signal = request.signal;
    return queryClient.fetchQuery({
        queryKey: ['books', {page: currentPage, sortOrder: currentSortOrder, filtersArray: filtersArray }],
        queryFn: ({signal}) => fetchPosts({signal, page: currentPage, sortOrder: currentSortOrder, filtersArray: filtersArray}),
    })
}