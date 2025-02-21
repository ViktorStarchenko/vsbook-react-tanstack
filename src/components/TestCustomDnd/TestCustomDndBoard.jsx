import TestCustomDndItem from "./TestCustomDndItem";
import {useTestCustomDndContext} from "./TestCustomDnd";

export default function TestCustomDndBoard({item, children}) {
    const {
        dragOverHandler,
        dropHandler
    } = useTestCustomDndContext();
    // console.log(item)
    return (
        <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, item)}
            key={item.id}
            className="board">
            <div>{item.title}</div>
            {item.children && item.children.map(subItem => (
                <TestCustomDndItem key={subItem.id} item={subItem} board={item}/>
            ))}
        </div>
    )
}