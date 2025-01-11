import {useAccordionFilterItemContext} from "./AccordionFilterItem";
import {useAccordionFilterContext} from "./AccordionFilter";

export default function AccordionFilterTitle({children}) {
    const {id} = useAccordionFilterItemContext();
    const {toggleOpenId} = useAccordionFilterContext();

    return (
        <>
            <h3 onClick={() => toggleOpenId(id)} className="accordion-item-title filtersTitle">{children}</h3>
        </>
    )
}