import { useAccordionItemContext } from "./AccordionItem";
import {useAccordionContext} from "./Accordion";

export default function AccordionContent({children}) {
    const {openItemId} = useAccordionContext();
    const {id} = useAccordionItemContext();

    const isOpen = openItemId === id;

    return (
        <>
            <div className={`accordion-item-content ${isOpen ? 'open' : 'close'}`}>
                {children}
            </div>
        </>
    )
}