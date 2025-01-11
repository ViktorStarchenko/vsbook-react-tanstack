import { useAccordionItemContext } from "./AccordionItem";

export default function ({children}) {
    const {toggleOpenId, id} = useAccordionItemContext();

    return (
        <>
            <h3 className="accordion-item-title" onClick={() => toggleOpenId(id)}>{children}</h3>
        </>
    )
}