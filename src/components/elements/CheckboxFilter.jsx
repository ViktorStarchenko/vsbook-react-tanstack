import { useAccordion } from "../../hooks/useAccordion";

export default function CheckboxFilter({ name, id, object, filterState, handleFilterChange }) {
    const { buttonRef, panelRef } = useAccordion();

    return (
        <div className="controlCheckbox filtersItem">
            <div className="checkboxWrapper accordionItem">
                <h3 ref={buttonRef} className="accordionBtn filtersTitle">{name}</h3>
                <div ref={panelRef} className="accordionPanel checkboxBody">
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
            </div>

        </div>
    );
}
