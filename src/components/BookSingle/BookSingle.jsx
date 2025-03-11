import {useEffect, useRef, useState} from "react";
import classes from './BookSingle.module.css';
import BookSingleDelete from "./BookSingleDelete";
import Modal from "../Modal/Modal";
import {Link, useLocation, useRouteLoaderData} from "react-router-dom";

import BookSingleCategories from "./BookSingleCategories";
import BookSingleImage from "./BookSingleImage";
import BookSingleRelatives from "./BookSingleRelatives";
import Section from "../Section/Section";
import AddToCartButton from "../elements/AddToCartButton";
import FavsButton from "../elements/FavsButton";
import {useDispatch} from "react-redux";
import {viewsSliceActions} from "../../store/views-slice";
import PostViewsCount from "../elements/PostViewsCount";
import FavouritesSection from "../FavouritesSection";

export default function BookSingle({post}) {
    const dispatch = useDispatch();

    const token = useRouteLoaderData('root');

    const location = useLocation();
    const previousPage = location.state?.from || "/books/page/1";

    const deleteBookModalRef = useRef();

    function openDeleteModal(){
        deleteBookModalRef.current.open();
    }

    useEffect(() => {
        if (post) {
            dispatch(viewsSliceActions.updateItemViews(post.id));
        }
    }, [dispatch, post]);

    return (
        <>
            <Section contentWrapper="wrapper-1020" sectionClass="pt-m pb-m">
                <div className={`${classes['book-single-wrapper']}`}>
                    <div className={`${classes['book-single-row']}`}>
                        <div className={`${classes['book-single-column']}, ${classes['book-single-info']}`}>
                            <BookSingleImage post={post}/>
                            <BookSingleCategories post={post}/>
                        </div>
                        <div className={`${classes['book-single-column']} ${classes['book-single-description']}`}>
                            <div className={classes['book-single-description--header']}>
                                <div className={classes['book-single-description--icons']}>
                                    <PostViewsCount height="35px" postId={post.id}/>
                                    <AddToCartButton height="35px" post={post}/>
                                    <FavsButton height="30px" post={post}/>
                                </div>
                                <Link className="btn align-self-end mb-1rem" to={previousPage}>Go Back</Link>
                            </div>

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


                </div>
            </Section>

            <Section sectionClass="pt-0 pb-0">
                <BookSingleRelatives contentWrapper="" post={post}/>
            </Section>

            <Section sectionClass="pb-0">
                <FavouritesSection/>
            </Section>
        </>
    )
}