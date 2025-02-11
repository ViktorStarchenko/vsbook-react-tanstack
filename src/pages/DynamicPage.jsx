import { useParams } from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {fetchPage, queryClient} from "../util/http";
import {usePageData} from "../hooks/usePageData";
import KeenSlider from "../components/KeenSlider/KeenSlider";
import {useSelector} from "react-redux";
import BooksListing from "../components/BookListing/BooksListing";
import KeenSliderSlide from "../components/KeenSlider/KeenSliderSlide";
import BooksListingItem from "../components/BookListing/BooksListingItem";

export default function DynamicPage() {

    const params = useParams();

    const { data, isLoading, isError, error } = usePageData(params.slug)

    const favPosts = useSelector((state) => state.favPosts.favPosts);

    let content

    if (favPosts) {
        console.log(favPosts)
        content = <KeenSlider
            title="Your favourite books"
            perView="4"
            spacing="40"
            loop={false}>
            {favPosts.map((item, index) => (
                <KeenSliderSlide key={index}>
                    <BooksListingItem post={item}/>
                </KeenSliderSlide>
            ))}
        </KeenSlider>
    }

    return <>
        <div className="h2">Dynamic page</div>
        <h1 className='h1'>{data.title.rendered}</h1>
        <div>{data.content.rendered}</div>
        <div className="wrapper-1220">{content}</div>
    </>
}

export function loader({params, request}) {
    const slug = params.slug;
    return queryClient.fetchQuery({
        queryKey: ['page', {slugOrId: slug}],
        queryFn: ({signal}) => fetchPage({signal, slugOrId: slug})
    })
}