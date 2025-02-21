import {DndContext, DragOverlay, useDroppable, pointerWithin, closestCorners} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import NewDndParent from "./NewDndParent";
import {Item} from "../DndKitExample/DndKitExampleItem";
import classes from "./NewDnd.module.css";

export default function NewDnd() {
    const initialData = [
        {
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
    ]; // Твой массив с данными

    const [items, setItems] = useState(initialData);
    const [activeId, setActiveId] = useState(null);
    const [isRoot, setIsRoot] = useState(false);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log(event.active);
        // console.log("active Id", event.active.id)
        // console.log("over Id", event.over)

        if (!over) {
            setIsRoot(true);
        } else {
            setIsRoot(false);
        };
        const overRect = over.rect;
        const activeRect = active.rect;

        const middleY = overRect.top + overRect.height / 2;
        const isBelow = activeRect.top > middleY; // Перетащили ниже центра
        console.log("middleY", middleY)
        console.log("activeRect.top", activeRect)

        if (!over) return;
        if (active.id === over.id) return;

        const activeItem = findItem(items, active.id);
        const overItem = findItem(items, over.id);

        if (!activeItem || !overItem) return;

        setItems((prev) => moveItem(prev, activeItem, overItem));
    };

    const handleDragOver = (event) => {
        console.log(event.over)
        if (!event.over) return
    }

    function findItem(data, id, parent = null) {
        for (const item of data) {
            if (item.id === id) return { item, parent };
            if (item.children) {
                const found = findItem(item.children, id, item);
                if (found.item) return found;
            }
        }
        return { item: null, parent: null };
    }

    function moveItem(data, activeItem, overItem) {
        let newData = [...data];
        // Удаляем элемент из старого места
        function removeItem(arr, id) {
            return arr.filter((item) => {
                if (item.id === id) return false;
                if (item.children) {
                    item.children = removeItem(item.children, id);
                }
                return true;
            });
        }

        // Добавляем в новый список
        function insertItem(arr, newItem, targetId) {
            // if (isRoot) {
            //     return [...arr, newItem];
            // }
            return arr.map((item, index) => {
                if (item.id === targetId) {
                    console.log('Target Index', index)
                    return {
                        ...item,
                        children: [...(item.children || []), newItem],
                    };
                } else if (item.children) {
                    return { ...item, children: insertItem(item.children, newItem, targetId) };
                }
                return item;
            });
        }

        newData = removeItem(newData, activeItem.item.id);
        newData = insertItem(newData, activeItem.item, overItem.item.id);
        return newData;
    }


    const { setNodeRef } = useDroppable({ id: "root" });

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            collisionDetection={pointerWithin}
            measuring={{
                droppable: { strategy: "always" }, // Или "intersection"
                draggable: { strategy: "always" }
            }}
        >
            <div ref={setNodeRef} className={classes['dnd-menu-wrap']}>
                <div className="h2">NewDND</div>
                <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
                    <div className="new-dnd-list">
                        {items.map((item) => (
                            <NewDndParent key={item.id} item={item} />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay>{activeId ? <div className={classes['dnd-menu-item']} id={activeId} ></div> : null}</DragOverlay>
            </div>
        </DndContext>
    );
}
