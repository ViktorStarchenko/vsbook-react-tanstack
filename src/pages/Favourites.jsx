import BooksListing from "../components/BookListing/BooksListing";
import {useSelector} from "react-redux";
import Spacer from "../components/elements/Spacer";

export default function Favourites() {

    const favPosts = useSelector((state) => state.favPosts.favPosts);

    return (
        <>
            {favPosts && (
                <>
                    <Spacer />
                    <div className="wrapper-1220">
                        <h1 className="h1">Your favourites</h1>
                        <BooksListing books={favPosts}/>
                    </div>
                    <Spacer />
                </>
            )}

        </>
    )
}