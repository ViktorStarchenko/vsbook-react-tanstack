import { useEffect, useRef, useCallback } from "react";

export function useAccordion() {
    const panelRef = useRef(null);
    const buttonRef = useRef(null);

    const handleAccordionToggle = useCallback(() => {
        buttonRef.current.classList.toggle("active");
        const panel = panelRef.current;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.classList.remove("active");
        } else {
            panel.style.maxHeight = "250px"; // Или panel.scrollHeight + "px"
            panel.classList.add("active");
        }
    }, []);

    useEffect(() => {
        const button = buttonRef.current;

        if (!button) return;

        button.addEventListener("click", handleAccordionToggle);

        return () => {
            button.removeEventListener("click", handleAccordionToggle);
        };
    }, [handleAccordionToggle]);

    return { buttonRef, panelRef };
}
