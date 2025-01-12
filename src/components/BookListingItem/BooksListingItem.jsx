import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from 'react';

import classes from '../BooksListing.module.css';
import lupaImage from '../../assets/images/noun-magnifying-glass-50744.svg'
import logoImage from '../../assets/images/logo-3.svg'
import Modal from "../Modal/Modal";
import ModalBookDetail from "../Modal/ModalBookDetail";
import { usePostImage } from "../../hooks/usePostImage";
import BookListingItemImage from "./BookListingItemImage";
import BooksListingItemTitle from "./BooksListingItemTitle";
import BooksListingItemDescription from "./BooksListingItemDescription";
import TooltipModal from "../elements/TooltipModal";

export default function BooksListingItem({post}) {
    const [showDescription, setShowDescription] = useState(false)

    const dialog = useRef();
    const featuredImage = usePostImage({ post });

    function openModal() {
        // dialog.current.showModal();
        dialog.current.open();
    }

    function toggleDescription(value) {
        setShowDescription(value);
    }

    return (
        <>
            <div
                className={classes.listingItem}
            >

                {featuredImage && <BookListingItemImage featuredImage={featuredImage} title={post.title.rendered}/>}
                {!featuredImage && <div className={classes.listingItemImg}>
                    <img className="imageContain" src={logoImage} alt={post.title.rendered}/>
                </div>}

                {lupaImage && <span onClick={openModal} className={classes.showDetailsIcon}>
                    <img src={lupaImage} alt="showMore"/>
                </span>}

                <div
                    className={classes.listingItemContent}
                    onMouseEnter={() => toggleDescription(true)}
                    onMouseLeave={() => toggleDescription(false)}
                >
                    <BooksListingItemTitle title={post.title.rendered} postId={post.id}/>

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