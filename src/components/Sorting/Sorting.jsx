export default function Sorting({sortOrder, onSorting}) {
    const handleSortChange = (order) => {
        onSorting(order);
    }

    return (
        <>
            <div className="sorting">
                <button className={`btn ${sortOrder === "asc" && 'active'}` } onClick={() => handleSortChange("asc")} disabled={sortOrder === "asc"}>
                    Sort by Oldest
                </button>
                <button className={`btn ${sortOrder === "desc" && 'active'}` } onClick={() => handleSortChange("desc")} disabled={sortOrder === "desc"}>
                    Sort by Newest
                </button>
            </div>
        </>
    )
}