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
    console.log(dataHome)
    if (dataHome && dataHome.acf && dataHome.acf.home_banner) {
        console.log(dataHome.acf.home_banner)
        homeBanner = <SlideShow data={dataHome.acf.home_banner}/>
    }

    return (
        <main>
            {homeBanner}
            <h1 className="h1">THIS IS HOME PAGE ASDASD ASD ASD D </h1>
            <p className="pb-1rem">Go see <Link to="/books">more books</Link>.</p>
            {content}
        </main>
    )
}

export default HomePage;