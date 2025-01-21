import { Link, useLoaderData } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import {useQuery} from "@tanstack/react-query";
import {booksLoader} from "../booksFunctions";
import {fetchPosts} from "../util/http";
import LoadingIndicator from "../components/LoadingIndicator";

function HomePage() {
    // const books = useLoaderData();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['books'],
        queryFn: ({signal}) => fetchPosts({signal})
    })

    let posts = [];

    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    console.log(data)

    if (data && data.posts.length > 0) {
        posts = data.posts;
        content = <BooksListing books={posts} />
    }

    return (
        <main>
            <h1>THIS IS HOME PAGE ASDASD ASD ASD D </h1>
            <p>Go to <Link to="/books">Books page</Link>.</p>
            {content}
        </main>
    )
}

export default HomePage;