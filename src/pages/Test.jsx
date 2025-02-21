import PageContent from "../components/PageContent";
import {useSelector} from "react-redux";
import Section from "../components/Section/Section";
import {useEffect, useState} from "react";
import classes from "../components/MenuListDnd/MenuForm.module.css";

import TestCustomDnd from "../components/TestCustomDnd/TestCustomDnd";

import DndKit from "../components/DndKit/DndKit";
import DndKitMultiple from "../components/DndKitMultiple/DndKitMultiple";
import DndKitExample from "../components/DndKitExample/DndKitExample";
import NewDnd from "../components/NewDnd/NewDnd";

export default function Test() {
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

    const menuItems = useSelector(state => state.mainMenu.items || []);
    useEffect(() => {
        // setItems(menuItems);
    }, [menuItems])


    function moveItem(draggedItem, targetItem, parent) {
        setItems((prevItems) => {
            // Логика перемещения элементов в меню
            const updatedItems = [...prevItems];

            // Удаляем из старого списка
            function removeItem(list, itemId) {
                return list.filter(item => {
                    if (item.id === itemId) return false;
                    if (item.children) {
                        item.children = removeItem(item.children, itemId);
                    }
                    return true;
                });
            }

            const itemToMove = prevItems.find(item => item.id === draggedItem.id);
            if (!itemToMove) return prevItems;

            const newList = removeItem(updatedItems, draggedItem.id);

            // Вставляем в новый список
            function insertItem(list, targetId, newItem) {
                return list.map(item => {
                    if (item.id === targetId) {
                        return {
                            ...item,
                            children: [...(item.children || []), newItem]
                        };
                    }
                    if (item.children) {
                        item.children = insertItem(item.children, targetId, newItem);
                    }
                    return item;
                });
            }

            if (targetItem) {
                return insertItem(newList, targetItem.id, itemToMove);
            } else {
                newList.push(itemToMove);
            }

            return newList;
        });
    }



    // ===================DND=====================


    return (
        <PageContent>
            <h1 className="h1">Test Page</h1>
            <div className="wrapper-1220">
                {items && items.length > 0 && <div className={classes.menuFormListWrapper}>
                    {/*<MenuItemListDnd items={items} onMove={moveItem}/>*/}
                </div>}
            </div>

            <Section title="NewDND">
                <NewDnd/>
            </Section>

            <Section title="DND EXAMPLE">
                <DndKitExample/>
            </Section>

            <Section>
                <DndKitMultiple/>
            </Section>

            <DndKit/>

            <Section>
                <div className="h2"><div className="h2">TESTCUSTOMDnd</div></div>
                <div className="board-wrap">
                    <TestCustomDnd items={items}/>
                </div>
            </Section>
        </PageContent>

    )
}