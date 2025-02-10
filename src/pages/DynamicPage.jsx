import { useParams } from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import {fetchPage, queryClient} from "../util/http";
import {usePageData} from "../hooks/usePageData";

export default function DynamicPage() {

    const params = useParams();

    console.log(params.slug)

    const { data, isLoading, isError, error } = usePageData(params.slug)

    return <>
        <div className="h2">Dynamic page</div>
        <h1 className='h1'>{data.title.rendered}</h1>
        <div>{data.content.rendered}</div>
    </>
}

export function loader({params, request}) {
    const slug = params.slug;
    return queryClient.fetchQuery({
        queryKey: ['page', {slugOrId: slug}],
        queryFn: ({signal}) => fetchPage({signal, slugOrId: slug})
    })
}