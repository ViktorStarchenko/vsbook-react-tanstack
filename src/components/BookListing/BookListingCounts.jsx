export default function BookListingCounts({postsCount}) {
    return (
        <>
            {postsCount && <div className="wrapper-1220">
                <div className="d-flex flex-justify-start mb-1rem">{postsCount} books found</div>
            </div>}
        </>
    )
}