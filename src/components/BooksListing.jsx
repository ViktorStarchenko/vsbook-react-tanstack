import { useLoaderData } from 'react-router-dom';

import BooksListingItem from "./BooksListingItem";
import classes from './BooksListing.module.css';

export default function BooksListing({books}) {
    return (
        <>
            <div className={classes.listingGrid}>
                {books.map((book) => (
                    <BooksListingItem key={book.id} post={book}/>
                ))}
            </div>
        </>
    )
}