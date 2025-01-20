import {useAccordionFilterItemContext} from "./AccordionFilterItem";
import {useAccordionFilterContext} from "./AccordionFilter";

export default function AccordionFilterTitle({children}) {
    const {id} = useAccordionFilterItemContext();
    const {openItemId, toggleOpenId} = useAccordionFilterContext();

    const isOpen = openItemId === id;

    return (
        <>
            <h3 onClick={() => toggleOpenId(id)} className={`accordion-item-title ${isOpen ? 'active' : ''} filtersTitle accordionBtn`}>{children}</h3>
        </>
    )
}