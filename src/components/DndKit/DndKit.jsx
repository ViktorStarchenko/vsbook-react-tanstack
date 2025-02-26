import {closestCenter, DndContext} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useState} from "react";
import DndKitItem from "./DndKitItem";

export default function DndKit() {
    const [items, setItems] = useState([
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
    ]);

    const onDragEnd = (event) => {
        console.log(event);
        const {active, over} = event;
        if (active.id === over.id) return;
        setItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex)
        })
    }

    return (
        <>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {items.map(item => (
                    <DndKitItem key={item.id} item={item}/>
                ))}
            </SortableContext>
        </DndContext>

        </>
    )
}