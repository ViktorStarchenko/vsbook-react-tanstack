import {useEffect, useState} from "react";
import axios from "axios";

import classes from './BookSingle.module.css';
import Taxonomy from "./elements/Taxonomy";

export default function BookSingle({post}) {

    const [featuredImage, setFeaturedImage] = useState('');
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [wrirer, setWrirer] = useState('');
    const [release, setRelease] = useState('');
    const [country, setCountry] = useState('');
    const [readingStatus, setReadingStatus] = useState('');

    // const featuredImage =  post._links['wp:attachment'][0].href;
    // console.log(post)
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
    const getGenre = async () => {
        try {
            const response = await axios.get(post?._links['wp:term'][0]?.href);

            if (response.data) {
                setGenre(response.data);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }

    const getLanguage = async () => {
        try {
            const response = await axios.get(post?._links['wp:term'][1]?.href);

            if (response.data) {
                setLanguage(response.data);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }

    const getWrirer = async () => {
        try {
            const response = await axios.get(post?._links['wp:term'][2]?.href);

            if (response.data) {
                setWrirer(response.data);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }

    const getRelease = async () => {
        try {
            const response = await axios.get(post?._links['wp:term'][3]?.href);

            if (response.data) {
                setRelease(response.data);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }

    const getCountry = async () => {
        try {
            const response = await axios.get(post?._links['wp:term'][4]?.href);

            if (response.data) {
                setCountry(response.data);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }

    const getReadingStatus = async () => {
        try {
            const response = await axios.get(post?._links['wp:term'][5]?.href);

            if (response.data) {
                setReadingStatus(response.data);
            }
        } catch(error) {
            console.log("Error - ", error);
        }
    }


    useEffect(() => {
        getImage();
        getGenre();
        getLanguage();
        getWrirer();
        getRelease();
        getCountry();
        getReadingStatus();
    }, [post])

    console.log(genre)


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