import { Link, useParams, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BookSingle from "../components/BookSingle/BookSingle";
import {Helmet} from "react-helmet-async";
import {cleanAndTruncate, fetchPost, queryClient, truncateContentByWords} from "../util/http";
import {useQuery} from "@tanstack/react-query";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import Spacer from "../components/elements/Spacer";
import {useDispatch} from "react-redux";
import { useEffect } from 'react'
import { viewedPostsActions } from "../store/viewed-posts";

export default function BookDetailPage() {
    const params = useParams();
    // const book = useLoaderData();
    // const book = useRouteLoaderData('book-detail');
    // console.log(book.title.rendered)
    const dispatch = useDispatch();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['book', {slugOrId: params.slugOrId}],
        queryFn: ({signal}) => fetchPost({signal, slugOrId: params.slugOrId}),
    })

    console.log(error)
    let content;

    if (isLoading) {
        content = <LoadingIndicator />
    }

    if (isError) {
        content = <ErrorsBlockSingle error={error.message}/>
    }

    if (data) {
        content = <BookSingle post={data} />
    }

    let truncanedContent
    if(data.content) {
        truncanedContent = cleanAndTruncate(data.content.rendered, 50)
    }

    useEffect(() => {
        if (data) {
            dispatch(viewedPostsActions.addViewed(data));
        }
    }, [data, dispatch]);


    return (
        <>
            <Helmet>
                <title>{data.title.rendered} - VSBookcollection</title>
                {truncanedContent && <meta name="description" content={truncanedContent}/>}
            </Helmet>
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