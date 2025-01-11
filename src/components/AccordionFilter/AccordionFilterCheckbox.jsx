import { useAccordionFilterItemContext } from './AccordionFilterItem';
import { useAccordionFilterContext } from "./AccordionFilter";
import CustomCheckbox from "../elements/CustomCheckbox";

export default function AccordionFilterCheckbox({object, filterState, handleFilterChange}) {
    const {id} = useAccordionFilterItemContext();
    const {openItemId} = useAccordionFilterContext();

    const isOpen = openItemId === id;

    return (
        <>
            <div className={`accordion-item-content ${isOpen ? 'open' : 'close'} checkboxBody accordionPanel`}>
                {object?.length > 0 ? (
                    object.map((item) => (
                        <CustomCheckbox
                            key={item.id}
                            id={`${id}-${item.id}`}
                            name={id}
                            value={item.id}
                            checked={filterState.includes(item.id)}
                            onChange={() => handleFilterChange(item.id)}
                            label={item.name}
                        />
                    ))
                ) : (
                    <span>Loading...</span>
                )}
            </div>
        </>
    )
}