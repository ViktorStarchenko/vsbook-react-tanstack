import classes from './NewDnd.module.css'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function NewDndItem({ item }) {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: item.id
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}  className={classes['dnd-menu-item']}>
            {item.title} -- {item.id}
        </div>
    );
}
