import classes from './BookSingle.module.css';
import {useState} from "react";

export default function BookSingleDelete() {
    useState();

    return (
        <>
            <div className={classes['book-single-delete-wrapper']}>
                <form action="" method="DELETE">
                    <input className="btn" type="submit" value="Delete Book"/>
                </form>
            </div>
        </>
    )
}