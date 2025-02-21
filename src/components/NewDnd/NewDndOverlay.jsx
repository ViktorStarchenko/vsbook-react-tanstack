import {DragOverlay} from "@dnd-kit/core";

export default function NewDndOverlay({activeId}) {

    return (
        <DragOverlay>
            {activeId && (
                <div className="dnd-menu-item" id={activeId}></div>
            )}
        </DragOverlay>
    )
}