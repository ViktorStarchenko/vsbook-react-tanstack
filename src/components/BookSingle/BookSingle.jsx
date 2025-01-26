import {useEffect, useRef, useState} from "react";
import { usePostData } from "../../hooks/usePostData";
import classes from './BookSingle.module.css';
import BookSingleDelete from "./BookSingleDelete";
import Modal from "../Modal/Modal";
import {Link, useLocation, useRouteLoaderData} from "react-router-dom";

import LoadingIndicator from "../LoadingIndicator";
import BookSingleCategories from "./BookSingleCategories";
import BookSingleImage from "./BookSingleImage";
import BooksListing from "../BookListing/BooksListing";
import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";
import {useQuery} from "@tanstack/react-query";
import {fetchRelativePosts} from "../../util/http";
import BookSingleRelatives from "./BookSingleRelatives";
import Spacer from "../elements/Spacer";
import Section from "../Section";

export default function BookSingle({post}) {

    const token = useRouteLoaderData('root');

    const location = useLocation();
    const previousPage = location.state?.from || "/books/page/1";

    const deleteBookModalRef = useRef();

    function openDeleteModal(){
        deleteBookModalRef.current.open();
    }

    return (
        <>
            <div className={`${classes['book-single-wrapper']} wrapper-1020`}>
                <div className={`${classes['book-single-row']}`}>
                    <div className={`${classes['book-single-column']}, ${classes['book-single-info']}`}>
                        <BookSingleImage post={post}/>
                        <BookSingleCategories post={post}/>
                    </div>
                    <div className={`${classes['book-single-column']} ${classes['book-single-description']}`}>
                        <Link className="btn align-self-end mb-1rem" to={previousPage}>Go Back</Link>
                        <h1 className="h2 text-left" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
                        <div className={classes['book-single-body']} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                    </div>
                </div>

                {token && (<>
                    <div className={classes['book-single-delete-wrapper']}>
                        <div className="btn" onClick={openDeleteModal}>Delete Book</div>
                    </div>

                    <Modal ref={deleteBookModalRef} title="Are You sure you want to delete this book?">
                        <BookSingleDelete />
                    </Modal>
                </>)}

                <Section >
                    <BookSingleRelatives contentWrapper="" post={post}/>
                </Section>
            </div>
        </>
    )
}