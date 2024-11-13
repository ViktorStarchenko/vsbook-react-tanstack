import classes from './Taxonomy.module.css';

export default function Taxonomy({name, term}) {

    return (
        <div className={classes.taxonomyWrap}>
            <div className={classes.taxonomyName}>{name} :</div>
            <div className={classes.taxonomyItems}>{term.map((item) => (
                <span key={item.id}>{item.name}</span>
            ))}</div>
        </div>
    )
}