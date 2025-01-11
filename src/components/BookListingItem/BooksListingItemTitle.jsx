import {Link} from "react-router-dom";
import classes from "../BooksListing.module.css";

export default function BooksListingItemTitle({title, postId}) {
    return (
        <>
            <h2><Link className={classes.listingItemTitle} to={`/books/${postId}`} dangerouslySetInnerHTML={{ __html: title }}></Link></h2>
        </>
    )
}