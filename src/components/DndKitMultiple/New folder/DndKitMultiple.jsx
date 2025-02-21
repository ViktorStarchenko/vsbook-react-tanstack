import { useState } from "react";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import DndKitMultipleBoard from "./DndKitMultipleBoard";
import { Item } from "./DndKitMultipleItem";

const defaultData = [
    {
        "children": [],
        "id": 1738782617716,
        "title": "All Books",
        "url": "/books"
    },
    {
        "children": [
            {
                "children": [
                    {
                        "id": 1738782708794,
                        "title": "Biography",
                        "url": "/books/page/1?genre=90"
                    },
                    {
                        "id": 1738782806653,
                        "title": "Detective",
                        "url": "/books/page/1?genre=135"
                    },
                    {
                        "id": 1738782796450,
                        "title": "Military",
                        "url": "/books/page/1?genre=162"
                    }
                ],
                "id": 1738782690926,
                "title": "Genre",
                "url": "#"
            },
            {
                "children": [
                    {
                        "id": 1738782897613,
                        "title": "USA",
                        "url": "/books/page/1?country=8"
                    },
                    {
                        "id": 1738782856248,
                        "title": "Australia",
                        "url": "/books/page/1?country=55"
                    },
                    {
                        "id": 1738782912213,
                        "title": "Ukraine",
                        "url": "/books/page/1?country=152"
                    },
                    {
                        "id": 1738782878797,
                        "title": "Columbia",
                        "url": "/books/page/1?country=212"
                    },
                    {
                        "id": 1738782862621,
                        "title": "England",
                        "url": "/books/page/1?country=36"
                    }
                ],
                "id": 1738782848312,
                "title": "Country",
                "url": "#"
            },
            {
                "id": 1738783082496,
                "title": "Language",
                "url": "#"
            },
            {
                "id": 1738783088306,
                "title": "Writer",
                "url": "#"
            }
        ],
        "id": 1738782625924,
        "title": "By Category",
        "url": "#"
    },
    {
        "children": [
            {
                "id": 1739611352190,
                "title": "Еуіе",
                "url": "#"
            }
        ],
        "id": 1738782643416,
        "title": "Edit Menu",
        "url": "/menu-settings"
    },
    {
        "children": [
            {
                "id": 1739611363483,
                "title": "$$$",
                "url": "###"
            }
        ],
        "id": 1739540299988,
        "title": "HEllo",
        "url": "#"
    },
    {
        "children": [
            {
                "id": 1739611369520,
                "title": "sfsd fsd f",
                "url": "#"
            }
        ],
        "id": 1739553056382,
        "title": "Test",
        "url": "/test"
    }
];

export default function DndKitMultiple() {
    const [items, setItems] = useState(defaultData);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function findBoardById(items, boardId) {
        return items.find(board => board.id === boardId) || null;
    }

    function findItemAndParent(data, id, parent = null) {
        for (const item of data) {
            if (item.id === id) {
                return { item, parent };
            }
            if (item.children) {
                const found = findItemAndParent(item.children, id, item);
                if (found) return found;
            }
        }
        return null;
    }

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }



    function handleDragEnd(event) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        console.log(activeId)
        console.log(overId)

        setItems((prevItems) => {
            const newItems = JSON.parse(JSON.stringify(prevItems));

            // Ищем активный элемент и его родителя
            const { item: activeItem, parent: activeParent } = findItemAndParent(newItems, activeId);
            if (!activeItem) return prevItems;

            // Проверяем, является ли overId бордой (контейнером)
            let overParent = findBoardById(newItems, overId);

            if (!overParent) {
                // Если это не борда, ищем нормального родителя
                const result = findItemAndParent(newItems, overId);
                overParent = result?.parent;
            }

            if (!overParent) return prevItems;

            // Удаляем элемент из старого родителя
            if (activeParent) {
                activeParent.children = activeParent.children.filter(child => child.id !== activeId);
            }

            // Находим индекс overId в новом родителе
            const overIndex = overParent.children.findIndex(child => child.id === overId);

            if (overIndex === -1) {
                // Если overId не найден (борда пустая), добавляем в конец
                overParent.children.push(activeItem);
            } else {
                // **Определяем вставку перед или после `overId`**
                // const isBelow = event.over.rect.top + event.over.rect.height / 2 < event.active.rect.current.translated?.top;
                const overCenterY = over.rect.top + over.rect.height / 2;
                const activeCenterY = active.rect.current.translated?.top + active.rect.current.translated?.height / 2;
                const isBelow = activeCenterY > overCenterY;
                console.log(isBelow)

                const insertIndex = isBelow ? overIndex + 1 : overIndex;

                overParent.children.splice(insertIndex, 0, activeItem);
            }

            return newItems;
        });
    }



    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <h2 className="h2">DndKitMultiple</h2>
            <div className="board-wrap">
                {items.map((item) => (
                    <DndKitMultipleBoard key={item.id} item={item} />
                ))}
            </div>

            <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
    );
}
