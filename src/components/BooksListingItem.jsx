import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from 'react';

import classes from './BooksListing.module.css';
import lupaImage from '../assets/images/free-icon-magnifier-tool-44514.png'
import logoImage from '../assets/images/logo-3.svg'
import Modal from "./Modal";
import ModalBookDetail from "./ModalBookDetail";
import { usePostImage } from "./hooks/usePostImage";

export default function BooksListingItem({post}) {

    const dialog = useRef();
    const featuredImage = usePostImage({ post });

    function openModal() {
        // dialog.current.showModal();
        dialog.current.open();
    }

    return (
        <>
            <div className={classes.listingItem}>
                <div className={classes.listingItemImg}>
                    {featuredImage && <img src={featuredImage} alt={post.title.rendered}/>}
                    {!featuredImage && <img className="imageContain" src={logoImage} alt={post.title.rendered}/>}
                </div>
                {lupaImage && <span onClick={openModal} className={classes.showDetailsIcon}>
                <img src={lupaImage} alt="showMore"/>
            </span>}

                <h2><Link to={`/books/${post.id}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Link></h2>
            </div>
            <Modal ref={dialog} title="">
                <ModalBookDetail book={post}/>
            </Modal>
        </>

    )
}