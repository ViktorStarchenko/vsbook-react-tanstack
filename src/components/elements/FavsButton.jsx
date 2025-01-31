import {useDispatch, useSelector} from "react-redux";
import { favPostsActions } from "../../store/favourite-slice";
import classes from './FavsButton.module.css'

export default function FavsButton({post, height}) {
    const dispatch = useDispatch()
    const favsList = useSelector( state => state.favPosts.favPosts);
    const isInFavs = favsList.some(item => item.id === post.id);

    function addFav() {
        // let updatedFavs = favsList.slice();
        //
        // updatedFavs = isInFavs ? updatedFavs.filter((item) => item.id != post.id) : [...updatedFavs, post];
        // dispatch(favPostsActions.startLoading());
        // dispatch(favPostsActions.replaceFavs(updatedFavs));
        // setTimeout(() => {
        //     dispatch(favPostsActions.stopLoading());
        // }, 600);

        dispatch(favPostsActions.startLoading());
        dispatch(favPostsActions.toggleFavs(post));
        setTimeout(() => {
            dispatch(favPostsActions.stopLoading());
        }, 600);
    }

    return (
        <>
            <div className={`${classes.favButton} ${isInFavs ? classes.active : ''}`} onClick={() => addFav()}>
                <svg style={{height: height}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" x="0px" y="0px"><title></title><desc></desc><metadata><x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 6.0-c002 79.164352, 2020/01/30-15:50:38        "/></metadata><path d="M45.856,6.138C36.2,6.138,32,14.941,32,14.941a17.411,17.411,0,0,0-3.292-4.4,14.86,14.86,0,0,0-10.564-4.4c-9.66,0-17.656,7.875-15.9,19.66S15.792,47.3,32,57.862c8.1-5.274,15.1-10.348,20.3-15.568,5.192-5.238,8.575-10.6,9.461-16.5C63.512,14.013,55.516,6.138,45.856,6.138Z"/></svg>
            </div>
        </>
    )
}