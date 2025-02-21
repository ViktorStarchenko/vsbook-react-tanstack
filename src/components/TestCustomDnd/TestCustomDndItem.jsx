import {useContext} from "react";
import {useTestCustomDndContext} from "./TestCustomDnd";

export default function TestCustomDndItem({board, item, children}) {

    const {
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
    } = useTestCustomDndContext();
    return (
        <div
            onDragOver={(e) => dragOverHandler(e, board, item)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e, board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
            draggable
            className="item"
        >{item.title}</div>
    )
}