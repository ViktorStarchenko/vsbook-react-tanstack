import {useEffect, useRef, useState} from "react";
import axios from "axios";

import { usePostData } from "../../hooks/usePostData";
import classes from './BookSingle.module.css';
import Taxonomy from "../elements/Taxonomy";
import BookSingleDelete from "./BookSingleDelete";
import Modal from "../Modal/Modal";
import {useRouteLoaderData} from "react-router-dom";
import {usePostImage} from "../../hooks/usePostImage";
import LoadingIndicator from "../LoadingIndicator";

export default function BookSingle({post}) {
    const token = useRouteLoaderData('root');
    const {data: featuredImage, isLoading: isLoadingImage, isError: isErrorImage, error: errorImage} = usePostImage({ post });

    const { genre, language, wrirer, release, country, readingStatus } = usePostData(post);

    const deleteBookModalRef = useRef();

    function openDeleteModal(){
        deleteBookModalRef.current.open();
    }

    let imageBlock;

    if (isLoadingImage) {
        imageBlock = <LoadingIndicator />
    }

    if (featuredImage) {
        imageBlock = <img src={featuredImage} alt={post.title.rendered}/>
    }



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

                {token && (<>
                    <div className={classes['book-single-delete-wrapper']}>
                        <div className="btn" onClick={openDeleteModal}>Delete Book</div>
                    </div>

                    <Modal ref={deleteBookModalRef} title="Are You sure you want to delete this book?">
                        <BookSingleDelete />
                    </Modal>
                </>)}

            </div>
        </>
    )
}