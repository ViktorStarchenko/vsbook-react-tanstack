import {useSelector} from "react-redux";
import KeenSliderSlide from "./KeenSlider/KeenSliderSlide";
import BooksListingItem from "./BookListing/BooksListingItem";
import KeenSlider from "./KeenSlider/KeenSlider";
// import Spacer from "./elements/Spacer";
// import SlickSlider from "./SlickSlider/SlickSlider";
// import SlickSliderSlide from "./SlickSlider/SlickSliderSlide";

export default function FavouritesSection() {

    const favPosts = useSelector((state) => state.favPosts.favPosts);

    return (
        <>
            {favPosts && (
                <>

                    <div className="wrapper-1220">
                        <h2 className="h1">Your favourites</h2>
                        <KeenSlider spacing={40}>
                            {favPosts.map((item, index) => (
                                <KeenSliderSlide key={index} classes="book-listing-slide">
                                    <BooksListingItem post={item}/>
                                </KeenSliderSlide>
                            ))}
                        </KeenSlider>
                        {/*<Spacer />*/}
                        {/*<Spacer />*/}
                        {/*<SlickSlider slidesToShow={3} slidesToScroll={1}>*/}
                        {/*    {favPosts.map((item, index) => (*/}
                        {/*        <SlickSliderSlide key={index}>*/}
                        {/*            <BooksListingItem post={item}/>*/}
                        {/*        </SlickSliderSlide>*/}
                        {/*    ))}*/}
                        {/*</SlickSlider>*/}
                    </div>

                </>
            )}

        </>
    )
}