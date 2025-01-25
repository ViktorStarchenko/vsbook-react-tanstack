import {useDispatch, useSelector} from "react-redux";
import BooksListing from "./BookListing/BooksListing";

export default function RecentlyViewed() {

    const recentlyViewed = useSelector(state => state.recentlyViewed.recentlyViewed);
    console.log(recentlyViewed);

    return (
        <>
            {recentlyViewed && recentlyViewed.length > 0 && (
                <section>
                    <div className="wrapper-1220">
                        <div className="h2">Recentrly viewed</div>
                        <BooksListing books={recentlyViewed}/>
                    </div>
                </section>
            )}
        </>
    )
}