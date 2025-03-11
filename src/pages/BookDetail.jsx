import { Link, useParams, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BookSingle from "../components/BookSingle/BookSingle";
import {Helmet} from "react-helmet-async";
import {cleanAndTruncate, fetchPost, queryClient, truncateContentByWords} from "../util/http";
import {useQuery} from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import Spacer from "../components/elements/Spacer";
import {useDispatch} from "react-redux";
import { useEffect, useState } from 'react'
import { viewedPostsActions } from "../store/viewed-posts";
import {getSimilarEmbeddings} from "../util/embeddings";
import SimilarPosts from "../components/SimilarPosts/SimilarPosts";

export default function BookDetailPage() {
    const [post, setPost] = useState();
    const [similarEmbeddings, setSimilarEmbeddings] = useState([]);
    const params = useParams();
    // const book = useLoaderData();
    // const book = useRouteLoaderData('book-detail');
    // console.log(book.title.rendered)
    const dispatch = useDispatch();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['book', {slugOrId: params.slugOrId}],
        queryFn: ({signal}) => fetchPost({signal, slugOrId: params.slugOrId}),
    })

    useEffect(() => {
        setPost(data)
    }, [data]);

    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (isError) {
        content = <ErrorsBlockSingle error={error.message}/>
    }

    if (post) {
        content = <BookSingle post={post} />
    }

    let truncanedContent
    if(post && post.content) {
        truncanedContent = cleanAndTruncate(post.content.rendered, 50)
    }

    useEffect(() => {
        if (post) {
            dispatch(viewedPostsActions.addViewed(post));
        }

        const fetchEmbeddings = async () => {
            try {
                const result = await getSimilarEmbeddings(post);
                if (result && result.matches) {
                    setSimilarEmbeddings([...result.matches]);
                }
            } catch (error) {
                console.error("Error fetching embeddings:", error);
            }
        };

        fetchEmbeddings();

    }, [post, dispatch]);

    let similatPosts

    if (similarEmbeddings) {
        similatPosts = <SimilarPosts embeddings={similarEmbeddings} post={post}/>
    }

    return (
        <>
            <Helmet>
                <title>{data.title.rendered} - VSBookcollection</title>
                {truncanedContent && <meta name="description" content={truncanedContent}/>}
            </Helmet>
            {similatPosts}
            {content}
        </>

    )
}

export function loader({params, request}) {
    const slugOrId = params.slugOrId;
    return queryClient.fetchQuery({
        queryKey: ['book', {slugOrId}],
        queryFn: ({signal}) => fetchPost({signal, slugOrId})
    })
}