import classes from './PageContent.module.css';

function PageContent({ title, children }) {
    return (
        <div className={classes.content}>
            {title && <h1 className="h1">{title}</h1>}
            {children}
        </div>
    );
}

export default PageContent;
