import {useEffect, useState} from "react";
import axios from "axios";

import { usePostData } from "./hooks/usePostData";
import classes from './BookSingle.module.css';
import Taxonomy from "./elements/Taxonomy";

export default function BookSingle({post}) {

    const { featuredImage, genre, language, wrirer, release, country, readingStatus } = usePostData(post);

    return (
        <>
            <div className={classes.bookSingleWrapper}>
                <h1>{post.title.rendered}</h1>
                <div className={classes.bookSingleImage}>
                    {featuredImage && <img src={featuredImage} alt={post.title.rendered}/>}
                </div>
                <div className={classes.taxonomyList}>
                    {genre && <Taxonomy name="Genre" term={genre} />}
                    {language && <Taxonomy name="Language" term={language} />}
                    {wrirer && <Taxonomy name="Writer" term={wrirer} />}
                    {release && <Taxonomy name="Release" term={release} />}
                    {country && <Taxonomy name="Country" term={country} />}
                    {readingStatus && <Taxonomy name="Reading Status" term={readingStatus} />}
                </div>
                <div>
                    <div className={classes.bookSingleBody} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                </div>
            </div>
        </>
    )
}