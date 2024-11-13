import { Link, useLoaderData } from "react-router-dom";
import BooksListing from "../components/BooksListing";

function HomePage() {
    const books = useLoaderData();
    // console.log(data)
    return (
        <main>
            <h1>THIS IS HOME PAGE</h1>
            <p>Go to <Link to="/books">Books page</Link>.</p>
            <BooksListing books={books} />
        </main>
    )
}

export default HomePage;