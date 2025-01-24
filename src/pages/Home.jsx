import { Link, useLoaderData, useLocation } from "react-router-dom";
import BooksListing from "../components/BookListing/BooksListing";
import {useQuery} from "@tanstack/react-query";
// import {booksLoader} from "../booksFunctions";
import {fetchPosts, queryClient} from "../util/http";
import LoadingIndicator from "../components/LoadingIndicator";
import SlideShow from "../components/Slider/SlideShow";
import {usePageData} from "../hooks/usePageData";
import classes from "../components/ErrorsBlock/ErrorsBlock.module.css";
import {Helmet} from "react-helmet-async";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import PageContent from "../components/PageContent";
import Spacer from "../components/elements/Spacer";

function HomePage() {
    // const books = useLoaderData();
    const location = useLocation();
    const currentFullURL = `${window.location.origin}${location.pathname}${location.search}`;
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
        homeBanner = <SlideShow data={dataHome.acf.home_banner}/>
    }

    return (
        <>
            <Helmet>
                <title>VSBookcollection test website</title>
                <meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, veniam."/>
                <link rel="canonical" href={currentFullURL}/>
            </Helmet>
            <PageContent>
                <Spacer height="2rem"/>
                {homeBanner}
                <h1 className="h1">THIS IS HOME PAGE ASDASD ASD ASD D </h1>
                <p className="pb-1rem">Go see <Link to="/books">more books</Link>.</p>
                {content}
                <Spacer height="2rem"/>
            </PageContent>
        </>
    )
}

export default HomePage;

export function loader({params}) {
    console.log(params)
    return queryClient.fetchQuery({
        queryKey: ['books'],
        queryFn: ({signal}) => fetchPosts({signal})
    })
}