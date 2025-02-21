import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import DndKitExampleItem from "./DndKitExampleItem";

const containerStyle = {
    background: "#dadada",
    padding: 10,
    margin: 10,
    flex: 1
};

export default function DndKitExampleContainer(props) {
    const { id, items } = props;

    const { setNodeRef } = useDroppable({
        id
    });
    // console.log(items)

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} style={containerStyle}>
                {items.map((id) => (
                    <DndKitExampleItem key={id} id={id} />
                ))}
            </div>
        </SortableContext>
    );
}
