import {usePostImage} from "../../hooks/usePostImage";
import classes from "./BookSingle.module.css";
import LoadingIndicator from "../LoadingIndicator";
import logoImage from "../../assets/images/logo-3.svg";

export default function BookSingleImage({post}) {

    const {data: featuredImage, isLoading: isLoadingImage, isError: isErrorImage, error: errorImage} = usePostImage({ post });

    return (
        <>
            {isLoadingImage && <LoadingIndicator />}
            <div className={classes['book-single-image']}>
                {featuredImage && <img src={featuredImage} alt={post.title.rendered}/>}
                {!featuredImage && <img className="imageContain" src={logoImage} alt={post.title.rendered}/>}
            </div>
        </>
    )
}