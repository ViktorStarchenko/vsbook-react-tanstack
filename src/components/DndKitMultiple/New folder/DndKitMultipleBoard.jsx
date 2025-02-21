import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import DndKitMultipleItem from "./DndKitMultipleItem";

export default function DndKitMultipleBoard({item}) {

    const {setNodeRef} = useDroppable({
        id: item.id
    })

    return (
        <SortableContext items={item.children} strategy={verticalListSortingStrategy}>
            <div ref={setNodeRef} className="board">
                <h3>{item.title}</h3>
                <p>{item.id}</p>
                {item.children?.map(child => (
                    <DndKitMultipleItem key={child.id} id={child.id} item={child}/>
                ))}
            </div>
        </SortableContext>

    )
}