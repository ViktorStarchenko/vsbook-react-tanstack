import classes from './BooksListing.module.css'

export default function BookListingWriter({object}) {

    return (
        <>
            <div className={classes.listingItemWriter}>
                {object && object.map((item) => (
                    <span key={item.id}>{item.name}</span>
                ))}
            </div>
        </>
    )
}