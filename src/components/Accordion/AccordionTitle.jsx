import { useAccordionItemContext } from "./AccordionItem";
import {useAccordionContext} from "./Accordion";

export default function AccordionTitle({children}) {
    const {toggleOpenId} = useAccordionContext();
    const {id} = useAccordionItemContext();

    return (
        <>
            <h3 className="accordion-item-title" onClick={() => toggleOpenId(id)}>{children}</h3>
        </>
    )
}