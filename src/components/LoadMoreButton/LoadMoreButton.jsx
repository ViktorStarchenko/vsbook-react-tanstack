export default function LoadMoreButton({setIsLoadMore, loadMorePage, setLoadMorePage, totalPages}) {

    function LoadMoreHandle() {
        console.log("before update", loadMorePage)
        if (loadMorePage >= totalPages) {
            return
        }
        setIsLoadMore(true);
        setLoadMorePage(prev => prev += 1);
    }
    console.log("loadMorePage >= totalPages", loadMorePage >= totalPages)
    return (
        <div className="paginationWrapper">
            <button className={`btn ${loadMorePage >= totalPages ? 'disabled' : ''}`} onClick={LoadMoreHandle}>Load More</button>
        </div>
    )
}