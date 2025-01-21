import { Link, useLoaderData } from "react-router-dom";
import BooksListing from "../components/BookListing/BooksListing";
import {useQuery} from "@tanstack/react-query";
import {booksLoader} from "../booksFunctions";
import {fetchPosts} from "../util/http";
import LoadingIndicator from "../components/LoadingIndicator";
import SlideShow from "../components/Slider/SlideShow";
import {usePageData} from "../hooks/usePageData";

function HomePage() {
    const books = useLoaderData();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['books'],
        queryFn: ({signal}) => fetchPosts({signal})
    })

    const {data: dataHome, isLoading: isLoadingHome, isError: isErrorHome, error: errorHome} = usePageData(5);

    let posts = [];

    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (data && data.posts.length > 0) {
        posts = data.posts;
        content = (<BooksListing books={posts} />)
    }

    let homeBanner

    if (dataHome && dataHome.acf && dataHome.acf.home_banner) {
        console.log(dataHome.acf.home_banner)
        homeBanner = <SlideShow data={dataHome.acf.home_banner}/>
    }

    return (
        <main>
            {homeBanner}
            <h1>THIS IS HOME PAGE ASDASD ASD ASD D </h1>
            <Link to="https://dou.ua/forums/topic/47479/">Somwhere external</Link>
            <p>Go to <Link to="/books">Books page</Link>.</p>
            {content}
        </main>
    )
}

export default HomePage;