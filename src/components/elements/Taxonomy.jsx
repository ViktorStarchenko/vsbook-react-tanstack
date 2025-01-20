import classes from './Taxonomy.module.css';

export default function Taxonomy({name, term}) {

    return (
        <div className={classes['taxonomy-wrap']}>
            <div className={classes['taxonomy-name']}>{name} :</div>
            <div className={classes['taxonomy-items']}>{term.map((item) => (
                <span key={item.id}>{item.name}</span>
            ))}</div>
        </div>
    )
}