import { Link, useLoaderData, useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import BooksListing from "../components/BookListing/BooksListing";

import Filters from "../components/Filters/Filters";

import {useQuery} from "@tanstack/react-query";
import {fetchPosts, queryClient} from "../util/http";
import Sorting from "../components/Sorting/Sorting";
import Pagination from "../components/Pagination/Pagination";

import LoadingIndicator from "../components/LoadingIndicator";
import BookListingCounts from "../components/BookListing/BookListingCounts";
import {Helmet} from "react-helmet-async";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import PageContent from "../components/PageContent";
import Section from "../components/Section/Section";
import {useEffect, useState} from "react";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";
import {sendEmbedding} from "../util/embeddings";

export default function BooksPage() {
    // const books = useLoaderData();
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [loadMorePage, setLoadMorePage] = useState(1);
    const [isLoadMoreButtonEnabled, setIsLoadMoreButtonEnabled] = useState(true);
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState(null)
    const [totalPosts, setTotalPosts] = useState(null)

    const navigate = useNavigate();
    const location = useLocation();
    const currentFullURL = `${window.location.origin}${location.pathname}${location.search}`;
    const { page } = useParams();

    const currentPage = parseInt(page, 10) || 1;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("order") || "desc";
    const filtersArray = Array.from(searchParams.entries());

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['books', {page: currentPage, sortOrder: currentSortOrder, filtersArray: filtersArray }],
        queryFn: ({signal}) => fetchPosts({signal, page: currentPage, sortOrder: currentSortOrder, filtersArray: filtersArray}),
        keepPreviousData: true,
    })

    const handlePager = (newPage) => {
        navigate(`/books/page/${newPage}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    }

    useEffect(() => {
        if (data && !isLoadMore) {
            setPosts([...data.posts])
        }
        if (data && data.totalPages) {
            setTotalPages(prevState => prevState = data.totalPages);
        }
        if (data && data.totalPosts) {
            setTotalPosts(prevState => prevState = data.totalPosts);
        }
    }, [data, isLoadMore]);

    console.log("totalPages", totalPages)
    useEffect(() => {
        setLoadMorePage(prevState => prevState = currentPage || 1)
    }, [currentPage])

    useEffect(() => {
        console.log(posts);
        sendEmbedding(posts);
    }, [posts]);

    let content;
    if (isLoading) content = <LoadingIndicator />;
    else if (isError) content = <ErrorsBlockSingle error={error.message} />;
    else if (data?.posts?.length === 0)
        content = <div className="h2">There are no books matching your request.</div>;
    else content = (<BooksListing books={posts} />);

    if (data && data.posts.length == 0) {
        content = <div className="h2">There are no books matching your request.</div>
    }

    let postsCount
    if (posts && totalPosts) {
        postsCount = (
            <BookListingCounts postsCount={totalPosts}/>
        )
    }

    let pagination
    if (posts && totalPosts && totalPages && !isLoadMore) {
        pagination = (
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePager}/>
        )
    }

    let loadMoreButton
    if (posts && loadMorePage < totalPages) {
        loadMoreButton = <LoadMoreButton setIsLoadMore={setIsLoadMore} loadMorePage={loadMorePage} setLoadMorePage={setLoadMorePage} totalPages={totalPages}/>
    }

    const {
        data: loadMoreData,
        isLoading: loadMoreIsLoading,
        isError: loadMoreIsError,
        error: loadMoreError
    } = useQuery({
        queryKey: ['books', {page: loadMorePage, sortOrder: currentSortOrder, filtersArray: filtersArray }],
        queryFn: ({signal}) => fetchPosts({signal, page: loadMorePage, sortOrder: currentSortOrder, filtersArray: filtersArray}),
        keepPreviousData: true,
    });

    useEffect(() => {
        if (loadMoreData && isLoadMore) {
            setPosts(prevState => [...prevState, ...loadMoreData.posts])
        }
    }, [loadMoreData, isLoadMore]);

    return (
        <>
            <Helmet>
                <title>{`Books Page - Page ${currentPage}`}</title>
                <meta name="description" content="VSBookcollection - Books Listing Page"/>
                <link rel="canonical" href={currentFullURL}/>
            </Helmet>
            <PageContent>
                <Section sectionClass="pt-m pb-0">
                    <h1 className="h1">BOOKSPAGE</h1>
                    <Filters
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        setIsLoadMore={setIsLoadMore}
                    />
                </Section>
                <Section sectionClass="pt-s">
                    <Sorting />
                    {postsCount}
                    {content}
                    {pagination}
                    {loadMoreButton}
                </Section>
            </PageContent>
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