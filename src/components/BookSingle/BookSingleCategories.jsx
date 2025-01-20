import classes from "./BookSingle.module.css";
import Taxonomy from "../elements/Taxonomy";
import LoadingIndicator from "../LoadingIndicator";

import {usePostTaxonomies} from "../../hooks/usePostTaxonomies";

export default function BookSingleCategories({post}) {

    const {data, isLoading, isError, error} = usePostTaxonomies(post);

    return (
        <>
            <div className={classes['taxonomy-list']}>
                {isLoading && <LoadingIndicator />}
                {data && data.genre && <Taxonomy name="Genre" term={data.genre} />}
                {data && data.language && <Taxonomy name="Language" term={data.language} />}
                {data && data.wrirer && <Taxonomy name="Writer" term={data.wrirer} />}
                {data && data.release && <Taxonomy name="Release" term={data.release} />}
                {data && data.country && <Taxonomy name="Country" term={data.country} />}
                {data && data.reading_status && <Taxonomy name="Reading Status" term={data.reading_status} />}
            </div>
        </>
    )
}