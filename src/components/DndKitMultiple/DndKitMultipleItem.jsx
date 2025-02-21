import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import React from "react";

export function Item(props) {
    const { id } = props;

    const style = {
    };

    return <div className="item" style={style}><p>{id}</p></div>;
}


export default function DndKitMultipleItem({item}) {

    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({
        id: item.id
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Item id={item.id} />
        </div>

    )
}