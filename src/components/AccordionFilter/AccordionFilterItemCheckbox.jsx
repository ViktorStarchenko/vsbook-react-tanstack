import { useAccordionFilterItemContext } from './AccordionFilterItem';

export default function AccordionFilterItemCheckbox({object, filterState, handleFilterChange}) {

    const {openItemId, id} = useAccordionFilterItemContext();

    const isOpen = openItemId === id;
    console.log(isOpen)
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