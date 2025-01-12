import classes from './BookSingle.module.css';
import {useState} from "react";
import {useActionData, useSubmit} from "react-router-dom";

export default function BookSingleDelete() {
    const submit = useSubmit();
    const data = useActionData()

    function handleDeleteBook() {
        submit(null, {method: 'delete'})
    }

    return (
        <>
            <div className={classes['book-single-delete-wrapper']}>
                {/*<form action="" method="DELETE">*/}
                {/*    <input className="btn" type="submit" value="Delete Book"/>*/}
                {/*</form>*/}
                <div className="btn" onClick={handleDeleteBook}>Delete Book</div>
            </div>
        </>
    )
}