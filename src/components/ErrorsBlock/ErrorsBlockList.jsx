import classes from './ErrorsBlock.module.css'

export default function ErrorBlock({errors}) {
    return (
        <>
            <div className="wrapper-1020">
                <ul className={classes['errors-block-list']}>
                    {Object.entries(errors).map(([key, error]) => (
                        <li className={classes['errors-block-item']} key={key}>{error}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}