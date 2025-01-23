import classes from "./ErrorsBlock.module.css";

export default function ErrorsBlockSingle({error}) {
    return (
        <>
            <div className="wrapper-1020">
                <ul className={classes['errors-block-list']}>
                    <li className={classes['errors-block-item']} >{error}</li>
                </ul>
            </div>
        </>
    )
}