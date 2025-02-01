import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from 'react';

import classes from './BooksListing.module.css';
import logoImage from '../../assets/images/logo-3.svg'
import Modal from "../Modal/Modal";
import ModalBookDetail from "../Modal/ModalBookDetail";
import { usePostImage } from "../../hooks/usePostImage";
import BookListingItemImage from "./BookListingItemImage";
import BooksListingItemTitle from "./BooksListingItemTitle";
import BooksListingItemDescription from "./BooksListingItemDescription";
import TooltipModal from "../elements/TooltipModal";
import {useQuery} from "@tanstack/react-query";
import {fetchPostImage} from "../../util/http";
import LoadingIndicator from "../LoadingIndicator";
import {usePostTaxonomy} from "../../hooks/usePostTaxonomy";
import BookListingWriter from "./BookListingWriter";
import FavsButton from "../elements/FavsButton";
import Spacer from "../elements/Spacer";
import {useDispatch} from "react-redux";
import {cartSliceActions} from "../../store/cart-slice";
import LupaButton from "../elements/LupaButton";
import AddToCartButton from "../elements/AddToCartButton";
import PostViewsCount from "../elements/PostViewsCount";

export default function BooksListingItem({post}) {
    const [showDescription, setShowDescription] = useState(false)

    const dialog = useRef();
    // const featuredImage = usePostImage({ post });
    const {data, isLoading, isError, error} = usePostImage({ post });




    const {data: dataWrirer, isLoading: isLoadingWrirer, isError: isErrorWrirer, error: errorWrirer} = usePostTaxonomy({
        taxonomyName: 'wrirer',
        postId: post.id
    });

    function openModal() {
        // dialog.current.showModal();
        dialog.current.open();
    }

    function toggleDescription(value) {
        setShowDescription(value);
    }

    let featuredImage;
    let imageBlock;

    if (isLoading) {
        imageBlock = <LoadingIndicator />
    }

    if (data) {
        featuredImage = data
        imageBlock = <BookListingItemImage featuredImage={featuredImage} title={post.title.rendered}/>;
    } else {
        imageBlock = <div className={classes.listingItemImg}>
            <img className="imageContain" src={logoImage} alt={post.title.rendered}/>
        </div>
    }

    return (
        <>
            <div
                className={classes.listingItem}
            >
                <div className={classes.listingItemHeader}>
                    <PostViewsCount postId={post.id} />
                    <AddToCartButton post={post} />
                    <FavsButton post={post}/>
                    <LupaButton clickHandler={openModal}/>
                </div>

                {imageBlock}
                
                <div
                    className={classes.listingItemContent}
                    onMouseEnter={() => toggleDescription(true)}
                    onMouseLeave={() => toggleDescription(false)}
                >
                    <Spacer />
                    {post.title && <BooksListingItemTitle title={post.title.rendered} postId={post.id}/>}
                    {dataWrirer && dataWrirer.length > 0 && <BookListingWriter object={dataWrirer}/>}


                    {/*<TooltipModal>*/}
                    {/*    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>*/}
                    {/*</TooltipModal>*/}

                    {showDescription && post.content.rendered && <BooksListingItemDescription>
                        <div className={classes.bookSingleBody} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                    </BooksListingItemDescription>}

                    {/*<BooksListingItemDescription/>*/}

                </div>

            </div>
            <Modal ref={dialog} title="">
                <ModalBookDetail book={post}/>
            </Modal>

        </>

    )
}