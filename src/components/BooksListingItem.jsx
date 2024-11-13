import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';
import axios from "axios";

import classes from './BooksListing.module.css';

export default function BooksListingItem({post}) {

    // console.log(post)
    // console.log(post?._links['wp:attachment'][0]?.href)

    const [featuredImage, setFeaturedImage] = useState('');

    // const featuredImage =  post._links['wp:attachment'][0].href;

    const getImage = async () => {
        try {
            const response = await axios.get(post?._links['wp:featuredmedia'][0]?.href);

            if (response.data && response.data.source_url) {
                setFeaturedImage(response.data.source_url);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }

    useEffect(() => {
        getImage()
    }, [post])

    // console.log(post.id)

    return (
        <div className={classes.listingItem}>
            {featuredImage && <img src={featuredImage} alt={post.title.rendered}/>}
            <h2><Link to={`/books/${post.id}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Link></h2>
        </div>
    )
}