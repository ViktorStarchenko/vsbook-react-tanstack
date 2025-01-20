import {createContext, useContext, useState} from "react";
import AccordionFilterItem from "./AccordionFilterItem";
import AccordionFilterTitle from "./AccordionFilterTitle";
import AccordionFilterCheckbox from "./AccordionFilterCheckbox";

const AccordionFilterContext = createContext();

export function useAccordionFilterContext() {
    const ctx = useContext(AccordionFilterContext);

    if (!ctx) {
        throw new Error('Accordion-related components must be wrapped by Filters component')
    }

    return ctx;
}

export default function AccordionFilter({children}) {
    const [openItemId, setOpenItemId] = useState();

    function toggleOpenId(id) {
        console.log(openItemId)
        setOpenItemId(preOpenId => preOpenId === id ? null : id);
        console.log(openItemId)
    }

    const contextValue = {
        openItemId: openItemId,
        toggleOpenId: toggleOpenId,
    }

    return (
        <>
            <AccordionFilterContext.Provider value={contextValue}>
                <div className="filters">
                    {children}
                </div>
            </AccordionFilterContext.Provider>
        </>
    )
}

AccordionFilter.Item = AccordionFilterItem
AccordionFilter.Title = AccordionFilterTitle
AccordionFilter.Checkbox = AccordionFilterCheckbox