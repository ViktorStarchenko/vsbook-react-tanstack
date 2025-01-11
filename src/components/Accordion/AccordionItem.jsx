import {createContext, useContext, useState} from "react";

import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
    const ctx = useContext(AccordionItemContext);

    if (!ctx) {
        throw new Error('AccordionItem-related components must be wrapped by AccordionItemContext component');
    }

    return ctx;
}

export default function AccordionItem({id, children}) {
    const [openItemId, setOpenItemId] = useState();

    function toggleOpenId(id) {
        setOpenItemId(prevOpenId => prevOpenId === id ? null : id);
    }

    const contextValue = {
        openItemId: openItemId,
        toggleOpenId: toggleOpenId,
        id: id,
    }

    return  (
        <>
            <AccordionItemContext.Provider value={contextValue}>
                <div className="accordion-item" id={id}>
                    {children}
                </div>
            </AccordionItemContext.Provider>
        </>
    )
}

AccordionItem.Title = AccordionTitle;
AccordionItem.Content = AccordionContent;