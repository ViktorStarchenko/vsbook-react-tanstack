import {usePostImage} from "../../hooks/usePostImage";
import classes from "./BookSingle.module.css";
import LoadingIndicator from "../LoadingIndicator";
import logoImage from "../../assets/images/logo-3.svg";

export default function BookSingleImage({post}) {

    const {data: featuredImage, isLoading, isError, error} = usePostImage({ post });

    if (isError) {
        console.error("Error fetching post image:", error.message || error);
    }

    return (
        <>
            {isLoading && <LoadingIndicator />}
            <div className={classes['book-single-image']}>
                {featuredImage && <img src={featuredImage} alt={post.title.rendered}/>}
                {!featuredImage && <img className="imageContain" src={logoImage} alt={post.title.rendered}/>}
            </div>
        </>
    )
}