import {useSearchParams} from "react-router-dom";

export default function Sorting() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortOrder = searchParams.get("order") || "desc";

    const handleSortChange = (order) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set("order", order);
            return params;
        });
        // onSorting(order);
    }

    return (
        <>
            <div className="sorting">
                <button className={`btn ${currentSortOrder === "asc" && 'active'}` } onClick={() => handleSortChange("asc")} disabled={currentSortOrder === "asc"}>
                    Sort by Oldest
                </button>
                <button className={`btn ${currentSortOrder === "desc" && 'active'}` } onClick={() => handleSortChange("desc")} disabled={currentSortOrder === "desc"}>
                    Sort by Newest
                </button>
            </div>
        </>
    )
}