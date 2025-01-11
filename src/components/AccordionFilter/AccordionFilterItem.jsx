import CheckboxFilter from "../elements/CheckboxFilter";
import {createContext, useContext, useState} from "react";
import AccordionFilterItemTitle from "./AccordionFilterItemTitle";
import AccordionFilterItemCheckbox from "./AccordionFilterItemCheckbox";

const AccordionFilterItemContext = createContext();

export function useAccordionFilterItemContext() {
    const ctx = useContext(AccordionFilterItemContext);

    if(!ctx) {
        throw new Error('All AccordionFilter-related components must be wrapper by AccordionFilterItem')
    }

    return ctx;
}

export default function AccordionFilterItem({id, children}) {
    const [openItemId, setOpenItemId] = useState();

    function toggleOpenId(id) {
        console.log(openItemId)
        setOpenItemId(preOpenId => preOpenId === id ? null : id);
        console.log(openItemId)

    }

    const contextValue = {
        openItemId: openItemId,
        toggleOpenId: toggleOpenId,
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

// {genre && <CheckboxFilter
//     name="Genre"
//     id="genre"
//     object={genre}
//     filterState={filterGenres}
//     handleFilterChange={handleGenreChange}
// />}

AccordionFilterItem.Title = AccordionFilterItemTitle
AccordionFilterItem.Checkbox = AccordionFilterItemCheckbox