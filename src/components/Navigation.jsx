export default function Navigation({currentPage}) {

    return (
        <>
            <div>
                {currentPage !== 1 && (<button onClick={handleFirstPage} disabled={currentPage === 1}>
                    First
                </button>)}
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {currentPage}
                <button onClick={handleNextPage}>Next</button>
            </div>
        </>
    )
}