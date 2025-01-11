import classes from "../BooksListing.module.css";
import logoImage from "../../assets/images/logo-3.svg";

export default function BookListingItemImage({featuredImage, title}) {
    return (
        <>
            <div className={classes.listingItemImg}>
                {featuredImage && <img src={featuredImage} alt={title} title={title}/>}
                {!featuredImage && <img className="imageContain" src={logoImage} alt={post.title.rendered}/>}
            </div>
        </>
    )
}