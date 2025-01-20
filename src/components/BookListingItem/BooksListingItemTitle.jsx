import {Link, useParams, useSearchParams} from "react-router-dom";
import classes from "../BooksListing.module.css";

export default function BooksListingItemTitle({title, postId}) {
    const { page } = useParams();

    const currentPage = parseInt(page, 10) || 1;
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
            <h2><Link className={classes.listingItemTitle} to={`/books/${postId}`} state={{ from: `/books/page/${currentPage}${searchParams.toString() ? `?${searchParams.toString()}` : ""}` }} dangerouslySetInnerHTML={{ __html: title }}></Link></h2>
        </>
    )
}