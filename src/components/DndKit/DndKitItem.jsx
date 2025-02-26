import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function DndKitItem({item}) {

    const {attributes, listeners, setNodeRef, transform, transition} =useSortable({id: item.id})
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>{item.title}</div>
    )
}
