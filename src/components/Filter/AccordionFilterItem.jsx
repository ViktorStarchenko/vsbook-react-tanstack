import CheckboxFilter from "../elements/CheckboxFilter";
import {createContext, useContext, useState} from "react";
import AccordionFilterTitle from "./AccordionFilterTitle";
import AccordionFilterCheckbox from "./AccordionFilterCheckbox";

const AccordionFilterItemContext = createContext();

export function useAccordionFilterItemContext() {
    const ctx = useContext(AccordionFilterItemContext);

    if(!ctx) {
        throw new Error('All Filter-related components must be wrapper by AccordionFilterItem')
    }

    return ctx;
}

export default function AccordionFilterItem({id, children}) {
    const contextValue = {
        id: id
    }

    return (
        <>
            <AccordionFilterItemContext.Provider value={contextValue}>
                <div className="controlCheckbox filtersItem">
                    <div className="checkboxWrapper accordion-item">
                        {children}
                    </div>
                </div>
            </AccordionFilterItemContext.Provider>
        </>
    )
}