import {createContext, useContext, useEffect, useState} from "react";
import TestCustomDndBoard from "./TestCustomDndBoard";

const TestCustomDndContext = createContext();

export function useTestCustomDndContext() {
    const ctx = useContext(TestCustomDndContext);
    if (!ctx) {
        throw new Error("Something wrong with TestCustomDndContext")
    }
    return ctx;
}

export default function TestCustomDnd({items, children}) {
    const [boards, setBoards] = useState([
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

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function dragOverHandler(e, board, item) {
        e.stopPropagation();
        e.preventDefault();
        if (item) {
            e.currentTarget.classList.add('item-over');
        }
    }

    function dragLeaveHandler(e) {
        if (e.currentTarget.classList.contains('item-over')) {
            e.currentTarget.classList.remove('item-over');
        }
    }

    function dragStartHandler(e, board, item) {
        if (!item) return;
        setCurrentBoard(board);
        setCurrentItem(item);
        console.log(currentItem)
    }

    function dragEndHandler(e) {
        if (e.currentTarget.classList.contains('item-over')) {
            e.currentTarget.classList.remove('item-over');
        }
    }

    function dropHandler(e, board, item) {
        e.stopPropagation();
        e.preventDefault();

        const currentIndex = currentBoard?.children?.indexOf(currentItem);
        // Checking if board has children
        const isEmptyBoard = !board.children || board.children.length === 0;
        const dropIndex = isEmptyBoard ? 0 : board.children.indexOf(item);
        console.log('currentIndex', currentIndex)
        console.log('dropIndex', dropIndex)
        if (currentIndex === -1 || dropIndex === -1) return;



        const isExists = board.children ? board.children.some(item => item.id === currentItem.id) : false;
        console.log(currentBoard);
        console.log(board);

        const dropBoard = isExists ?
            {
                ...board,
                children: reorderExistingItems(board.children ?? [], currentIndex, dropIndex)
            } :
            {
                ...board,
                children: addNewItem(board.children ?? [], currentIndex, dropIndex, currentItem)
            };

        const newCurrentBoard = !isExists ?
            {
                ...currentBoard,
                children: removeItem(currentBoard.children, currentIndex)
            } : {...dropBoard}

        // console.log("dropBoard", dropBoard)
        // console.log("newCurrentBoard", newCurrentBoard);

        setBoards(boards.map(b =>
            b.id === dropBoard.id ? dropBoard :
                b.id === newCurrentBoard.id ? newCurrentBoard : b
        ))
        console.log("Boards", boards)
        e.currentTarget.classList.remove('item-over')

    }

    function dropCardHandler(e, board) {
        e.stopPropagation();
        e.preventDefault();
        const currentIndex = currentBoard.children.indexOf(currentItem);
        console.log('currentIndex', currentIndex)
        console.log('currentBoard', currentBoard)
        console.log('board', board)

    }

    function reorderExistingBoard(board, currentIndex, dropIndex, newItem) {
        const newBoard = newItem ? [...board, newItem] : [...board];

        [newBoard[currentIndex], newBoard[dropIndex]] = [newBoard[dropIndex], newBoard[currentIndex]];
        return newBoard;
    }

    function swapItems(arr, currentIndex, dropIndex) {
        console.log("reorderExistingItems", arr)
        const newArr = [...arr];

        [newArr[currentIndex], newArr[dropIndex]] = [newArr[dropIndex], newArr[currentIndex]];
        return newArr;
    }
    function reorderExistingItems(arr, currentIndex, dropIndex) {
        // console.log("reorderExistingItems", arr);
        if (currentIndex === dropIndex) return arr; // If the element does not move
        const newArr = [...arr];
        const [movedItem] = newArr.splice(currentIndex, 1); // Delete the element

        // If the element being moved was before dropIndex, after removal dropIndex is offset by -1
        const newDropIndex = currentIndex < dropIndex ? dropIndex - 1 : dropIndex;

        newArr.splice(newDropIndex + 1, 0, movedItem); // Insert after dropIndex
        return newArr;
    }
    function addNewItem(arr, currentIndex, dropIndex, newItem) {
        const newArr = [...arr];
        newArr.splice(dropIndex + 1, 0, newItem)
        return newArr;
    }
    function removeItem(arr, currentIndex) {
        if (!arr || currentIndex < 0 || currentIndex >= arr.length) return arr; // Проверка
        const newArr = [...arr];
        newArr.splice(currentIndex, 1);

        return newArr.length ? newArr : [];
    }


    const contextValue = {
        boards,
        setBoards,
        currentBoard,
        setCurrentBoard,
        currentItem,
        setCurrentItem,
        dragOverHandler,
        dragLeaveHandler,
        dragStartHandler,
        dragEndHandler,
        dropHandler
    }

    return (
        <TestCustomDndContext.Provider value={contextValue}>
            <div className="board-wrap">
                {boards && boards.length > 0 && boards.map((board) => (
                    <TestCustomDndBoard
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, board)}
                        key={board.id}
                        className="board"
                        item={board}
                    />

                ))}
            </div>
        </TestCustomDndContext.Provider>
    )
}