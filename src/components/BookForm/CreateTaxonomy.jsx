import LoadingIndicator from "../LoadingIndicator";
import {useMutation} from "@tanstack/react-query";
import {createTaxonomyTerm, queryClient} from "../../util/http";
import {useRef} from "react";
import classes from "../ErrorsBlock/ErrorsBlock.module.css";

export default function CreateTaxonomy({taxonomy}) {

    const createTermRef = useRef();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createTaxonomyTerm,
        onSuccess: () => {
            console.log('SUCCESSS')
            queryClient.invalidateQueries({queryKey: ['taxonomy']})
        }
    })

    function handleCreateGenre(taxonomy) {
        const name = createTermRef.current.value;
        mutate({taxonomy: taxonomy, name: name})
    }

    return (
        <>
            <div className="formCreateTerm">
                <input name="createGenre" type="text" placeholder={`Create new ${taxonomy}`} ref={createTermRef}/>
                {isPending && <LoadingIndicator />}
                {!isPending && <div className="btn" onClick={() => handleCreateGenre(taxonomy)}>Add {taxonomy}</div>}
                {isError && (
                    <ul className={classes['errors-block-list']}>
                        <li className={classes['errors-block-item']}>{error.message}</li>
                    </ul>
                )}
            </div>
        </>
    )
}