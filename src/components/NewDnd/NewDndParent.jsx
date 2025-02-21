import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import NewDndItem from "./NewDndItem";
import { useDroppable } from "@dnd-kit/core";

export default function NewDndParent({ item }) {
    const { setNodeRef } = useDroppable({ id: item.id });

    return (
        <div ref={setNodeRef}>
            <NewDndItem item={item} />
            {Array.isArray(item.children) && item.children.length > 0 && (
                <SortableContext items={item.children.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    <div style={{ marginLeft: 20 }}>
                        {item.children.map((child) => (
                            <NewDndParent key={child.id} item={child} />
                        ))}
                    </div>
                </SortableContext>
            )}
        </div>
    );
}
