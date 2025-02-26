import LoadingIndicator from "../LoadingIndicator";
import {useMutation} from "@tanstack/react-query";
import {createTaxonomyTerm, queryClient} from "../../util/http";
import {useRef} from "react";
import classes from "../ErrorsBlock/ErrorsBlock.module.css";
import Tooltip from "../Tooltip/Tooltip";

export default function CreateTaxonomy({taxonomy}) {

    const createTermRef = useRef();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createTaxonomyTerm,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['taxonomy']})
        }
    })

    function handleCreateGenre(taxonomy) {
        const name = createTermRef.current.value;
        mutate({taxonomy: taxonomy, name: name})
    }

    const toolTipBody = <p>Didn't find the {taxonomy} you need? Then create a new one. Specify the name of {taxonomy} and submit</p>

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
                <Tooltip body={toolTipBody}/>
            </div>
        </>
    )
}