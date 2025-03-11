import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {fetchPosts} from "../../util/http";

import classes from './SimilarPosts.module.css';
import {Link} from "react-router-dom";
import KeenSlider from "../KeenSlider/KeenSlider";
import KeenSliderSlide from "../KeenSlider/KeenSliderSlide";

export default function SimilarPosts({embeddings, post}) {
    const [posts, setPosts] = useState([]);
    const [idsArray, setIdsArray] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (embeddings && embeddings.length > 0) {
            const test = embeddings.filter(item => item.id !== post.id.toString());
            const newIds = embeddings.filter(item => item.id !== post.id.toString()).map(item => item.id);
            setIdsArray(newIds);
        }
    }, [embeddings]);

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['similarPosts', {idsArray: idsArray}],
        queryFn: ({signal}) => fetchPosts({signal, idsArray: idsArray}),
        enabled: !!idsArray
    })

    useEffect(() => {
        if (data?.posts) {

            setPosts(prevState => [...prevState, ...data?.posts]); // Перезаписуємо, а не додаємо
            // setPosts([...data.posts]); // Перезаписуємо, а не додаємо
        }
    }, [data]);

    let content;

    // if (posts.length > 0) {
    //     content = <div className={`${classes.SimilarPosts} ${isOpen ? classes.open : ''}`}>
    //         <div className={classes.toggler} onClick={() => setIsOpen(prevState => !prevState)}>
    //             <span>{isOpen ? '»' : '«'}</span>
    //             <div>You might like</div>
    //         </div>
    //         <ul>{posts.map((item, index) => (
    //             <li key={item.id}>
    //
    //                 <Link to={`/books/${item.slug}`}>{item.title.rendered}</Link>
    //             </li>
    //         ))}</ul>
    //     </div>
    // }

    if (posts.length > 0) {
        content = <div className={`${classes.SimilarPosts} ${isOpen ? classes.open : ''}`}>
            <div className={classes.toggler} onClick={() => setIsOpen(prevState => !prevState)}>
                <span>{isOpen ? '»' : '«'}</span>
                <div>You might like</div>
            </div>
            <p className={classes.note}>recomended with embeddings</p>
            <KeenSlider vertical={true} spacing="0" perView="3" perView1024="3" perView767="3" perView600="3" origin="center">
                {posts.map(item => (
                    <KeenSliderSlide key={item.id}>
                        <div className={classes.SimilarPostsItem}>
                            <Link to={`/books/${item.slug}`} dangerouslySetInnerHTML={{ __html: item.title.rendered }}></Link>
                        </div>
                    </KeenSliderSlide>
                ))}
            </KeenSlider>
        </div>
    }

    return (
        <>
            {content}
        </>
    )
}