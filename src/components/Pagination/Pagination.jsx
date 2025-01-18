export default function Pagination({page, totalPages, onPageChange}) {

    const handlePager = (order) => {
        onPageChange(order);
    }

    return (
        <>
            <div className="paginationWrapper">
                {page > 1 && <button className="btn paginationLink" onClick={() => handlePager(1)} disabled={page == 1}>1</button>}
                {page - 1 > 1 && <button className="btn paginationLink" onClick={() => handlePager(page - 1)} >Previous</button>}
                <span className="btn paginationLink active">{page}</span>
                {page + 1 < totalPages && <button className="btn paginationLink" onClick={() => handlePager(page + 1)}>Next</button>}
                {page < totalPages && <button className="btn paginationLink" onClick={() => handlePager(totalPages)}>{totalPages}</button>}
            </div>
        </>
    )
}