export default function BookListingCounts({postsCount}) {
    return (
        <>
            {postsCount && <div>
                <div className="d-flex flex-justify-start mb-1rem">{postsCount} books found</div>
            </div>}
        </>
    )
}