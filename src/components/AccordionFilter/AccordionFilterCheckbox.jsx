import { useAccordionFilterItemContext } from './AccordionFilterItem';
import { useAccordionFilterContext } from "./AccordionFilter";

export default function AccordionFilterCheckbox({object, filterState, handleFilterChange}) {
    const {id} = useAccordionFilterItemContext();
    const {openItemId} = useAccordionFilterContext();

    const isOpen = openItemId === id;

    return (
        <>
            <div className={`accordion-item-content ${isOpen ? 'open' : 'close'} checkboxBody accordionPanel`}>
                {object?.length > 0 ? (
                    object.map((item) => (
                        <label className="checkboxLabel" key={item.id} htmlFor={`${id}-${item.id}`}>
                            <input
                                type="checkbox"
                                id={`${id}-${item.id}`}
                                name={id}
                                value={item.id}
                                checked={filterState.includes(item.id)}
                                onChange={() => handleFilterChange(item.id)}
                            />
                            {item.name}
                        </label>
                    ))
                ) : (
                    <span>Loading...</span>
                )}
            </div>
        </>
    )
}