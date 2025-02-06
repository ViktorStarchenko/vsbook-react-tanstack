import classes from './ContentItems.module.css';

export default function ContentRow({width, flexSizing = "none", justifyContent, children}) {

    return (
        <div className={classes.contentRow} style={{width: width, flex: flexSizing, justifyContent: justifyContent}}>
            {children}
        </div>
    )
}