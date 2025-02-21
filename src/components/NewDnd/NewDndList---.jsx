import classes from './NewDnd.module.css'

export default function NewDndList({items}) {
    return (
        <div className={classes['dnd-menu-list']}>
            {items.map((item) => (
                <div key={item.id} className={classes['dnd-menu-item']}>{item.title}
                    {Array.isArray(item.children) && item.children.length > 0 && (
                        <NewDndList items={item.children} />
                    )}
                </div>
            ))}
        </div>
    )
}