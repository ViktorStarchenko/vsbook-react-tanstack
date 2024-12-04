import { Link } from "react-router-dom";

import { useState, useEffect, useRef } from 'react';
import axios from "axios";

import classes from './BooksListing.module.css';
import lupaImage from '../assets/images/free-icon-magnifier-tool-44514.png'
import Modal from "./Modal";
import ModalBookDetail from "./ModalBookDetail";

export default function BooksListingItem({post}) {

    // console.log(post)
    // console.log(post?._links['wp:attachment'][0]?.href)

    const [featuredImage, setFeaturedImage] = useState('');
    const dialog = useRef();

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

    function openModal() {
        // dialog.current.showModal();
        dialog.current.open();
    }

    return (
        <>
            <div className={classes.listingItem}>
                {featuredImage && <img src={featuredImage} alt={post.title.rendered}/>}
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