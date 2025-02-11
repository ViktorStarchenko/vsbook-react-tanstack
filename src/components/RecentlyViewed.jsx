import {useDispatch, useSelector} from "react-redux";
import BooksListing from "./BookListing/BooksListing";
import KeenSlider from "./KeenSlider/KeenSlider";
import KeenSliderSlide from "./KeenSlider/KeenSliderSlide";
import BooksListingItem from "./BookListing/BooksListingItem";

export default function RecentlyViewed() {

    const recentlyViewed = useSelector(state => state.recentlyViewed.recentlyViewed);

    return (
        <>
            {recentlyViewed && recentlyViewed.length > 0 && (
                <section>
                    <div className="wrapper-1220">
                        <KeenSlider title="Recentrly viewed" spacing={40}>
                            {recentlyViewed.map((item, index) => (
                                <KeenSliderSlide key={index} classes="book-listing-slide">
                                    <BooksListingItem post={item}/>
                                </KeenSliderSlide>
                            ))}
                        </KeenSlider>
                        {/*<div className="h2">Recentrly viewed</div>*/}
                        {/*<BooksListing books={recentlyViewed}/>*/}
                    </div>
                </section>
            )}
        </>
    )
}