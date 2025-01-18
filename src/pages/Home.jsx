import { Link, useLoaderData } from "react-router-dom";
import BooksListing from "../components/BooksListing";
import {useQuery} from "@tanstack/react-query";
import {booksLoader} from "../booksFunctions";
import {fetchBooks} from "../util/http";

function HomePage() {
    // const books = useLoaderData();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['books'],
        queryFn: fetchBooks
    })

    let posts = [];
    if(data) {
        posts = data.posts;
    }

    return (
        <main>
            <h1>THIS IS HOME PAGE ASDASD ASD ASD D </h1>
            <p>Go to <Link to="/books">Books page</Link>.</p>
            {posts && <BooksListing books={posts} />}
        </main>
    )
}

export default HomePage;