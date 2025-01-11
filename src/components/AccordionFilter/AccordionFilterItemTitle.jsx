import {useAccordionFilterItemContext} from "./AccordionFilterItem";

export default function AccordionFilterItemTitle({children}) {
    const {toggleOpenId, id} = useAccordionFilterItemContext()

    return (
        <>
            <h3 onClick={() => toggleOpenId(id)} className="accordion-item-title filtersTitle">{children}</h3>
        </>
    )
}